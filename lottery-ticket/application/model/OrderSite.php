<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/24
 * Time: 15:40
 */

namespace app\model;

use think\Model;

class OrderSite extends Model
{
    protected $table = 'order_site';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
}