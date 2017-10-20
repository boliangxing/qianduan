<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/5
 * Time: 13:24
 */

namespace app\model;

use think\Model;

class Product extends Model
{
    protected $table = 'product';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
}