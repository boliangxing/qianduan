<template>

    <li>
        <div style="padding: 13px"><b>2016冬季</b></div>
       <swiper :aspect-ratio="300/800">
          <swiper-item class="swiper-demo-img" v-for="item in images"><img :src="item"></swiper-item>
        </swiper>
       <div slot="content" class="card-padding">
            <p style="padding: 0px 10px 20px 10px;font-size:14px;line-height:1.2;"> {{lists.remake}} </p>
        </div>
    </li>

</template>

<script>
    import {Swiper,Divider,SwiperItem} from 'vux'

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
                this.id = transition.to.params.item;
                console.log('item:',this.id);
                this.start();
            }
        },

        methods: {
            start () {
                let self = this;
                    var resourceRef = new Wilddog('https://v5.wilddogio.com/products/');
                    console.log(self.id);
                    resourceRef.orderByChild("id").equalTo(parseInt(self.id)).once("child_added", function(snapshot) {
                        var object = snapshot.val();
                        console.log('object',object);
                        if(snapshot.exists()){
                            self.lists = object;
                            var r=[];
                            for (var i = object.images.length - 1; i >= 0; i--) {
                                console.log(object.images[i]);
                               r.push(object.images[i]);
                            }
                            console.log(r);
                            self.images = r.map((one, index) => ({
                              url: 'javascript:',
                              img: one
                            }))
                           
                            console.log(self.images);
                        }else{
                            
                        }
                    });
            }
        },
        components:{
            "nvAlert":require('../components/nvAlert.vue'),
            Divider,
            Swiper,
            SwiperItem
        }
    }
</script>

<style lang="less">
@import "../vueui/style/widget/weui_button/weui_button.less";
</style>

