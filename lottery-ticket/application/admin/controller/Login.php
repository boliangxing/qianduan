<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/3
 * Time: 10:11
 */

namespace app\admin\controller;

use app\model\AdminUser;
use app\model\Custom;
use think\Controller;

class Login extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function login()
    {
        error_log(var_export(input(), 1));
        $user_name = input('user_name');
        $password = input('password');
        $admin_user = AdminUser::where('user_name', $user_name)->find();
        if (!$admin_user) {
            return json([
                'code' => 201,
                'message' => '用户名不存在'
            ]);
        }

        if ($admin_user->password != md5($password)) {
            return json([
                'code' => 202,
                'message' => '密码不正确'
            ]);
        }
        session('admin_user', $admin_user->id);
        return json([
            'code' => 200,
            'message' => '登录成功'
        ]);
    }

    public function out()
    {
        session('admin_user_user',null);
        $this->redirect('login/index');
    }
}