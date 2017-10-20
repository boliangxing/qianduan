<template>
    <div class="page-bg page-2-1"></div>
    <section class="page-body">
        <div class="main_icon">
            <img src="../assets/images/main_icon.png">
        </div>
       <div id="coupon_detail" @click="getCoupon">
            <div id="coupon_inside">
                <div id="coupon_value">
                    {{discount}}<div id="coupon_value_yuan">元</div>
                </div>
                    <div id="coupon_explain" v-if="dole">
                        <div v-if="dole">{{couponCode}}</div>
                        <div id="coupon_date" v-if="dole">
                        {{couponTime}}----{{couponDeadline}}
                        </div>
                    </div>

                    <div id="coupon_explain" v-if="dole == false">
                        <br />
                        <div v-if="dole == false">点击领取</div>
                    </div>
            </div>
            <span id="com_detail">  1.本优惠券不找零，不兑换现金，请在结账前出示本券；<br />
                                    2.本券不能与其它优惠活动同时享用，面值内不出具发票；<br />
                                    3.本券不能叠加使用，单张小票限用一张；<br />
                                    4.此券在标注日期内有效，过期无效；<br />
                                    5.此券解释权归浙江睿棠服饰有限公司所有。</span>
        <div>
    </section>

    <Toast :show.sync="showToast3000" :time="1400">成功领取优惠券</Toast>
    <Loading :show="showLoadingToast" :text="text1"></Loading>
    <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
</template>

<script>
    import {Loading,Toast} from 'vux'

    //import Toast from './../vueui/Toast.vue'
    //import Loading from './../vueui/Loading.vue'

    var moment = require('moment');
    var md5 = require('md5');
    let browser = {
        versions: function() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    export default {
        data () {
            let self = this;
            return {
                showActionSheet:false,
                showToast3000: false,
                needChange:false,
                userId: '',
                couponCode: '',
                wxUUID: '',
                discount: '200',
                dole: false,
                text: '加载中...',
                couponTime: '',
                couponDeadline: '',
                key:{
                    op:'ForgotPass',
                    phone:'',
                },

                changeKey:{
                    op: 'EditForgotPass',
                    accesstoken: '',
                    pass: '',
                    code: ''
                },
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            self.alert.show = false;
                        }, 1000);
                    }
                },
                loading:{
                    show:false,
                    showTxt:''
                },
                showLoadingToast: false

            }
        },

        route:{
            data (transition){
                if (localStorage.coupon) {
                    this.dole = true;
                    this.getCoupon();
                }
            }
        },

        methods: {
            getCoupon () {
                let self = this;
                function authDataCallback(authData) {
                  if (authData) {
                    //cachedUser 才是数据源
                    var object = authData.weixinmp.cachedUserProfile;

                    self.wxUUID = object.openid;
                    console.log(self.wxUUID);
                    
                    var resourceRef = new Wilddog('https://v5.wilddogio.com/users')

                    var ref = resourceRef.child(self.wxUUID);
                    ref.once("value", function(snapshot) {
                        var object = snapshot.val();
                        console.log(object);
                        if(snapshot.exists()){
                            console.log('有数据');
                            if (object.phone && snapshot.key()) {
                                console.log('有详细数据');
                                //已经注册过会员
                                //写入本地localstorage数据
                                localStorage.phone     = object.phone; 
                                localStorage.nickname  = object.nickname;
                                localStorage.wechat_uuid = object.wxUUID;
                                //设置优惠券开始时间

                                //查询是否有优惠券码
                                if (!object.promo_code) {
                                    console.log('没有码，领取');
                                    //还未领取优惠券
                                    self.getpromo(); //领取优惠券
                                }else{
                                    console.log('有码了，显示');
                                    self.dole = true;
                                    self.couponCode = object.promo_code.code;
                                    self.discount = object.promo_code.discount;
                                    localStorage.coupon = object.promo_code.code;
                                    self.couponTime = object.promo_code.starttime;
                                    self.couponDeadline = object.promo_code.deadline;
                                    return;
                                }
                            }
                        }else{
                            self.alert.txt = '您还不是睿棠服饰VIP会员';
                            self.alert.show = true;
                            self.alert.hideFn();
                            localStorage.coupon = '';
                            localStorage.phone     = ''; 
                            localStorage.nickname  = '';
                            localStorage.wechat_uuid = '';
                            return false;
                        }
                    });

                    ref.offAuth(authDataCallback);

                  } else {
                    self.alert.txt = '您还不是睿棠服饰VIP会员';
                    self.alert.show = true;
                    self.alert.hideFn();
                    return false;
                  }
                }
                //注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。
                var ref = new Wilddog("https://v5.wilddogio.com");
                ref.onAuth(authDataCallback);
            },

            getpromo() {
                //显示加载动画
                let self = this;
                self.showLoadingToast = true;

                self.alert.txt = '优惠券活动结束了.下次请尽早领取哦！';
                self.alert.show = true;
                self.alert.hideFn();
                self.showLoadingToast = false;
                return;

                setTimeout(function () {
                    //获取一张未使用的优惠券
                    var disref = new Wilddog("https://v5.wilddogio.com/discount");
                    disref.orderByChild("used").equalTo(false).limitToFirst(1).on("child_added",function(snapshot){
                        var object = snapshot.val();
                        self.couponCode = snapshot.key();
                        self.discount = object.discount;
                        self.dole = true;

                         //写入获取者数据，根据微信id
                        var setRef = new Wilddog("https://v5.wilddogio.com/discount/"+self.couponCode);  //获取优惠券所在节点
                        var days30 = moment().add(30, 'days').calendar();
                        var m = moment().format('YYYY-MM-DD');
                        var days30Format = moment(days30).format('YYYY-MM-DD');
                        console.log(days30);
                        setRef.update({"used":true,"wxid":self.wxUUID,"time":m,"deadline":days30Format});

                        //写入用户自己的码
                        var userRef = new Wilddog("https://v5.wilddogio.com/users/"+self.wxUUID);  //获取用户节点
                        userRef.update({"promo_code":{"code":self.couponCode,"discount":self.discount,"starttime":m,"deadline":days30Format}});
                        localStorage.coupon = self.couponCode;
                        self.couponTime = m;
                        self.couponDeadline = days30Format;

                    });
                    self.showLoadingToast = false;
                    self.showToast3000 = true;
                }, 2000);
            }
        },
        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            Toast,
            Loading,
        }
    }
</script>

<style lang="less">
@import "../vueui/style/widget/weui_button/weui_button.less";
</style>

