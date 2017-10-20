<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/4
 * Time: 11:24
 */

namespace app\model;

use think\Model;

class Custom extends Model
{
    protected $table = 'custom';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
}