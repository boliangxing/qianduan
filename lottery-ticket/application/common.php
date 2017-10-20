<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

function my_curl($url, $type = 'GET', $post_data = [])
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    if (strtoupper($type) === 'POST') {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    }
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

    if (curl_errno($curl)) {
        error_log(var_export(curl_error ($curl),1));
        return false;
    }
    curl_close($curl);
    return $result;
}

function gender($num)
{
    switch ($num) {
        case 1:
            return '先生';
        case 2:
            return '女士';
        case 3:
            return '未知';
        default:
            return '';
    }
}

/**
 * 检查是否是整数
 * @param string $val 值
 * @param int $type 默认为空【1.大于0的整数 2.大于等于0的整数 3.小于0的整数 4.小于等于0的整数】
 * @return bool
 */
function check_is_int($val, $type = 1)
{

    if (ceil($val) != $val)
        return false;

    if ($type == 1 && $val <= 0)
        return false;
    else if ($type == 2 && $val < 0)
        return false;
    else if ($type == 3 && $val >= 0)
        return false;
    else if ($type == 4 && $val > 0)
        return false;

    return true;
}

/**
 * 生成UUID（唯一）
 * @return string
 */
function make_id()
{
    $address = strtolower('localhost' . '/' . '127.0.0.1');
    list ($usec, $sec) = explode(" ", microtime());
    $time = $sec . substr($usec, 2, 3);
    $random = rand(0, 1) ? '-' : '';
    $random = $random . rand(1000, 9999) . rand(1000, 9999) . rand(1000, 9999) . rand(100, 999) . rand(100, 999);
    $no = strtoupper(md5($address . ':' . $time . ':' . $random));
    $no = substr($no, 0, 8) . '-' . substr($no, 8, 4) . '-' . substr($no, 12, 4) . '-' . substr($no, 16, 4) . '-' . substr($no, 20);
    $no = str_replace("-", "", $no);
    return $no;
}

/**
 * 检测变量是否是手机号码
 * 手机号码必须是11位的数字，第一位数字必须为1，第二数字必须是34568中的任意一个
 * @param string $val 手机号码
 * @return bool
 */
function isMobile($val)
{
    return preg_match('/^1\d{10}$/', $val);
}


/**
 * 检测变量是否是座机号码
 * 3-4位区号，7-8位直播号码，1－4位分机号
 * @param string $val 座机号码
 * @return bool
 */
function isPhone($val)
{
    return preg_match('/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/', $val);
}

/**
 * 检测变量是否是密码
 * 密码只能是6-30位英文、数字及“_”、“-”组成
 * @param string $val 密码
 * @return bool
 */
function is_pwd($val)
{
    return preg_match('/^[\w-]{6,22}$/', $val);
}

/**
 * 检测变量是否是邮件地址
 * @param string $email email
 * @return bool
 */
function isEmail($email)
{
    return preg_match('/^[\w-]+(\.[\w-]+)*\@[A-Za-z0-9]+((\.|-|_)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/', $email);
}


function make_no($name, $prefix = null, $is_transaction = false)
{

    $no = null;
    $result_no = null;

    if (!$is_transaction) {
        if (\think\Db::table('serial_no')->where('name', $name)->setInc('num')) {
            $serial_no = \think\Db::table('serial_no')->where('name', $name)->find();
            error_log(var_export($serial_no, 1));
            if ($serial_no) {
                $no = $serial_no['num'];
            }
        }


    } else {
        \think\Db::startTrans();

        try {

            if (\think\Db::table('serial_no')->where('name', $name)->setInc('num')) {
                $serial_no = \think\Db::table('serial_no')->where('name', $name)->find();
                if ($serial_no) {
                    $no = $serial_no['num'];
                }
            }

            // 提交事务
            \think\Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            \think\Db::rollback();
            $no = null;
        }
    }
    if (is_null($no))
        return null;
//    switch ($name) {
//        case 'batch_no':
//            $result_no = date('Ymd') . str_repeat('0', 10 - strlen($no)) . $no;
//            break;
//        default:
//            $result_no = $no;
//            break;
//    }

    $result_no = date('Ymd') . str_repeat('0', 10 - strlen($no)) . $no;
    if (!is_null($prefix))
        $result_no = $prefix . $result_no;
    return $result_no;
}

/**组合算法
 * @param $n 元素的总个数
 * @param $m 参与选择的元素个数
 * @return float|int
 */
function combination($n, $m)
{
    $nCount = 1;
    $mCount = 1;
    $diffCount = 1;
    for ($i = $n; $i > 1; $i--) {
        $nCount *= $i;
    }
    for ($k = $m; $k > 1; $k--) {
        $mCount *= $k;
    }
    for ($j = ($n - $m); $j > 1; $j--) {
        $diffCount *= $j;
    }
    return $nCount / ($mCount * $diffCount);
}
