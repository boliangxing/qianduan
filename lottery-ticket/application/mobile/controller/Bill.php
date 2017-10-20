<?php
/**
 * Created by PhpStorm.
 * User: MADAO
 * Date: 2017/8/4
 * Time: 0:20
 */

namespace app\mobile\controller;

use app\model\Custom;
use app\model\CustomSite;
use think\Controller;

class Bill extends Controller
{


    public function _initialize()
    {
//        if (!session('lottery_user')) {
//            $this->redirect('account/index');
//        }
//        if (!request()->isAjax()) {
//            $this->error('', url('main/index'));
//        }
    }

    public function index()
    {

        if(!request()->isAjax()) {
            $this->error('','main/index');
            die;
        }

        $goods_info = input('goods_info');



        $custom = Custom::where('id', session('lottery_user'))->find();
        if (!$custom) {
            $this->error(url('用户信息不存在', 'main/index'));
            die;
        }

        $nowSite = CustomSite::find($custom->now_site);

        $where = ['custom_id' => session('lottery_user')];

        $custom_site = CustomSite::where($where)->select();
        return view('index', [
//            'show_total_fee' => $fee,
            'custom' => $custom,
            'custom_site' => $custom_site,
            'nowSite' => $nowSite,
            'goods_info' => $goods_info
        ]);
    }

//    public function check()
//    {
//        $no_info = input('noInfo/a');
//        $total_info = input('totalInfo/a');
////        error_log(var_export(input(),1));
//        // 都存放到一个数组goodsInfo
//        session('noInfo', $no_info);
//        session('totalInfo', $total_info);
//    }

    public function saveSite()
    {
        $contact_name = input('contact_name');
        $contact_phone = input('contact_phone');
        $gender = input('gender');
        $site_title = input('site_title');
        $site_address = input('site_address');
        $site_point = input('site_point');

        $custom_info = new CustomSite();
        $custom_info->custom_id = session('lottery_user');
        $custom_info->contact_name = $contact_name;
        $custom_info->contact_phone = $contact_phone;
        $custom_info->gender = $gender;
        $custom_info->site_title = $site_title;
        $custom_info->site_address = $site_address;
        $custom_info->site_point = $site_point;
        $custom_info->save();

        return json([
            'code' => 200,
            'message' => '保存成功',
            'data' => $custom_info->id
        ]);
    }

    /**
     * 删除用户地址
     * @param $id
     * @return \think\response\Json
     */
    public function delSite($id)
    {
        if (!request()->isAjax()) {
            return json([
                'code' => 10001,
                'message' => '参数错误'
            ]);
        }
        if (!check_is_int($id)) {
            return json([
                'code' => 10001,
                'message' => '参数错误'
            ]);
        }

        $custom = Custom::find(session('lottery_user'));
        if (!$custom) {
            return json([
                'code' => 10002,
                'message' => '数据不存在'
            ]);
        }

        if ($custom->now_site == $id) {
            return json([
                'code' => 201,
                'message' => '默认地址不可删除'
            ]);
        }

        $custom_site = CustomSite::find($id);
        if (!$custom_site) {
            return json([
                'code' => 10002,
                'message' => '地址信息不存在'
            ]);
        }
        $custom_site->delete();

        return json([
            'code' => 200,
            'message' => '删除成功'
        ]);
    }

    /**
     * 更改默认地址
     * @param $id
     * @return \think\response\Json
     */
    public function changeSite($id)
    {
        if (!check_is_int($id)) {
            return json([
                'code' => 10000,
                'message' => '参数错误'
            ]);
        }
        //获取session 用户信息

        $custom = Custom::find(session('lottery_user'));
        if (!$custom) {
            return json([
                'code' => 10000,
                'message' => '数据不存在'
            ]);
        }
        $custom->now_site = $id;
        $custom->save();

        return json([
            'code' => 200,
            'message' => '修改成功'
        ]);
    }

    public function car()
    {
        return view('car');
    }
}