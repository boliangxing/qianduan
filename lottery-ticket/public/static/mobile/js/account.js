/**
 * Created by zy2014 on 2017/8/9.
 */
$(function () {

    //登陆
    $(document).on('click', '#login-btn', function () {
        var phone = $.trim($("#login-phone").val());
        var password = $.trim($("#login-password").val());
        var reg = /^1\d{10}$/;
        if (!reg.test(phone)) {
            $.toast('手机号格式错误');
            return;
        }
        var regPass = /^[\w-]{6,22}$/;
        if (!regPass.test(password)) {
            $.toast('密码格式不正确由6-30位英文、数字及“_”、“-”组成');
            return;
        }

        $.ajax({
            type: 'POST',
            data: {phone: phone, password: password},
            url: '/index.php/mobile/account/login',
            success: function (result) {
                if (result.code === 200) {
                    $.toast(result.message);
                    window.location.href = '/index.php/mobile/account/center';
                } else {
                    $.toast(result.message);
                }
            },
            error: function () {
                $.toast('异步请求失败');
            }

        });

    });


    //注册
    $(document).on('click', '#register-smsSend', function () {

        var registerPhone = $.trim($("#register-phone").val());
        var reg = /^1\d{10}$/;
        if (!reg.test(registerPhone)) {
            $.toast('手机号格式错误');
            return;
        }
        var inter;
        var s1 = 100;

        function send() {
            if (s1 == 0) {
                $("#register-smsSend").text("发送");
                clearInterval(inter);
                s1 = 30;
                return;
            }

            s1--;
            $("#register-smsSend").html("" + s1 + "秒");
        }


        $.ajax({
            type: 'POST',
            url: "/index.php/mobile/account/registerSendSmsCode",
            data: {user_phone: registerPhone},
            success: function (result) {
                if (result.code === 200) {

                    inter = setInterval(send, 1000);
                } else {
                    $.toast(result.message);
                }

            },
            error: function () {
                $.toast('异步请求失败');
            }
        });
    });

    $(document).on('click', '#register-btn', function () {
        var registerPhone = $.trim($("#register-phone").val());
        var registerSmsCode = $.trim($("#register-sms-code").val());
        var registerCode = $.trim($("#register-code").val());
        var password = $.trim($("#register-password").val());
        var confirmPassword = $.trim($("#register-confirm-password").val());
        var reg = /^1\d{10}$/;
        if (!reg.test(registerPhone)) {
            $.toast('手机号格式错误');
            return;
        }

        if (!registerSmsCode) {
            $.toast('短信验证码不能为空');
            return;
        }
        if (!registerCode) {
            $.toast('验证码不能为空');
            return;
        }
        var regPass = /^[\w-]{6,22}$/;
        if (!regPass.test(password)) {
            $.toast('密码格式不正确由6-30位英文、数字及“_”、“-”组成');
            return;
        }

        if (!regPass.test(confirmPassword)) {
            $.toast('确认密码格式不正确');
            return;
        }

        $.ajax({
            type: 'POST',
            data: {
                registerPhone: registerPhone,
                registerSmsCode: registerSmsCode,
                registerCode: registerCode,
                password: password,
                confirmPassword: confirmPassword
            },
            url: '/index.php/mobile/account/register',
            success: function (result) {
                if (result.code === 200) {
                    $.toast(result.message);
                } else {
                    $.toast(result.message);
                }
            },
            error: function () {
                $.toast('异步请求失败');
            }
        });


    });
    //注册结束


    //忘记密码

    $(document).on('click', '#forget-smsSend', function () {

        var phone = $.trim($("#forget-phone").val());
        var reg = /^1\d{10}$/;
        if (!reg.test(phone)) {
            $.toast('手机号格式错误');
            return;
        }
        var inter;
        var s1 = 100;

        function send() {
            if (s1 == 0) {
                $("#forget-smsSend").text("发送");
                clearInterval(inter);
                $("#forget-smsSend").prop('disabled', false);
                return;
            }

            s1--;
            $("#forget-smsSend").html("" + s1 + "秒");
        }


        $.ajax({
            type: 'POST',
            url: "/index.php/mobile/account/forgetSendSmsCode",
            data: {user_phone: phone},
            success: function (result) {
                if (result.code === 200) {

                    inter = setInterval(send, 1000);
                    $("#forget-smsSend").prop('disabled', true);
                } else {
                    $.toast(result.message);
                }

            },
            error: function () {
                $.toast('异步请求失败');
            }
        });
    });

    $(document).on('click', '#forget-btn', function () {
        var phone = $.trim($("#forget-phone").val());
        var smsCode = $.trim($("#forget-sms-code").val());
        var code = $.trim($("#forget-code").val());
        var password = $.trim($("#forget-password").val());
        var confirmPassword = $.trim($("#forget-confirm-password").val());
        var reg = /^1\d{10}$/;
        if (!reg.test(phone)) {
            $.toast('手机号格式错误');
            return;
        }

        if (!smsCode) {
            $.toast('短信验证码不能为空');
            return;
        }
        if (!code) {
            $.toast('验证码不能为空');
            return;
        }
        var regPass = /^[\w-]{6,22}$/;
        if (!regPass.test(password)) {
            $.toast('密码格式不正确由6-30位英文、数字及“_”、“-”组成');
            return;
        }

        if (!regPass.test(confirmPassword)) {
            $.toast('确认密码格式不正确');
            return;
        }

        $.ajax({
            type: 'POST',
            data: {
                phone: phone,
                smsCode: smsCode,
                code: code,
                password: password,
                confirmPassword: confirmPassword
            },
            url: '/index.php/mobile/account/forget',
            success: function (result) {
                if (result.code === 200) {
                    $.toast(result.message);
                    window.location.href = '/index.php/mobile/account/index';
                } else {
                    $.toast(result.message);
                }
            },
            error: function () {
                $.toast('异步请求失败');
            }
        });

    });

    //忘记密码结束

    $.init();
});