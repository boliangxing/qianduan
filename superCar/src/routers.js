'use strict'

export default function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: require('./views/index.vue')
        },
        '/':{               //登录
            name:'login',
            component: function(resolve){
                require(['./views/login.vue'],resolve);
            }
        },
        '/login':{               //登录
            name:'login',
            component: function(resolve){
                require(['./views/login.vue'],resolve);
            }
        },
        '/coupon':{
            name:'coupon',
            component: function(resolve){
                require(['./views/coupon.vue'],resolve);
            }
        },
        '/list':{
            name:'list',
            component: function(resolve){
                require(['./views/list.vue'],resolve);
            }
        },
        '/lists':{
            name:'lists',
            component: function(resolve){
                require(['./views/openlists.vue'],resolve);
            }
        }, 
        '/product/:item':{
            name:'product',
            component: function(resolve){
                require(['./views/product.vue'],resolve);
            }
        },
        '/credits':{
            name:'credits',
            component: function(resolve){
                require(['./views/credits.vue'],resolve);
            }
        },
        '/share':{
            name:'share',
            component: function(resolve){
                require(['./views/share.vue'],resolve);
            }
        }

    })
}