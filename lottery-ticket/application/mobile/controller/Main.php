<?php
/**
 * Created by PhpStorm.
 * User: MADAO
 * Date: 2017/8/3
 * Time: 21:20
 */

namespace app\mobile\controller;

use think\Controller;
use think\Db;

class Main extends Controller
{
    public function index()
    {
//        error_log(456);

//        $this->error('123',url('main/index'));
//        header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
        return view('index');
    }

    public function one()
    {
        config('session.expire', 60);
        session('user', 123);
    }

    public function two()
    {
        var_dump(config('session.prefix'));
    }
}