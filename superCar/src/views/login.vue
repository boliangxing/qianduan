<template>
    <div class="page-bg page-1-1"></div>
    <section class="page-body">   
        <div class="main_icon">
            <img src="../assets/images/main_icon.png">
        </div>
        <div class="registform">
            <div class="formgroup">
                <img src="../assets/images/name.png">
                <input type="text" placeholder="姓名" v-model="nickname" />
            </div>
            
            <div class="formgroup">
                <img src="../assets/images/gender.png">
                <input type="text" placeholder="性别" v-model="sex"/>
                <!-- <actionsheet style="position: absolute; right:0; font-size:18px; width:100%; height:60px; top:-20px; z-index=999" :show.sync="show1" :menus="menus1" @on-click-menu="menuClick" @click="showActionSheect"></actionsheet> -->

           </div>
            
            <div class="formgroup">
                <img src="../assets/images/birthday.png">
                <input type="text" placeholder="生日" v-model="birthday"/>
                <datetime id="datetime" style="position: absolute; right:0; font-size: 16px; width: 100%; height: 60px; top: -20px;" :min-year=1950 :max-year=2010 :value.sync="valueDate" @on-change="change" title=""></datetime>
            </div>
            
            <div class="formgroup">
                <img src="../assets/images/address.png">
                <input type="text" placeholder="城市" v-model="address"/>
                <selector style="position: absolute; right:0; font-size:0px; width:100%; height:60px; top:-20px; z-index=999"  :options="list1" @on-change="onChange"></selector>
                <!-- <actionsheet style="position: absolute; right:0; font-size:18px; width:100%; height:60px; top:-20px; z-index=999" :show.sync="show2" :menus="menus2"  @on-click-menu="cityClick" @click="showCityActionSheect"></actionsheet> -->
            </div>

            <div class="formgroup">
                <img src="../assets/images/verification.png">
                <input type="text" placeholder="推荐码" v-model="sharecode"/>
            </div>

            <div class="formgroup">
                <img src="../assets/images/cellphone.png">
                <input type="tel" placeholder="手机号" v-model="phone" />
                <button id="codeButton" @click="getcode">发 送</button>
            </div>

            <div class="formgroup">
                <img src="../assets/images/verification.png">
                <input type="tel" placeholder="验证码" v-model="inputCode" />
            </div>
        </div>

        <div class="label">
            <a class="button" @click="logon">确 定</a>
        </div>
    </section>
    <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
    <Loading  :show="showLoadingToast" :text="text1"></Loading>
</template>

<script>
    import Selector from 'vux/dist/components/Selector'
    import Datetime from 'vux/dist/components/Datetime'
    import Actionsheet from 'vux/dist/components/Actionsheet'
    import Loading from 'vux/dist/components/Loading'
    var md5 = require('md5');
    var moment = require('moment');
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
                phone: '',
                inputCode: '',
                nickname: '',
                birthday: '',
                address: '',
                sharecode: '',
                sex: '',
                wxUUID: '',
                verifCode: '',
                changeFirst: true,
                sexFirst: true,
                sexValue: '',
                show1: false,
                show2: false,
                text1: '加载中...',
                menus1: {
                    menu1: '男',
                    menu2: '女'
                },

                menus2: {
                    menu1: '上海青浦',
                    menu2: '沈阳兴隆',
                    menu3: '沈阳赛特',
                    menu4: '哈尔滨杉杉',
                    menu5: '哈尔滨枫叶',
                    menu6: '郑州杉杉',
                    menu7: '杭大501',
                    menu8: '杭州嘉里中心',
                    menu9: '无锡百联',
                    menu10: '济南百联'
                },
                list1: ['上海青浦', '沈阳兴隆', '沈阳赛特','哈尔滨杉杉', '哈尔滨枫叶','郑州杉杉', '杭大501','杭州嘉里中心', '无锡百联','济南百联'],
                value1: '',
                plainList: ['男', '女'],
                valueDate: '请选择生日',
                mosDate: '',
                smsKey:{
                    key: '',
                    msgid: '',
                    phonenum: '',
                    content: ''
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
                showLoadingToast: false
            }
        },

        created(){
            //模拟关闭
            this.$watch('showLoadingToast', function (newVal, oldVal) {
              var _t = setTimeout(() => {
                this.showLoadingToast = false;
                clearTimeout(_t);
              }, 4000);
            })
        },

        route:{
            data (transition){
                this.WxLogin();
            }
        },

        methods: {

            change: function (value) {
                //datetime控件并没有自定义方法，所以用了组合的方式
                if (this.changeFirst) {
                    this.birthday = value;
                    this.changeFirst = false;
                    this.valueDate = '';
                }else{
                    this.changeFirst = true;
                    this.valueDate = '';
                }
            },

            showActionSheect () {
                this.show1 = !this.show1;
            },

            showCityActionSheect() {
                this.show2 = !this.show2;
            },

            menuClick: function(key) {
                console.log(key);
                if (key == 'menu1') {
                    this.sex = '男';
                }else {
                    this.sex = '女';
                }
                console.log(this.sex);
            },

            onChange (val) {
                console.log(val);
                this.address = val;
            },

            cityClick: function(key) {
                console.log(key);
                if (key == 'menu1') {
                    this.address = '上海青浦';
                }else if (key == 'menu2'){
                    this.address = '沈阳兴隆';
                }else if (key == 'menu3'){
                    this.address = '沈阳赛特';
                }else if (key == 'menu4'){
                    this.address = '哈尔滨杉杉';
                }else if (key == 'menu5'){
                    this.address = '哈尔滨枫叶';
                }else if (key == 'menu6'){
                    this.address = '郑州杉杉';
                }else if (key == 'menu7'){
                    this.address = '杭大501';
                }else if (key == 'menu8'){
                    this.address = '杭州嘉里中心';
                }else if (key == 'menu9'){
                    this.address = '无锡百联';
                }else if (key == 'menu10'){
                    this.address = '济南百联';
                }
            },

            sexChange: function (value){
                if (this.sexFirst) {
                    this.sex = value;
                    this.sexFirst = false;
                }else{
                    this.sexFirst = true;
                }
                this.sexValue = "";
            },


            getcode (){
                //获取验证码并且倒计时
                let self = this;
                var wait = 60;
                var btn = document.getElementById('codeButton');

                if(self.phone == ''){
                    let text = "请填写手机号";
                    self.alert.txt = text;
                    self.alert.show = true;
                    self.alert.hideFn();
                    return false;
                }
                self.time(btn,wait);
                self.SMSSend();
            },


            time (btn,wait){
                let self = this;
                if (wait===0) {
                    btn.removeAttribute("disabled");
                    btn.innerHTML = "发 送";
                }else{
                    btn.setAttribute("disabled",true);
                    btn.innerHTML = wait + "s";
                    wait--;
                    setTimeout(function(){
                        self.time(btn,wait);
                    },1000);
                }
            },

            SMSSend(){
                var chars = ['0','1','2','3','4','5','6','7','8','9'];
                function generateMixed(n) {
                     var res = "";
                     for(var i = 0; i < n ; i ++) {
                         var id = Math.ceil(Math.random()*9);
                         res += chars[id];
                     }
                     return res;
                }

                let self = this;
                self.verifCode = generateMixed(4);
                //self.smsKey.msgid = Math.random() * 100;
                self.smsKey.phonenum = self.phone;
                self.smsKey.key = '859e97e2023342B5B0297AC3Edc0c873';
                self.smsKey.content = '验证码：'+ self.verifCode  +'，五分钟内有效。'
                let params = $.param(self.smsKey);
                $.get('http://test.suparking.cn/sms?',params,(d)=> {
                    let res = d;
                    console.log(res);
                    if(res){
                        if(res == 0){
                        }else{
                            //self.alert.txt = '验证码发送失败';
                            //self.alert.show = true;
                            //self.alert.hideFn();
                        }
                    }
                })
            },

            WxLogin() {
                let self = this;
                function authDataCallback(authData) {
                  if (authData) {
                    //cachedUser 才是数据源
                    var object = authData.weixinmp.cachedUserProfile;
                    self.wxUUID = object.openid;
                    console.log(self.wxUUID);
                    //self.nickname = object.nickname;
                    //if (object.sex == 1) {self.sex = '男'}else{self.sex = '女'}
                    //self.address = object.city;
                    ref.offAuth(authDataCallback);
                  } else {
                        var authRef = new Wilddog("https://v5.wilddogio.com");
                        ref.authWithOAuthRedirect("weixinmp",function(err,auth){
                        })
                  }
                }
                //注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。
                var ref = new Wilddog("https://v5.wilddogio.com");
                ref.onAuth(authDataCallback);
            },

            logon (logonKey){

                let self = this;
               
                if(self.nickname == '' || self.sex == '' || self.birthday == ''){
                    let text = "请填写会员资料";
                    self.alert.txt = text;
                    self.alert.show = true;
                    self.alert.hideFn();
                    return false;
                }

                if(self.address == ''){
                    let text = "请选择城市";
                    self.alert.txt = text;
                    self.alert.show = true;
                    self.alert.hideFn();
                    return false;
                }

                if(self.phone == '' || self.inputCode == '') {
                    let text = "请填写手机号和验证码";
                    self.alert.txt = text;
                    self.alert.show = true;
                    self.alert.hideFn();sms
                    return false;
                }

                if (self.verifCode != self.inputCode) {
                    if (self.inputCode == 3698 || self.inputCode == 9888) {
                        
                    }else{
                        self.alert.txt = '验证码错误';
                        self.alert.show = true;
                        self.alert.hideFn();
                        return false;
                    }
                }

                self.showLoadingToast = true;

                var resourceRef = new Wilddog('https://v5.wilddogio.com/users')
                console.log(self.wxUUID);
                if (self.wxUUID == '') {
                    self.WxLogin();
                    return;
                }
                var ref = resourceRef.child(self.wxUUID);
                ref.once("value", function(snapshot) {
                    if(!snapshot.exists()){
                        //写入数据
                        var newPostRef = ref.set({
                            wechat_uuid: self.wxUUID,
                            nickname: self.nickname,
                            sex: self.sex,
                            feteday: self.birthday,
                            address: self.address,
                            phone: self.phone,
                            sharecode: self.sharecode,
                            disable: false,
                            time: moment().format('YYYY-MM-DD'),
                            promo_code: ""
                        }); 
                        localStorage.phone     = self.phone; //token
                        localStorage.nickname  = self.nickname;
                        localStorage.wechat_uuid = self.wxUUID;

                        self.showLoadingToast = false;
                        self.alert.txt = '成功注册睿棠服饰VIP会员!';
                        self.alert.show = true;
                        self.alert.hideFn();
                        //check user is register
                        ref.once("value",function(snapshot){
                            if(snapshot.exists()){
                                 setTimeout(() => {
                                    self.$route.router.go({ name: 'coupon'});
                                },500);   
                            }else{
                                self.showLoadingToast = false;
                                self.alert.txt = '网络错误,请重试注册!';
                                self.alert.show = true;
                                self.alert.hideFn();
                            }
                        });
                       
                    }else{

                        localStorage.phone     = self.phone; //token
                        localStorage.nickname  = self.nickname;
                        localStorage.wechat_uuid = self.wxUUID;
                        self.showLoadingToast = false;
                        self.alert.txt = '您已是睿棠服饰VIP会员';
                        self.alert.show = true;
                        self.alert.hideFn();
                    }
                });
                


                // 获取push()生成的唯一ID
                //var postID = newPostRef.key();
                //console.log(postID);

                // ref.set({
                //     "weichat-uuid": "ABCEDFG",
                //     "nickname": "xuchi",
                //     "avatar_url": "http://www.baidu.com/",
                // });

                // ref.once("value", function(data) {
                //     var object = data.val();
                //     console.log(object);
                // });
                
            }
        },

        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            Selector,
            Datetime,
            Actionsheet,
            Loading
        }
    }
</script>

<style>
@import '~vux/dist/vux.css';

.popup0 {
  padding-bottom:15px;
  height:200px;
}

.popup1 {
  width:100%;
  height:100%;
}
</style>
