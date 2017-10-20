<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/20
 * Time: 17:03
 */

namespace app\seller\controller;

use think\Controller;

class Account extends Controller
{
    public function register()
    {
        return view('register');
    }
}