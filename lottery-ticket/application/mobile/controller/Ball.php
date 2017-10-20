<?php
/**
 * Created by PhpStorm.
 * User: MADAO
 * Date: 2017/8/3
 * Time: 23:16
 */

namespace app\mobile\controller;

use think\Controller;

class Ball extends Controller
{
    public function index($mold)
    {

        if (!in_array($mold,['ssq','qlc','fc3d','dlt','pl3','pl5','qxc'])) {
            $this->error('参数错误','main/index');
        }
//        $time = [
//            'ssq' => '二四六21:30',
//            'qlc' => '一三五21:30',
//            'fc3d' => '每天21:15',
//            'dlt' => '一三六20:45',
//            'pl3' => '每天20:30',
//            'pl5' => '每天20:30',
//            'qxc' => '二五日20:30'
//        ];

//        $week = [
//            'Monday',
//            'Tuesday',
//            'Wednesday',
//            'Thursday',
//            'Friday',
//            'Saturday',
//            'Sunday'
//        ];
        $lottery_info = [
            'ssq' => [
                'day' => [
                    'Tuesday',
                    'Thursday',
                    'Saturday'
                ],
                'time' => '21:30',
                'id' => 11,
                'name' => '双色球'
            ],
            'qlc' => [
                'day' => [
                    'Monday',
                    'Wednesday',
                    'Friday'
                ],
                'time' => '21:30',
                'id' => 13,
                'name' => '七乐彩'
            ],
            'fc3d' => [
                'day' => [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                'time' => '21:15',
                'id' => 12,
                'name' => '福彩3D'
            ],
            'dlt' => [
                'day' => [
                    'Monday',
                    'Wednesday',
                    'Saturday'
                ],
                'time' => '20:45',
                'id' => 14,
                'name' => '大乐透'
            ],
            'pl3' => [
                'day' => [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                'time' => '20:30',
                'id' => 16,
                'name' => '排列三'
            ],
            'pl5' => [
                'day' => [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                'time' => '20:30',
                'id' => 17,
                'name' => '排列五'
            ],
            'qxc' => [
                'day' => [
                    'Tuesday',
                    'Friday',
                    'Sunday'

                ],
                'time' => '20:30',
                'id' => 15,
                'name' => '七星彩'
            ]
        ];


        $history = $this->getHistory($lottery_info[$mold]['id']);
        if (!$history) {
            $this->error('接口数据异常', 'main/index');
            die;
        }

        $temp_time = [];
        foreach ($lottery_info[$mold]['day'] as $item) {
            $temp_time[$item] = strtotime(date('Y-m-d', strtotime($item)) . ' ' . $lottery_info['ssq']['time']) - time();
        }
        foreach ($temp_time as $index => $item) {
            if ($item <= 0) {
                unset($temp_time[$index]);
            }
        }

        $change_temp = array_flip($temp_time);
        sort($temp_time, SORT_NUMERIC);
        $change_temp[$temp_time[0]];

        $end_time = strtotime(date('Y-m-d', strtotime($change_temp[$temp_time[0]])) . ' ' . $lottery_info[$mold]['time']);


        return view('index', [
            'history' => $history,
            'end_time' => date('Y-m-d H:i:s', $end_time),
            'lotteryType' => config('lottery.' . $mold)
        ]);
    }

    public function getHistory($caipiaoid)
    {
        $url = 'http://api.jisuapi.com/caipiao/history';
        $data = [
            'appkey' => '4ff86178431e7bfe',
            'caipiaoid' => $caipiaoid
        ];
        $result = my_curl($url, 'POST', $data);

//        error_log(var_export($result, 1));

        if (!$result) {
            return false;
        }
        $result = json_decode($result);

        if ($result->status === '0') {
            return $result->result->list;
        }

    }
}