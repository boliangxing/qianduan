<template>
    <!-- loading -->
    <div>
        <p class="page_desc">等待加载...</p>
    </div>
</template>

   
<script>
    export default {
        data (){
            return {
                isAuth: false,
                gotomonthly: false,
            }
        },
        ready (){
              setTimeout(() => {
                  this.$route.router.go({ name: 'login'});
              },50);
        },

        route:{
            data (transition){
                this.WxLogin();
            }
        },

        methods:{
            WxLogin() {
                let self = this;
                function authDataCallback(authData) {
                  if (authData) {
                    //cachedUser 才是数据源
                    ref.offAuth(authDataCallback);
                  } else {
                        console.log('no data redirect to url');
                        //var authRef = new Wilddog("https://v5.wilddogio.com");
                        //authRef.authWithOAuthRedirect("weixinmp",function(err,auth){
                        //})
                  }
                }
                //注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。
                var ref = new Wilddog("https://v5.wilddogio.com");
                ref.onAuth(authDataCallback);
            }
        }
    }
</script>

<style lang="sass">
    @import '../assets/scss/iconfont/iconfont.css';
    @import '../assets/scss/CV.scss';
</style>