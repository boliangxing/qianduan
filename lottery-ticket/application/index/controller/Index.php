<?php

namespace app\index\controller;

class Index
{
    public function index()
    {

 // var_dump(json_decode($str2,true));
       $key = '~~663dskojfasjfk44..~~';

       $SzAddress = '3';
       $SzGameOpenId = '123456';
       $NState = 0;
       $DwParentUserID = 0;
       $SzOpendId = '123456';
       $SzPhone = '1';
       $SzLogonPass = md5(211111524);
       $NGameType = 1;
       $Sign = md5(strtolower($SzAddress . $SzGameOpenId . $NState . $DwParentUserID . $SzOpendId . $SzPhone . $SzLogonPass . $NGameType . $key));

       $url = 'http://10.7.24.245:8080/';
       $url .= 'PHP_RegisterAccounts_agent?';
       $url .= 'szAddress=' . $SzAddress . '&szGameOpenId=' . $SzGameOpenId . '&nState=' . $NState . '&dwParentUserID=' . $DwParentUserID . '&szOpendId=' . $SzOpendId . '&szPhone=' . $SzPhone . '&szLogonPass=' . $SzLogonPass . '&nGameType=' . $NGameType . '&Sign=' . $Sign;

       var_dump(my_curl($url));
    }

    public function register()
    {
        $key = '~~663dskojfasjfk44..~~';
        $szAddress = input('szAddress');
        $szGameOpenId = input('szGameOpenId');
        $nState = input('nState');
        $dwParentUserID = input('dwParentUserID');
        $szOpendId = input('szOpendId');
        $szPhone = input('szPhone');
        $szLogonPass = input('szLogonPass');
        $nGameType = input('nGameType');
        $Sign = md5(strtolower($szAddress . $szGameOpenId . $nState . $dwParentUserID . $szOpendId . $szPhone . $szLogonPass . $nGameType . $key));

        $url = 'http://10.7.24.245:8080/';
        $url .= 'PHP_RegisterAccounts_agent?';
        $url .= 'szAddress=' . $szAddress . '&szGameOpenId=' . $szGameOpenId . '&nState=' . $nState . '&dwParentUserID=' . $dwParentUserID . '&szOpendId=' . $szOpendId . '&szPhone=' . $szPhone . '&szLogonPass=' . $szLogonPass . '&nGameType=' . $nGameType . '&Sign=' . $Sign;
        var_dump(my_curl($url));
    }

    public function login()
    {
        $key = '~~663dskojfasjfk44..~~';
        $szOpenId = input('szOpenId');
        $szPhone = input('szPhone');
        $szPassWord = input('szPassWord');
        $Sign = md5(strtolower($szOpenId . $szPhone . $szPassWord . $key));

        $url = 'http://10.7.24.245:8080/';
        $url .= 'PHP_loginAccounts_agent?';
        $url .= 'szOpenId=' . $szOpenId . '&szPhone=' . $szPhone . '&szPassWord=' . $szPassWord . '&Sign=' . $Sign;
        var_dump(my_curl($url));
    }

    public function queryCard()
    {
        $key = '~~663dskojfasjfk44..~~';
        $dwUserID = input('dwUserID');
        $dwRevUserID = input('dwRevUserID');
        $szOrder = input('szOrder');
        $szBeginTime = input('szBeginTime');
        $szEndTime = input('szEndTime');

//        error_log(var_export(input(),1));

        $Sign = md5(strtolower($dwUserID . $dwRevUserID . $szOrder . $szBeginTime . $szEndTime . $key));

        $url = 'http://10.7.24.245:8080/';
        $url .= 'PHP_RoomCard_Log_query?';
        $url .= 'dwUserID=' . $dwUserID . '&dwRevUserID=' . $dwRevUserID . '&szOrder=' . $szOrder . '&szBeginTime=' . $szBeginTime . '&szEndTime=' . $szEndTime . '&Sign=' . $Sign;
        error_log($url);
        var_dump(my_curl($url));
    }

    public function agentApprove()
    {
        $key = '~~663dskojfasjfk44..~~';
        $dwUserID = input('dwUserID');
        $dwApprove = input('dwApprove');
        $nState = input('nState');
        $dwWaitUserID = input('dwWaitUserID');

        $Sign = md5($dwUserID . $dwApprove . $nState . $dwWaitUserID . $key);
        $url = 'http://10.7.24.245:8080/';
        $url .= 'PHP_approveAccounts_agent?';

        $url .= 'dwUserID=' . $dwUserID . '&dwApprove=' . $dwApprove . '&nState=' . $nState . '&dwWaitUserID=' . $dwWaitUserID . '&Sign=' . $Sign;
        error_log($url);
        var_dump(my_curl($url));
    }

    public function getCardScore()
    {
        $key = '~~663dskojfasjfk44..~~';
        $dwUserID = input('dwUserID');
        $dwUserID = 124552;
        $Sign = md5(strtolower($dwUserID . $key));
        $url = 'http://10.7.24.245:8080/';
        $url .= 'php_get_card_score?dwUserID=' . $dwUserID . '&Sign=' . $Sign;
        var_dump(my_curl($url));
    }

    public function addRebate()
    {
        $key = "~~663dskojfasjfk44..~~";
        $dwSuserID = input('dwSuserID');
        $dwTuserID = input('dwTuserID');
        $llChangeCoin = input('llChangeCoin');
        error_log(var_export(input(), 1));
        $sign = md5(strtolower($dwSuserID . $dwTuserID . $llChangeCoin . $key));
        $url = "http://10.7.24.245:8080/PHP_Update_RoomCard_Rebate?dwSuserID=$dwSuserID&dwTuserID=$dwTuserID&llChangeCoin=$llChangeCoin&Sign=$sign";
        error_log($url);
        var_dump(my_curl($url));
    }

    public function queryRebate()
    {
        $key = "~~663dskojfasjfk44..~~";
        $dwUserID = input('dwUserID');
        $sign = md5(strtolower($dwUserID . $key));
        $url = "http://10.7.24.245:8080/PHP_Query_RoomCard_Rebate?dwUserID={$dwUserID}&Sign=$sign";
        var_dump(my_curl($url));

    }

    public function applyRebate()
    {
        $key = "~~663dskojfasjfk44..~~";
        $dwUserID = input('dwUserID');
        $dwCardCount = input('dwCardCount');
        $sign = md5(strtolower($dwUserID . $dwCardCount . $key));
        $url = "http://10.7.24.245:8080/PHP_Apply_RoomCard_Rebate?dwUserID={$dwUserID}&dwCardCount={$dwCardCount}&Sign=$sign";
        var_dump(my_curl($url));
    }

    public function approveRebate()
    {
        $key = "~~663dskojfasjfk44..~~";
        $dwUserID = input('dwUserID');
        $dwCardCount = input('dwCardCount');
        $nOperate = input('nOperate');
        $nId = input('nId');
        $sign = md5(strtolower($dwUserID . $dwCardCount . $nOperate . $nId . $key));
        $url = "http://10.7.24.245:8080/PHP_Approve_RoomCard_Rebate?dwUserID={$dwUserID}&dwCardCount={$dwCardCount}&nOperate={$nOperate}&nId={$nId}&Sign=$sign";
        error_log($url);
        var_dump(my_curl($url));
    }

    public function cardTransfer()
    {
        //房卡转账
        $key = "~~663dskojfasjfk44..~~";
        $dwSendUserID = input('dwSendUserID');
        $dwRevUserID = input('dwRevUserID');
        $llCardCount = input('llCardCount');
        $sign = md5(strtolower($dwSendUserID . $dwRevUserID . $llCardCount . $key));
        $url = "http://10.7.24.245:8080/PHP_Approve_RoomCard_Rebate?dwSendUserID={$dwSendUserID}&dwRevUserID={$dwRevUserID}&llCardCount={$llCardCount}&Sign=$sign";
        var_dump(my_curl($url));
    }
}
