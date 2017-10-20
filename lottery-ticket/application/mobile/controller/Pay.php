<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/4
 * Time: 16:20
 */

namespace app\mobile\controller;

use app\model\CustomSite;
use app\model\Order;
use app\model\OrderSite;
use app\model\Product;
use think\Controller;
use think\Db;
use think\Exception;

class Pay extends Controller
{
    public function _initialize()
    {
        if (!session('lottery_user')) {
            $this->redirect('account/index');
        }
    }

    public function takeOrder()
    {

        error_log(var_export(input(), 1));

        $goods_info = input('goods_info');
        $is_take_pic = input('is_take_pic');
        $is_send_home = input('is_send_home');
        $now_point = input('now_point');
        $receive_site = input('receive_site');
        $token = input('__token__');

        if (!$token) {
            $this->error('参数错误', url('main/index'));
            die;
        }

        $result = $this->validate(
            [
                '__token__' => $token
            ],
            [
                '__token__' => 'token'
            ]
        );

        if (true !== $result) {
            $this->error('验证失败,令牌验证失败', url('main/index'));
            die;
        }

        $goods_info = json_decode($goods_info);

        if (!$goods_info) {
            $this->error('商品信息不存在', url('main/index'));
            die;
        }

        if (!in_array($is_take_pic, [1, 2])) {
            $this->error('参数错误', url('main/index'));
            die;
        }
        if (!in_array($is_send_home, [1, 2])) {
            $this->error('参数错误', url('main/index'));
            die;
        }
        $now_point_a = json_decode($now_point, true);

        if (!$now_point_a) {
            $this->error('地址信息获取失败', url('main/index'));
            die;
        }

        if (!check_is_int($receive_site)) {
            $this->error('参数错误', url('main/index'));
            die;
        }

        $total_fee = 0;

        foreach ($goods_info as $item) {
            $fee = $this->countFee($item);
            if (!$fee) {
                $this->error('参数错误', url('main/index'));
                die;
            }
            $total_fee += $fee;
        }

        if (!check_is_int($total_fee)) {
            $this->error('参数错误', url('main/index'));
            die;
        }


        $allot_order = $this->allotOrder(implode($now_point_a, ','));
        if (!$allot_order) {
            $this->error('系统异常订单分配失败', 'main/index', '', 3);
            die;
        }
        if (!$allot_order->contents) {
            $this->error('附件没有可接单的站点', 'main/index', '', 3);
            die;
        }

        try {
            Db::startTrans();

            $order_no = make_no('order_no');

            $order = new Order();
            $order->order_no = $order_no;
            $order->custom_id = session('lottery_user');//用户session
            $order->supplier_id = $allot_order->contents[0]->supplier_id;
            $order->pay_type = 1;//支付宝
            $order->pay_state = 1;
            $order->order_state = 1;
            $order->goods_price = $total_fee;
            $order->traffic_price = 0;
            $order->real_pay = $total_fee;
            $order->is_send_home = $is_send_home;
            $order->is_take_pic = $is_take_pic;
            $order->custom_point = $now_point;

            $order->save();

            $custom_site = CustomSite::find($receive_site);
            if (!$custom_site) {
                return;
            }

            $order_site = new OrderSite();
            $order_site->order_id = $order->id;
            $order_site->contact_name = $custom_site->contact_phone;
            $order_site->contact_phone = $custom_site->contact_phone;
            $order_site->gender = $custom_site->gender;
            $order_site->site_title = $custom_site->site_title;
            $order_site->site_address = $custom_site->site_address;
            $order_site->site_point = $custom_site->site_point;
            $order_site->save();

            foreach ($goods_info as $item) {
                if (!check_is_int($item->period)) {
                    return;
                }
                if (!check_is_int($item->mul)) {
                    return;
                }

                $fee = $this->countFee($item);
                if (!$fee) {
                    return;
                }
                $product = new Product();

                $product->order_id = $order->id;
                $product->period = $item->period;
                $product->lottery_type = $item->lotteryType;
                $product->play_type = $item->playType;
                $product->mul = $item->mul;
                $product->no_info = json_encode($item->groups);
                $product->fee = $fee;
                $product->lottery_img = '';
                $product->save();
            }

            Db::commit();

        } catch (Exception $e) {
            Db::rollback();
            error_log($e->getMessage());
            $this->error('订单创建失败', url('main/index'));
            die;
        }
        $pay_config = [
            'out_trade_no' => $order_no,
            'subject' => '双色球',
            'total_amount' => $total_fee,
            'body' => 'body',
            'timeout_express' => '1m'
        ];
        $this->alipay($pay_config);
    }

    /**
     * 分配订单 根据范围检测最近订单
     * @param $point
     * @return bool|mixed
     */
    private function allotOrder($point)
    {
        //检索半径
        $deploy = Db::table('deploy')->field('radius')->find();
        if (!$deploy) {
            return false;
        }
        $deploy['radius'] = 1000000;

        $param = 'ak=' . config('bmap.ak') . '&geotable_id=' . config('bmap.geotable_id') . '&location=' . $point;
        $param .= '&radius=' . $deploy['radius'] . '&sortby=distance:1';
        $url = 'http://api.map.baidu.com/geosearch/v3/nearby?' . $param;
        $result = my_curl($url, 'get');

        $result = json_decode($result);
        if (!$result) {
            return false;
        }

        if ($result->status !== 0) {
            return false;
        }
        return $result;
    }

    private function alipay($pay_config)
    {

        import('alipay_trade_wap_pay/wappay/service/AlipayTradeService', EXTEND_PATH, '.php');
        import('alipay_trade_wap_pay/wappay/buildermodel/AlipayTradeWapPayContentBuilder', EXTEND_PATH, '.php');

        $out_trade_no = 1122;
        $out_trade_no = $pay_config['out_trade_no'];

        //订单名称，必填
        $subject = 'dingdanname';
        $subject = $pay_config['subject'];;

        //付款金额，必填
        $total_amount = 0.01;
//        $total_amount = $pay_config['total_amount'];

        //商品描述，可空
        $body = 'body';
        $body = $pay_config['body'];;

        //超时时间
        $timeout_express = "1m";
        $timeout_express = $pay_config['timeout_express'];;

        $payRequestBuilder = new \AlipayTradeWapPayContentBuilder();
        $payRequestBuilder->setBody($body);
        $payRequestBuilder->setSubject($subject);
        $payRequestBuilder->setOutTradeNo($out_trade_no);
        $payRequestBuilder->setTotalAmount($total_amount);
        $payRequestBuilder->setTimeExpress($timeout_express);

        $payResponse = new \AlipayTradeService(config('alipay_wap'));
        $result = $payResponse->wapPay($payRequestBuilder, config('alipay_wap.return_url'), config('alipay_wap.notify_url'));
        error_log('result');
        error_log(var_export($result, 1));
    }

    /**
     * 计算单个彩票价格
     * @param $item
     * @return bool|float|int
     */
    private function countFee($item)
    {
        switch ($item->lotteryType . '+' . $item->playType) {

            case '双色球+直选':
                if (count($item->groups) !== 2) {
                    return false;
                }
                //红球
                $red = count($item->groups[0]->type);
                //蓝球
                $blue = count($item->groups[1]->type);
                $bet_num = combination($red, 6) * combination($blue, 1);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '双色球+胆拖':
                if (count($item->groups) !== 3) {
                    return false;
                }
                //红球 胆
                $red_b = count($item->groups[0]->type);
                //红球 拖
                $red_t = count($item->groups[1]->type);
                $blue = count($item->groups[2]->type);
                $bet_num = combination($red_t, (6 - $red_b)) * $blue;
                $fee = $bet_num * $item->mul * 2;
                break;

            case '七乐彩+直选':
                if (count($item->groups) !== 1 || !isset($item->groups[0])) {
                    return false;
                }
                $no = count($item->groups[0]->type);
                $bet_num = combination($no, 7);
                $fee = $bet_num * $item->mul * 2;
                break;

            case '七乐彩+胆拖':
                if (count($item->groups) !== 2) {
                    return false;
                }
                $no_b = count($item->groups[0]->type);
                $no_t = count($item->groups[1]->type);
                $bet_num = combination($no_t, (7 - $no_b));
                $fee = $bet_num * $item->mul * 2;
                break;

            case '福彩3D+直选':
                if (count($item->groups) !== 3) {
                    return false;
                }
                $hundred = count($item->groups[0]->type);
                $ten = count($item->groups[1]->type);
                $every = count($item->groups[2]->type);
                $bet_num = combination($hundred, 1) * combination($ten, 1) * combination($every, 1);
                $fee = $bet_num * $item->mul * 2;
                break;

            case '福彩3D+组三':
                if (count($item->groups) !== 1 || !isset($item->groups[0])) {
                    return false;
                }
                $no = count($item->groups[0]->type);
                $bet_num = $no * ($no - 1);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '福彩3D+组六':
                if (count($item->groups) !== 1 || !isset($item->groups[0])) {
                    return false;
                }
                $no = count($item->groups[0]->type);

                $bet_num = combination($no, 3);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '大乐透+直选':
                if (count($item->groups) !== 2) {
                    return false;
                }
                //红球
                $red = count($item->groups[0]->type);
                //蓝球
                $blue = count($item->groups[1]->type);

                $bet_num = combination($red, 5) * combination($blue, 2);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '大乐透+胆拖':
                if (count($item->groups) !== 4) {
                    return false;
                }
                //红球 胆
                $red_b = count($item->groups[0]->type);
                //红球 拖
                $red_t = count($item->groups[1]->type);

                $blue_b = count($item->groups[2]->type);
                $blue_t = count($item->groups[3]->type);

                $bet_num = combination($red_t, (5 - $red_b)) * combination($blue_t, (2 - $blue_b));
                $fee = $bet_num * $item->mul * 2;
                break;
            case '排列三+直选':
                if (count($item->groups) !== 3) {
                    return false;
                }
                $hundred = count($item->groups[0]->type);
                $ten = count($item->groups[1]->type);
                $every = count($item->groups[2]->type);

                $bet_num = combination($hundred, 1) * combination($ten, 1) * combination($every, 1);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '排列三+组三':
                if (count($item->groups) !== 1 || !isset($item->groups[0])) {
                    return false;
                }

                $no = count($item->groups[0]->type);
                $bet_num = $no * ($no - 1);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '排列三+组六':
                if (count($item->groups) !== 1 || !isset($item->groups[0])) {

                }
                $no = count($item->groups[0]->type);

                $bet_num = combination($no, 3);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '排列五+直选':
                if (count($item->groups) !== 5) {
                    return false;
                }
                $w = count($item->groups[0]->type);
                $k = count($item->groups[1]->type);
                $hundred = count($item->groups[2]->type);
                $ten = count($item->groups[3]->type);
                $every = count($item->groups[4]->type);

                $bet_num = combination($w, 1) * combination($k, 1) * combination($hundred, 1) * combination($ten, 1) * combination($every, 1);
                $fee = $bet_num * $item->mul * 2;
                break;
            case '七星彩+直选':
                if (count($item->groups) !== 7) {
                    return false;
                }
                $one = count($item->groups[0]->type);
                $two = count($item->groups[1]->type);
                $three = count($item->groups[2]->type);
                $foru = count($item->groups[3]->type);
                $five = count($item->groups[4]->type);
                $six = count($item->groups[5]->type);
                $seven = count($item->groups[6]->type);

                $bet_num = combination($one, 1) * combination($two, 1) * combination($three, 1) * combination($foru, 1) * combination($five, 1) * combination($six, 1) * combination($seven, 1);
                $fee = $bet_num * $item->mul * 2;
                break;

            default:
                return false;
                break;
        }
        return $fee;
    }
}