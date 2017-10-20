<template>
    <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
        <user-info></user-info>
        <ul class="list-ul">
            <li class="icon-hao iconfont" v-link="{'name':'list',query:{tab:'all'}}">停车缴费</li>
            <li class="icon-zhaopin iconfont" v-link="{name:'monthly',query:{tab:'good'}}">停车场包月</li>
           
            <li class="icon-xiaoxi iconfont line" v-link="{name:'message'}" class="line">消息</li>
            <li class="icon-about iconfont" @click="logout">退出</li>
        </ul>
    </section>
</template>
<script>
    require('../assets/scss/iconfont/iconfont.css');

    export default {
        replace:true,
        props: ['showMenu','pageType','nickName','profileUrl'],
        components:{
            'userInfo':require('./user-info.vue')
        },
        methods:{
            logout() {
                localStorage.userId     = ''; //token
                localStorage.loginname  = '';
                this.$route.router.go({ name: 'login'});
            }
        }
    }

    
</script>

<style lang="sass">
/*侧边栏*/
.nav-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -200px;
    width: 200px;
    background-color: #fff;
    color: #313131;
    transition: all .3s ease;
    z-index: 99;
    &.show{
        transform: translateX(200px);
    }
}

/*侧边栏列表*/
.list-ul {
    margin: 0 24px;
    border-top: 1px solid #d4d4d4;
    overflow: hidden;
    padding-top: 9%;
    li {
        font-size: 14px;
        font-weight: 200;
        padding: 9% 0;
        text-align: left;
        text-indent: 1px;
        line-height: 15px;
        color: #7f8c8d;
        &:last-child {
            margin-bottom: 50px;
        }
        &:before{
            color: #2c3e50;
        }
    }

    .line{
        border-top: 1px solid #d4d4d4;
    }
    a {
        display: block;
        color: #313131;
    }
}
</style>