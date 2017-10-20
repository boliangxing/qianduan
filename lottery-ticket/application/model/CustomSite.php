<?php
/**
 * Created by PhpStorm.
 * User: zy2014
 * Date: 2017/8/4
 * Time: 10:19
 */

namespace app\model;

use think\Model;

class CustomSite extends Model
{
    protected $table = 'custom_site';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
}