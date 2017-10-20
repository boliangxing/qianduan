<?php

namespace app\model;

use think\Model;

class AdminUser extends Model
{
    protected $table = 'admin';
    protected $autoWriteTimestamp = 'datetime';
    protected $resultSetType = 'collection';
}