<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/5
 * Time: 15:17
 */

namespace app\mobile\controller;

use think\Controller;

class Result extends Controller
{
    public function returnUrl()
    {
        import('alipay_trade_wap_pay/wappay/service/AlipayTradeService', EXTEND_PATH, '.php');


        $arr = $_GET;
        $alipaySevice = new \AlipayTradeService(config('alipay_wap'));
        $result = $alipaySevice->check($arr);
        error_log(var_export($arr, 1));

        /* 实际验证过程建议商户添加以下校验。
        1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
        2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
        3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
        4、验证app_id是否为该商户本身。
        */
        if ($result) {//验证成功
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代码

            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
            //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表

            //商户订单号

            $out_trade_no = htmlspecialchars($_GET['out_trade_no']);

            //支付宝交易号

            $trade_no = htmlspecialchars($_GET['trade_no']);
            $total_amount = htmlspecialchars($_GET['total_amount']);

            return view('return_url', [
                'out_trade_no' => $out_trade_no,
                'total_amount' => $total_amount
            ]);

//            echo "验证成功<br />外部订单号：" . $out_trade_no;

            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {
            //验证失败
            $this->error('验证失败', '/');
            echo "验证失败";
        }
    }

    public function notifyUrl()
    {

    }
}