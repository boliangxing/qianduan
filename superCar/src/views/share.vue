<template>
        <div style="padding: 13px"><b>{{lists.productName}}</b></div>
        <div class="main_icon">
            <img src="../assets/images/main_logo.png"  height="130" width="130" />
        </div>

        <div style="font-family: 'Source Sans Pro';padding: 40px ;margin:0 auto;font-size:32px;color:#575757;text-align:center;"> </div>
        <div style="margin-top:-35px;font-size:19px;color:#575757;text-align:center;"><b>邀请好友</b></div>
        <div style="text-align:center;margin-top:17px;line-height:22px;font-size: 16px;color:#7F7F7F "> 邀请好友50元代金券 <br> <br> 长按二维码关注公众号</div>

        <div class="main_icon">
            <img style="margin-top: 20px" src="../assets/images/safeqrcode.jpg"  height="130" width="130" />
        </div>

        <div style="text-align:center;margin-top:45px;line-height:22px;font-size: 17px;color:#7F7F7F "> 推荐码</div>
        

        <div style="text-align:center;margin-top:10px;font-size: 19px;color:#3E3E3E "> <b>{{xcode}}</b> </div>
</template>

<script>
    import {Swiper,Divider} from 'vux'

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
                lists:[],
                images:[],
                xcode: '',
                id:'',
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
                console.log('xxx',localStorage.wechat_uuid);
                this.xcode = this.getrandom(6);
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
                        var oRef = resourceRef.child(self.wxUUID);
                        oRef.once("value", function(snapshot) {
                            var object = snapshot.val();
                            localStorage.phone     = object.phone; 
                            localStorage.nickname  = object.nickname;
                            localStorage.wechat_uuid = object.wxUUID;
                            if (object.xcode){
                                self.xcode = object.xcode;
                            }else{
                                self.xcode = self.getrandom(6);
                                oRef.update({"xcode":self.xcode});
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
                var resourceRef = new Wilddog('https://v5.wilddogio.com/');
                var authData = resourceRef.getAuth();
                if (authData) {
                    var userRef = new Wilddog('https://v5.wilddogio.com/users')
                        var valueRef = userRef.child(authData.weixinmp.id);
                        valueRef.once("value", function(snapshot) {
                            var object = snapshot.val();
                            console.log(object);
                            localStorage.phone     = object.phone; 
                            localStorage.nickname  = object.nickname;
                            localStorage.wechat_uuid = object.wxUUID;
                            if (object.xcode){
                                self.xcode = object.xcode;
                            }else{
                                self.xcode = self.getrandom(6);
                                valueRef.update({"xcode":self.xcode});
                            }
                        });
                } else {
                    resourceRef.authWithOAuthRedirect("weixinmp",self.authHandler)   
                }

            },

            getrandom(len){   
              var seed = new Array(   
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',   
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',   
                  '0123456789'   
              );   
                
              var idx,i;   
              var result = '';   
              for (i=0; i<len; i++) {  
                idx = Math.floor(Math.random()*3);   
                result += seed[idx].substr(Math.floor(Math.random()*(seed[idx].length)), 1);   
              }    
              return result;     
            }   
        },
        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            Divider,
            Swiper
        }
    }
</script>

<style lang="less">
@import "../vueui/style/widget/weui_button/weui_button.less";
</style>

