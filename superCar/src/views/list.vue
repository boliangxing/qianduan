<template>
    <li v-for='item in lists'  track-by="productName">
        <div style="padding: 13px"><b>{{item.productName}}</b></div>
        <card >
          <img slot="header" src={{item.images[0]}} style="padding: 0px 10px 5px 10px;width:100%;display:block;" @click="gotoDetail(item.id)">
          <div slot="content" class="card-padding">
            <p style="padding: 0px 10px 20px 10px;font-size:14px;line-height:1.2;"> {{item.remake}} <x-button mini plain style="margin-right:5px;float:right;">加入收藏</x-button></p>
          </div>
        </card>
    </li>
</template>

<script>
    import {Card,XButton,Divider} from 'vux'

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
                this.start();
            }
        },

        methods: {
            start () {
                let self = this;
                 var resourceRef = new Wilddog('https://v5.wilddogio.com/products');
                    resourceRef.orderByChild("order").once("value", function(snapshot) {
                        var object = snapshot.val();
                        console.log(object);
                        if(snapshot.exists()){
                            self.lists = object;
                        }else{
                            
                        }
                    });

            },

            gotoDetail:function(item){
                console.log(item.productName);
                this.$route.router.go({name:'product',params:{item:item}});
            },
        },
        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            XButton,
            Divider,
            Card
        }
    }
</script>

<style lang="less">
@import "../vueui/style/widget/weui_button/weui_button.less";
</style>

