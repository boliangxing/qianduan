<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/11
 * Time: 11:22
 */

namespace app\admin\controller;

use think\Controller;

class Common extends Controller
{
    public function _initialize()
    {
        if (!session('admin_user')) {
            $this->redirect('login/index');
        }
    }
}