<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/22
 * Time: 15:00
 */

namespace app\seller\controller;

use think\Controller;

class Main extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function suggestion()
    {
        $words = input('words');
        $url = 'http://api.map.baidu.com/place/v2/suggestion?query=' . $words . '&region=中国&ak=c7sBjQAny2ulYaooMIFzt8UqC0D0yRLc&output=json';
        $result = my_curl($url);
        return json([
            'code' => 200,
            'data' => $result
        ]);
    }
}