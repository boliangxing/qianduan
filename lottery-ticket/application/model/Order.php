<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/5
 * Time: 10:55
 */

namespace app\model;

use think\Model;

class Order extends Model
{
    protected $table = 'order';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
    public function products()
    {
        return $this->hasMany('Product','order_id','id');
    }
}