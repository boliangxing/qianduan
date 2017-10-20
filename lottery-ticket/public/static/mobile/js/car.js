/**
 * Created by zy2014 on 2017/8/17.
 */
//删除购物车列表
function removeCarList(_this, id) {
    var order = JSON.parse(sessionStorage.order);
    _.remove(order, function (n) {
        return n.id == id;
    });
    sessionStorage.order = JSON.stringify(order);
    $(_this).parents('.card').remove();
    countCarFee();
}
//计算购物车价格
function countCarFee() {
    var totalFee = 0;
    var betNum = 0;
    var mul = 0;
    $("#car-goods-info").find(".card").each(function () {
        betNum = $(this).find(".bet-num").text();
        mul = $(this).find(".mul").text();
        totalFee += betNum * 2 * mul;
    });
    $("#carTotalFee").text(totalFee);
}


$(function () {
    $(document).on('pageInit', function (e, id, page) {

        if (id === "car-page") {
            var car_order = JSON.parse(sessionStorage.getItem('order'));
            if (!car_order) {
                return;
            }
            $("#car-list").html('');
            $.each(car_order, function (index, item) {

                var car_html = '<div class="card">';
                car_html += '<div class="card-content">';
                car_html += '<div class="card-content-inner">';
                car_html += '<div class="row">';
                car_html += '<div class="col-90">';


                $.each(item.groups, function (index2, item2) {

                    $.each(item2.type, function (index3, item3) {

                        if (index3 === 0) {
                            car_html += '<span class="' + item2.color + '">';
                        }

                        if ((index3 + 1) === item2.type.length) {

                            car_html += item3.element + '</span>';

                            if (index2 + 1 !== item.groups.length) {
                                car_html += ' | ';
                            }


                        } else {
                            car_html += item3.element + ' ';
                        }

                    });
                });

                car_html += '<div class="hint-font">';
                car_html += item.lotteryType + '-' + item.playType + ' 期数：' + item.period + ' ' + '<span class="bet-num">' + item.betNum + '</span>注 ' + item.betNum * 2 * item.mul + '元 <span class="mul">' + item.mul + '</span>倍';
                car_html += '</div>';
                car_html += '</div>';
                car_html += '<div class="col-10">';
                car_html += '<span class="icon-trash" onclick="removeCarList(this,' + item.id + ');"></span>';
                car_html += '</div>';
                car_html += '</div>';
                car_html += '</div>';
                car_html += '</div>';
                car_html += '</div>';
                console.log(item);

                $("#car-list").prepend(car_html);
            });
            countCarFee();
        }
    });

    $(document).on('click', '#clearFee', function () {

        if (!sessionStorage.order) {
            $.toast('请先将彩票添加进购物车');
            return;
        } else {
            if (JSON.parse(sessionStorage.order).length === 0) {
                $.toast('请先将彩票添加进购物车');
                return;
            }
        }

        $.ajax({
            async: false,
            url: '/index.php/mobile/account/check',
            success: function (result) {
                if (result !== 'true') {
                    $.popup('.car-popup-login');
                    // return;
                } else {

                    sessionStorage.buyOrder = sessionStorage.order;
                    $.router.load('/index.php/mobile/bill/index', true);
                }
            }
        });


    });
    $(document).on('click', '#car-login-btn', function () {
        var phone = $.trim($("#car-login-phone").val());
        var password = $.trim($("#car-login-password").val());
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
                    $.closeModal();
                } else {
                    $.toast(result.message);
                }
            },
            error: function () {
                $.toast('异步请求失败');
            }

        });
    });
    $(document).on('click', '.my-back', function () {
        $.router.back();
    });


});
