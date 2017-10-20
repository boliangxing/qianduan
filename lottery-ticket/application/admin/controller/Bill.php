<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/11
 * Time: 10:56
 */

namespace app\admin\controller;

use app\model\Order;

class Bill extends Common
{
    public function index()
    {
        return view('index');
    }

    public function search()
    {
        $where = ['supplier_id'=>1];
        $order = Order::where($where)
            ->order(input('sort'), input('order'))
            ->limit(input('offset'), input('limit'))
            ->select();
        $count = Order::count();
        $result = [
            'total' => $count,
            'rows' => []
        ];
        foreach ($order as $item) {

            $result['rows'][] = [
                'order_no' => $item->order_no,
                'pay_type' => $item->pay_type,
                'pay_state' => $item->pay_state,
                'goods_price' => $item->goods_price,
                'is_send_home' => $item->is_send_home,
                'is_take_pic' => $item->is_take_pic,
            ];
        }
        return json($result);
    }
}