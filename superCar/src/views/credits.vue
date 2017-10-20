<template>
    <div style="padding: 13px"><b>{{lists.productName}}</b></div>
        <div class="main_icon">
            <img src="../assets/images/main_logo.png"  height="130" width="130" />
        </div>

        <div style="font-family: 'Source Sans Pro';padding: 40px ;margin:0 auto;font-size:32px;color:#575757;text-align:center;"> {{credits}}   <!-- <countup :start-val="0" :end-val="credits" :duration="4" ></countup> --></div>
        <div style="margin-top:-35px;font-size:18px;color:#575757;text-align:center;">我的积分</div>
        <div style="test-align:left;line-height:22px; padding: 40px 0px 10px 10px;font-size: 16px;color:#575757"> 1.积分不找零，不兑换现金；<br />
                        2.积分不能与其它优惠活动同时享用，面值内不出具发票；<br />
                        3.积分在标注日期内有效，过期无效；<br />
                        4.5000积分可兑换50元代金券；<br />
                        5.积分解释权归浙江睿棠服饰有限公司所有。</div>
        <div   style="padding: 30px 10px 10px 10px;"> <x-button plain style="padding: 8px">兑换积分</x-button></div>
</template>

<script>
    import {Countup,Divider,XButton} from 'vux'

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
        ready(){
            //this.getCredits();
            //setInterval(this.update, 2000);
        },

        data () {
            let self = this;
            return {
                showActionSheet:false,
                showToast3000: false,
                needChange:false,
                lists:[],
                images:[],
                id:'',
                credits: 0,
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
                this.getCredits();
            }
        },

        // update: function () {
        //   this.credits = parseInt(Math.random() * 100, 10);
        // },

        methods: {
            getCredits () {
                let self = this;
                function authDataCallback(authData) {
                    if (authData) {
                        //cachedUser 才是数据源
                        var object = authData.weixinmp.cachedUserProfile;
                        self.wxUUID = object.openid;
                        console.log(self.wxUUID);
                        var resourceRef = new Wilddog('https://v5.wilddogio.com/users')
                        var oRef = resourceRef.child(self.wxUUID);
                        oRef.once("value", function(snapshot) {
                            var object = snapshot.val();
                            localStorage.credits   = object.credits;
                            localStorage.phone     = object.phone; 
                            localStorage.nickname  = object.nickname;
                            localStorage.wechat_uuid = object.wxUUID;
                            if (object.credits){
                                console.log(object.credits);
                                self.credits = object.credits;
                            }
                        });
                        ref.offAuth(authDataCallback);
                    }else{
                        ref.authWithOAuthRedirect("weixinmp",function(err,auth){})
                    }
                }
            
                //注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。
                var ref = new Wilddog("https://v5.wilddogio.com");
                ref.onAuth(authDataCallback);

            },

            authHandler(error, authData) {
              if (error) {
                  console.log("Login Failed!", error);
              } else {
                  console.log("Authenticated successfully with payload:", authData);
              }
            },

            start () {

                 let self = this;
                 self.getCredits();
                //  var resourceRef = new Wilddog('https://v5.wilddogio.com/users/'+localStorage.wechat_uuid);
                //  console.log('running',localStorage.wechat_uuid);
                //     resourceRef.once("value", function(snapshot) {
                //         var object = snapshot.val();
                //         if(snapshot.exists()){
                //             self.credits = object.credits;
                //         }else{
                            
                //         }
                //     });

            }
        },
        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            Divider,
            XButton,
            Countup
        }
    }
</script>

<style lang="less">
@import "../vueui/style/widget/weui_button/weui_button.less";
</style>

