<?php
/**
 * Created by PhpStorm.
 * User: MADAO
 * Date: 2017/8/2
 * Time: 23:12
 */

namespace app\admin\controller;

class Main extends Common
{
    public function index(){
        return view('index',['test'=>1]);
    }
}