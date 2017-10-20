<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/3
 * Time: 13:51
 */

namespace app\admin\controller;

use app\model\AdminUser;

class Supplier extends Common
{
    public function index()
    {
        return view('index');
    }

    public function search()
    {
        $where = [];
        $admin_user = AdminUser::where($where)
            ->order(input('sort'), input('order'))
            ->limit(input('offset'), input('limit'))
            ->select();
        $count = AdminUser::count();
        $result = [
            'total' => $count,
            'rows' => []
        ];
        foreach ($admin_user as $item) {
            $operation = '';
//            $operation .= '<a>编辑</a>&nbsp;';
            $operation .= '<a href="' . url('supplier/createLbsStore', ['id' => $item->id]) . '">创建云存储</a>&nbsp;';
//            $operation .= '<a>删除</a>';

            $result['rows'][] = [
                'id' => $item->id,
                'user_name' => $item->user_name,
                'telephone' => $item->telephone,
                'operation' => $operation
            ];
        }
        return json($result);
    }

    public function createLbsStore($id)
    {
        return view('supplier/lbs_store/index');
    }

    public function LbsStoreSave()
    {
        $address_info = input('addressInfo');
        $address_info = json_decode($address_info);
        error_log(var_export($address_info, 1));
        $url = 'http://api.map.baidu.com/geodata/v3/poi/create';
        $post_data = [
            'geotable_id' => '173455',
            'ak' => 'c7sBjQAny2ulYaooMIFzt8UqC0D0yRLc',
            'title' => $address_info->title,
            'address' => $address_info->address,
            'tags' => '彩票商户',
            'latitude' => $address_info->point->lat,
            'longitude' => $address_info->point->lnt,
            'coord_type' => 3, //百度加密经纬度坐标
            'supplier_id' => 1
        ];

        $curl_result = my_curl($url, 'POST', $post_data);
        if ($curl_result === false) {
            return json([
                'code' => 1000000,
                'message' => '云储存创建失败'
            ]);
        }
        $json_curl_result = json_decode($curl_result);
        if ($json_curl_result->status === 0) {
            return json([
                'code' => 200,
                'message' => '创建成功'
            ]);
        } else {
            return json([
                'code' => $json_curl_result->status,
                'message' => $json_curl_result->message
            ]);
        }

    }
}