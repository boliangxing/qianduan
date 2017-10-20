/**
 * Created by zy2014 on 2017/8/17.
 */

var u = navigator.userAgent, app = navigator.appVersion;
var browser = {
    versions: function() {

        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()
}
var openUrl = window.location.search;
openUrl = openUrl.substring(1, openUrl.length);

function is_IOS() {
    if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        return true;
    } else {
        return false;
    }
}
function isWeixin() {
    var shareImg = document.getElementById('shareImg')
    if (u.toLowerCase().match(/MicroMessenger/i)=='micromessenger') {
        shareImg.src = 'image/icon1.jpg';
        document.getElementById('downApp').style.display = 'none';
    } else {
        shareImg.src = 'image/icon2.jpg';
        document.getElementById('downApp').style.display = 'block';
        do_check();
    }
}
function is_Android() {
    return browser.versions.android;
}
function do_check() {
    if (is_IOS()) {
        window.location="kwssz://kwssz.app?" + openUrl;
    } else  {
        window.location="kwssz://kwssz.app?" + openUrl;
    }
}
function downApp() {
    window.location="https://fir.im/wmzr";
}

