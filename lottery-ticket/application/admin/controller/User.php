<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/11
 * Time: 11:05
 */

namespace app\admin\controller;

use app\model\Custom;

class User extends Common
{
    public function index()
    {
        return view('index');
    }

    public function search()
    {
        $where = [];
        $custom = Custom::where($where)
            ->order(input('sort'), input('order'))
            ->limit(input('offset'), input('limit'))
            ->select();
        $count = Custom::count();
        $result = [
            'total' => $count,
            'rows' => []
        ];
        foreach ($custom as $item) {
            $operation = '';
            $result['rows'][] = [
                'id' => $item->id,
                'telephone' => $item->telephone,
                'state' => $item->state,
                'operation' => $operation
            ];
        }
        return json($result);
    }
}