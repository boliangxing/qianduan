<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/9
 * Time: 10:06
 */

namespace app\mobile\controller;

use app\model\Custom;
use app\model\Order;
use app\model\Product;
use think\captcha\Captcha;
use think\Controller;

class Account extends Controller
{

    public function center()
    {
        if (!session('lottery_user')) {
            $this->redirect('account/index');
            die;
        }
        $custom = Custom::find(session('lottery_user'));
        if (!$custom) {
            $this->error('用户信息不存在', 'account/index');
        }
        $order = Order::where('custom_id', session('lottery_user'))->limit(0, 3)->order('id','DESC')->select();

        if (count($order->toArray()) == 3) {
            $loadIsShow = true;
        } else {
            $loadIsShow = false;
        }
        return view('center', [
            'order' => $order,
            'loadIsShow' => $loadIsShow,
            'custom' => $custom
        ]);
    }

    public function index()
    {
        return view('index');
    }

    public function login()
    {
        $phone = input('phone');
        $password = input('password');
        if (!isMobile($phone)) {
            return json([
                'code' => 10000,
                'message' => '手机号格式不正确'
            ]);
        }
        if (!is_pwd($password)) {
            return json([
                'code' => 100001,
                'message' => '密码格式不正确'
            ]);
        }
        $custom = Custom::where('telephone', $phone)->find();
        if (!$custom) {
            return json([
                'code' => 100002,
                'message' => '用户不存在'
            ]);
        }
        if ($custom->password != md5($password)) {
            return json([
                'code' => 100003,
                'message' => '密码错误'
            ]);
        }
        session('lottery_user', $custom->id);
        return json([
            'code' => 200,
            'message' => '登陆成功'
        ]);

    }


    private function random($len = 4)
    {
        $temp = [];
        for ($i = 0; $i < $len; $i++) {
            $temp[] = random_int(0, 9);
        }
        return $temp;


    }

    public function registerSendSmsCode()
    {
        $user_phone = input('user_phone');
        if (!isMobile($user_phone)) {
            return json([
                'code' => 10000,
                'message' => '参数错误'
            ]);
        }

        $custom = Custom::where('telephone', $user_phone)->find();
        if ($custom) {
            return json([
                'code' => 10001,
                'message' => '用户已存在'
            ]);
        }

        $mobile_code = implode($this->random(4), '');
        session('sms_code', $mobile_code);
        $url = 'http://106.ihuyi.com/webservice/sms.php?method=Submit';
        $data = 'account=C86707806&password=7c0e08947d767849911ddcb64308baee&mobile=' . $user_phone;
        $data .= '&format=json&content=' . rawurlencode('您的验证码是：' . $mobile_code . '。请不要把验证码泄露给其他人。');
        $result = my_curl($url, 'post', $data);

        if (!$result) {
            return json([
                'code' => 10002,
                'message' => '请求失败'
            ]);
        }
//        error_log(var_export($result,1));
        if (json_decode($result)->code == 2) {
            session('sms_code_' . $user_phone, $mobile_code);
            return json([
                'code' => 200
            ]);
        } else {
            return json([
                'code' => 10003,
                'message' => '请求失败'
            ]);
        }
    }

    public function forgetSendSmsCode()
    {
        $user_phone = input('user_phone');
        if (!isMobile($user_phone)) {
            return json([
                'code' => 10000,
                'message' => '参数错误'
            ]);
        }

        $custom = Custom::where('telephone', $user_phone)->find();
        if (!$custom) {
            return json([
                'code' => 10001,
                'message' => '用户不存在'
            ]);
        }

        $mobile_code = implode($this->random(4), '');
        session('sms_code', $mobile_code);
        $url = 'http://106.ihuyi.com/webservice/sms.php?method=Submit';
        $data = 'account=C86707806&password=7c0e08947d767849911ddcb64308baee&mobile=' . $user_phone;
        $data .= '&format=json&content=' . rawurlencode('您的验证码是：' . $mobile_code . '。请不要把验证码泄露给其他人。');
        $result = my_curl($url, 'post', $data);

        if (!$result) {
            return json([
                'code' => 10002,
                'message' => '请求失败'
            ]);
        }
//        error_log(var_export($result,1));
        $result = json_decode($result);
        if ($result->code == 2) {
            session('sms_code_' . $user_phone, $mobile_code);
            return json([
                'code' => 200
            ]);
        } else {
            return json([
                'code' => 10003,
                'message' => $result->msg
            ]);
        }
    }

    public function register()
    {
        $phone = input('registerPhone');
        $sms_code = input('registerSmsCode');
        $code = input('registerCode');
        $password = input('password');
        $confirm_password = input('confirmPassword');

        if (!isMobile($phone)) {
            return json([
                'code' => 10000,
                'message' => '手机号格式不正确'
            ]);
        }
        if (!is_pwd($password) || !is_pwd($confirm_password)) {
            return json([
                'code' => 100001,
                'message' => '密码格式不正确'
            ]);
        }
        if ($password != $confirm_password) {
            return json([
                'code' => 100001,
                'message' => '两次密码不一致'
            ]);
        }
        if (session('sms_code_' . $phone) != $sms_code) {
            return json([
                'code' => 100002,
                'message' => '短信验证码错误'
            ]);
        }
        $captcha = new Captcha();
        $result = $captcha->check($code, 1);

        if (!$result) {
            return json([
                'code' => 100002,
                'message' => '验证码错误'
            ]);
        }

        $custom = new Custom();
        $custom->telephone = $phone;
        $custom->gender = 3;
        $custom->password = md5($password);
        $custom->state = 1;
        $custom->now_site = 0;
        $custom->save();

        return json([
            'code' => 200,
            'message' => '注册成功'
        ]);

    }

    public function forget()
    {
        $phone = input('phone');
        $sms_code = input('smsCode');
        $code = input('code');
        $password = input('password');
        $confirm_password = input('confirmPassword');

        if (!isMobile($phone)) {
            return json([
                'code' => 10000,
                'message' => '手机号格式不正确'
            ]);
        }
        if (!is_pwd($password) || !is_pwd($confirm_password)) {
            return json([
                'code' => 100001,
                'message' => '密码格式不正确'
            ]);
        }
        if ($password != $confirm_password) {
            return json([
                'code' => 100002,
                'message' => '两次密码不一致'
            ]);
        }
//        if (session('sms_code_' . $phone) != $sms_code) {
//            return json([
//                'code' => 100003,
//                'message' => '短信验证码错误'
//            ]);
//        }
        $captcha = new Captcha();
        $result = $captcha->check($code, 2);

        if (!$result) {
            return json([
                'code' => 100004,
                'message' => '验证码错误'
            ]);
        }

        $custom = Custom::where('telephone', $phone)->find();
        if (!$custom) {
            return json([
                'code' => 100005,
                'message' => '用户信息不存在'
            ]);
        }
        $custom->password = md5($password);
        $custom->save();

        return json([
            'code' => 200,
            'message' => '修改成功'
        ]);
    }

    public function check()
    {
        if (!session('lottery_user')) {
            return 'false';
        } else {
            return 'true';
        }
    }

    public function loginOut()
    {
        session('lottery_user', null);
        $this->redirect('main/index');
    }

    public function getOrder()
    {
        $start = input('start');
        $end = input('end');

        $order = Order::where('custom_id', session('lottery_user'))->limit($start, $end)->order('id','DESC')->select();

        if ($order->isEmpty()) {
            return json([
                'code' => 201,
                'data' => '没有更多了'
            ]);
        }

        return json([
            'code' => 200,
            'data' => $order->toArray()
        ]);

    }

    public function detail($oid)
    {
        if (!request()->isAjax()) {
            $this->error('', 'main/index');
        }
        $order_id = input('oid');
        if (!check_is_int($order_id)) {
            return '参数错误';
        }
        $order = Order::find($oid);
        if (!$order) {
            $this->error('订单信息不存在', 'main', '', 2);
        }
        $product = Product::where('order_id', $oid)->select();

//        error_log(var_export($product,1));

        return view('detail', [
            'product' => $product,
            'order' => $order
        ]);
    }
}