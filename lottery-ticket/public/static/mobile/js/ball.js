/**
 * Created by zy2014 on 2017/8/17.
 */
//创建号码
function createNo(total, createType) {
    var html = '';
    if (createType === '球') {
        for (var i = 1; i <= total; i++) {
            if ((i - 1) % 7 === 0) {
                html += '<tr>';
            }
            if (i < 10) {
                html += '<td><a class="my-button my-button-circle my-button-raised my-button-small select">0' + i + '</a></td>';
            } else {
                html += '<td><a class="my-button my-button-circle my-button-raised my-button-small">' + i + '</a></td>';
            }


            if ((i % 7 === 0 && i !== 0) || i === total) {
                html += '</tr>';
            }
        }
    } else if (createType === '位') {

        for (var j = 0; j <= total; j++) {

            if (j % 5 === 0) {
                html += '<tr>';
            }

            html += '<td><a class="my-button my-button-circle my-button-raised my-button-small">' + j + '</a></td>';

            if (( (j + 1) % 5 === 0 && j !== 0) || j === total) {
                html += '</tr>';
            }
        }
    }

    return html;
}
//创建号码区域
function createNoArea(data) {
    var html = '';
    $.each(data, function (index, item) {
        html += '<div class="card">';
        html += '<div class="card-header"><span class="' + item.color + '">' + index + '</span><span class="hint-font">(' + item.format.replace("%s", item.selectRule.join("-")) + ')</span></div>';
        html += '<div class="card-content">';
        html += '<div class="card-content-inner">';
        html += '<table class="ball-table" data-color="' + item.color + '" data-select-rule="' + item.selectRule + '" data-total="' + item.total + '" data-type="' + index + '">';
        html += createNo(item.total, item.createType);
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });

    $("#noArea").html(html);
}

/**
 * 组合算法
 * @param n 元素的总个数
 * @param m 参与选择的元素个数
 * @returns {number}
 */
function combination(n, m) {
    if (n < m) {
        return 0;
    }
    var nCount = 1;
    var mCount = 1;
    var diffCount = 1;
    for (var i = n; i > 1; i--) {
        nCount *= i;
    }
    for (var k = m; k > 1; k--) {
        mCount *= k;
    }
    for (var j = (n - m); j > 1; j--) {
        diffCount *= j;
    }
    return nCount / (mCount * diffCount);
}


/**
 * 随机根据指定数字范围随机生成指定长度的数字
 * @param start 数字范围开始
 * @param end   数字范围结束
 * @param len   指定数字长度
 * @returns {*}
 */
function randCode(start, end, len) {
    if (start > end) {
        return null;
    }
    var code = [];
    var tempCode = [];
    for (var i = start; i <= end; i++) {
        tempCode.push(i);
    }
    if (tempCode.length < len) {
        return null;
    }
    for (var k = 1; k <= len; k++) {
        var count = tempCode.length;
        var randNo = _.random(1, count);
        code.push(tempCode[randNo - 1]);
        _.pull(tempCode, tempCode[randNo - 1]);
    }
    return code.sort(function (a, b) {
        return a - b;
    });
}

//计算总注数
function countBetNum() {

    var num;
    var playType = $("#play-type").val();
    var lotteryType = $("#lottery-type").val();
    var totalBet;
    if (playType === '胆拖') {

        var oddsObj = {};

        $(".ball-table").each(function () {

            var type = $(this).data('type');
            var color = $(this).attr('data-color');

            if (color === 'blue') {
                num = $(this).find(".my-button-primary").length;
            } else {
                num = $(this).find(".my-button-caution").length;
            }


            oddsObj[type] = num;
        });
        if (lotteryType === '双色球') {
            totalBet = combination(oddsObj['红球拖码'], 6 - oddsObj['红球胆码']) * oddsObj['蓝球'];
        } else if (lotteryType === '七乐彩') {
            totalBet = combination(oddsObj['红球拖码'], 7 - oddsObj['红球胆码']);
        } else if (lotteryType === '大乐透') {
            totalBet = combination(oddsObj['红球拖码'], 5 - oddsObj['红球胆码']) * combination(oddsObj['蓝球拖码'], 2 - oddsObj['蓝球胆码']);
        }

    }
    else if (playType === '组三') {
        //只有一层循环
        $(".ball-table").each(function () {


            var color = $(this).attr('data-color');

            if (color === 'blue') {
                num = $(this).find(".my-button-primary").length;
            } else {
                num = $(this).find(".my-button-caution").length;
            }

            totalBet = num * (num - 1);
        });


    } else {

        var odds = [];

        $(".ball-table").each(function () {

            var selectRule = $(this).attr('data-select-rule');

            var color = $(this).attr('data-color');

            if (color === 'blue') {
                num = $(this).find(".my-button-primary").length;
            } else {
                num = $(this).find(".my-button-caution").length;
            }

            odds.push(combination(num, String(selectRule).split(",")[0]));

        });

        totalBet = _.reduce(odds, function (total, n) {
            return total * n;
        });
        console.log(totalBet);
    }


    $('#ball-bet-num').text(totalBet);
}
//清楚选球
function clearBall() {
    $(".ball-table").find("a").removeClass('my-button-caution').removeClass('my-button-primary');
    $("#ball-bet-num").text(0);
}

//删除投注栏卡片列表
function removeCardList(_this) {

    $(_this).parents(".card").remove();
    countTotal();
}

//计算投注栏个数并赋值
function countBetColNum() {
    var cardNum = $('#bet-col-page .card').length;
    $('#bet-col-num').text(cardNum);
}

//计算投注单 总注数及总金额
function countTotal() {

    var totalFee = 0;
    var totalBetNum = 0;
    $("#no-card-list .card").each(function () {
        var betNum = $(this).find(".bet-num").text();
        var fee = $(this).find(".fee").text();
        totalFee += Number(fee);
        totalBetNum += Number(betNum);
    });
    var mul = $("#mul").val();
    totalFee = mul * totalFee;
    $("#total-bet").text(totalBetNum);
    $("#total-fee").text(totalFee);
}

/**
 * 生成投注栏卡片列表
 * @param lotteryNoInfo
 */
function makeNoCard(lotteryNoInfo) {
    var cardHtml = '<div class="card" data-lottery-info=\'' + JSON.stringify(lotteryNoInfo) + '\'>';
    cardHtml += '<div class="card-content">';
    cardHtml += '<div class="card-content-inner">';
    cardHtml += '<div class="row">';
    cardHtml += '<div class="col-90" style="word-wrap:break-word">';

    $.each(lotteryNoInfo.groups, function (index, item) {
        $.each(item.type, function (index2, item2) {

            if (index2 === 0) {
                cardHtml += '<span class="' + item.color + '">';
            }

            if ((index2 + 1) === item.type.length) {

                cardHtml += item2.element + '</span>';

                if (index + 1 !== lotteryNoInfo.groups.length) {
                    cardHtml += ' | ';
                }


            } else {
                cardHtml += item2.element + ' ';
            }

        });
    });

    cardHtml += '<div class="hint-font">';
    cardHtml += '<span class="lottery-play">' + lotteryNoInfo.playType + '</span> <span class="bet-num">' + lotteryNoInfo.betNum + '</span>注 <span class="fee">' + lotteryNoInfo.betNum * 2 + '</span>元';
    cardHtml += '</div>';
    cardHtml += '</div>';
    cardHtml += '<div class="col-10">';
    cardHtml += '<span class="icon-trash" onclick="removeCardList(this);"></span> ';
    cardHtml += '</div>';
    cardHtml += '</div>';
    cardHtml += '</div>';
    cardHtml += '</div>';
    cardHtml += '</div>';

    //增加投注栏的 列表
    $('#no-card-list').prepend(cardHtml);
}

function machineRandOne() {

    clearBall();

    $(".ball-table").each(function () {
        var _this = $(this);
        var selectRule = _this.data('selectRule');
        var color = _this.data('color');
        var total = _this.data('total');
        var randCodeArray = randCode(1, total, String(selectRule).split(",")[0]);
        $.each(randCodeArray, function (index, item) {
            if (color === 'blue') {
                _this.find("a").eq(item - 1).addClass('my-button-primary');
            } else {
                _this.find("a").eq(item - 1).addClass('my-button-caution');
            }

        });

    });

    countBetNum();
}

function bet() {

    if ($("#ball-bet-num").text() < 1) {
        $.toast('请按规则选号');
        return;
    }

    var codeObj;
    var lotteryNoInfo = {
        groups: [],
        betNum: 0,
        playType: '',
        lotteryType: ''

    };

    $(".ball-table").each(function () {
        if ($(this).data('color') === 'blue') {
            codeObj = $(this).find(".my-button-primary");
        } else {
            codeObj = $(this).find(".my-button-caution");
        }

        var code = [];
        $.each(codeObj, function () {
            code.push({element: $(this).text()})
        });

        lotteryNoInfo.groups.push({type: code, color: $(this).data('color')});
        lotteryNoInfo.betNum = $("#ball-bet-num").text();
        lotteryNoInfo.playType = $("#play-type").val();
        lotteryNoInfo.lotteryType = $("#lottery-type").val();
    });
    clearBall();
    makeNoCard(lotteryNoInfo);
    countBetColNum();
    countTotal();
}

$(function () {
    var lotteryType = $("#lottery-type").val();
    var playType = $("#play-type").val();
    $("#chose-lottery-type").text(lotteryType);
    $("#chose-play-type").text(playType);

    createNoArea(lotteryRule[lotteryType][playType]);

//手选球
    $(document).on('click', '.ball-table td a', function () {
        var lotteryType = $("#lottery-type").val();
        var playType = $("#play-type").val();
        var type = $(this).parents(".ball-table").data('type');
        var temp;


        if (playType === '胆拖') {


            if (type === '红球胆码') {

                temp = [];
                $(".ball-table[data-type='红球拖码']").find(".my-button-caution").each(function () {
                    temp.push($(this).text());
                });

                if ($.inArray($(this).text(), temp) !== -1) {
                    $.toast("胆码和拖码不能重复请重新选择");
                    return;
                }
                $(this).toggleClass('my-button-caution');


                if (lotteryType === '七乐彩') {
                    if ($(".ball-table[data-type='红球胆码']").find(".my-button-caution").length > 6) {
                        $(this).toggleClass('my-button-caution');
                        $.toast("胆码不能超过六个");
                        return;
                    }
                } else if (lotteryType === '双色球') {
                    if ($(".ball-table[data-type='红球胆码']").find(".my-button-caution").length > 5) {
                        $(this).toggleClass('my-button-caution');
                        $.toast("胆码不能超过五个");
                        return;
                    }
                } else if (lotteryType === '大乐透') {
                    if ($(".ball-table[data-type='红球胆码']").find(".my-button-caution").length > 4) {
                        $(this).toggleClass('my-button-caution');
                        $.toast("胆码不能超过四个");
                        return;
                    }
                }

                countBetNum();

            } else if (type === '红球拖码') {
                temp = [];
                $(".ball-table[data-type='红球胆码']").find(".my-button-caution").each(function () {
                    temp.push($(this).text());
                });

                if ($.inArray($(this).text(), temp) !== -1) {
                    $.toast("胆码和拖码不能重复请重新选择");
                    return;
                }

                $(this).toggleClass('my-button-caution');
                countBetNum();
            }

            else if (type === '蓝球胆码') {

                temp = [];
                $(".ball-table[data-type='蓝球拖码']").find(".my-button-primary").each(function () {
                    temp.push($(this).text());
                });

                if ($.inArray($(this).text(), temp) !== -1) {
                    $.toast("胆码和拖码不能重复请重新选择");
                    return;
                }
                $(this).toggleClass('my-button-primary');


                if (lotteryType === '大乐透') {
                    if ($(".ball-table[data-type='蓝球胆码']").find(".my-button-primary").length > 1) {
                        $(this).toggleClass('my-button-primary');
                        $.toast("胆码不能超过一个");
                        return;
                    }
                }
                countBetNum()

            } else if (type === '蓝球拖码') {

                temp = [];
                $(".ball-table[data-type='蓝球胆码']").find(".my-button-primary").each(function () {
                    temp.push($(this).text());
                });

                if ($.inArray($(this).text(), temp) !== -1) {
                    $.toast("胆码和拖码不能重复请重新选择");
                    return;
                }

                $(this).toggleClass('my-button-primary');
                countBetNum();

            } else { //普通蓝球
                $(this).toggleClass('my-button-primary');
                countBetNum();
            }
        } else { //非胆拖
            if ($(this).parents(".ball-table").attr('data-color') === 'blue') {
                $(this).toggleClass('my-button-primary');
                countBetNum();
            } else {

                $(this).toggleClass('my-button-caution');
                countBetNum();
            }
        }

    });
//清楚选球
    $(document).on('click', '#usual-remove-one', function () {
        clearBall();
    });
//机选一注
    $(document).on('click', '#ball-machine-one', function () {
        machineRandOne();
    });

//选择操作
    $(document).on('click', '#chose-type', function () {
        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];
        var lotteryType = $("#lottery-type").val();
        $.each(lotteryRule[lotteryType], function (index) {
            var temp = {
                text: index,
                bold: true,
                onClick: function () {

                    $("#chose-play-type").text(index);
                    $("#play-type").val(index);

                    createNoArea(lotteryRule[lotteryType][index]);

                    if (index === '胆拖') {

                        switch (lotteryType) {
                            case '双色球':
                                $("#prompt").text('胆码+拖码至少6个').show();
                                break;
                            case '七乐彩':
                                $("#prompt").text('胆码+拖码至少8个').show();
                                break;
                            case '大乐透':
                                $("#prompt").html('<div style="position: absolute;top: -0.4rem">红球胆码+红球拖码至少5个</div><div style="position: absolute;top: 0.5rem">蓝球胆码+蓝球拖码至少2个</div>').show();
                                break;
                        }


                        $("#ball-machine-one").hide();
                    } else {
                        $("#prompt").hide();
                        $("#ball-machine-one").css('display', '');
                    }
                    $("#ball-bet-num").text(0);
                }

            };
            buttons1.push(temp);
        });


        var buttons2 = [
            {
                text: '取消',
                bg: 'danger'
            }
        ];
        var groups = [buttons1, buttons2];
        $.actions(groups);
    });

    $(document).on('click', '#bet', function () {
        bet();
    });


//增加倍数
    $(document).on('click', '#add-mul', function () {
        var mul = $("#mul");
        if (!Number(mul.val())) {
            return;
        }
        if (Number(mul.val()) >= 99) {
            return;
        }
        mul.val(Number(mul.val()) + 1);
        countTotal();

    });
//减少倍数
    $(document).on('click', '#less-mul', function () {
        var mul = $("#mul");
        if (!Number(mul.val())) {
            return;
        }
        if (Number(mul.val()) <= 1) {
            return;
        }
        mul.val(Number(mul.val()) - 1);
        countTotal();
    });
//倍数keyup
    $(document).on('keyup', '#mul', function () {

        var mul = $("#mul");
        mul.val(mul.val().replace(/[^0-9]/, ''));
        if ($.trim(mul.val()) === '') {
            return;
        }
        if (Number(mul.val()) > 99 || Number(mul.val()) < 1) {
            mul.val(1);
        }
        countTotal();
    });
//倍数blur
    $(document).on('blur', '#mul', function () {
        var reg = /^[1-9]{1}[0-9]?$/;
        if (!reg.test($("#mul").val())) {
            $("#mul").val(1);
        }
        countTotal();
    });

    $(document).on('click', '#bet-col', function () {
        if ($("#play-type").val() === '胆拖') {
            $("#bet-col-machine-one").hide();
            $("#bet-col-machine-five").hide();
        } else {
            $("#bet-col-machine-one").css('display', '');
            $("#bet-col-machine-five").css('display', '');
        }
        $.router.load('#bet-col-page');
    });

//投注栏机选一注
    $(document).on('click', '#bet-col-machine-one', function () {
        var lotteryType = $("#lottery-type").val();
        if (lotteryType === '胆拖') {

        } else {
            machineRandOne();
            bet();
        }

    });

//投注栏机选五注
    $(document).on('click', '#bet-col-machine-five', function () {

        for (var i = 0; i < 5; i++) {
            machineRandOne();
            bet();
        }
    });
//清空所有
    $(document).on('click', '#remove-all', function () {
        $('#no-card-list').html('');
        countBetColNum();
        countTotal();
    });
//加入购物车
    $(document).on('click', '#bet-col-car', function () {
        var order;

        var noCardList = $("#no-card-list .card");
        if (noCardList.length < 1) {
            $.toast('所选商品不能为空');
        }
        noCardList.each(function () {

            var lotteryInfo = JSON.parse($(this).data('lotteryInfo'));
            lotteryInfo.mul = $("#mul").val();
            lotteryInfo.period = $("#period").text();

            order = sessionStorage.getItem('order');


            if (!order) {
                sessionStorage.orderID = 1;
            } else {
                var orderID = sessionStorage.orderID;
                orderID = Number(orderID) + 1;
                sessionStorage.orderID = orderID;
            }
            lotteryInfo.id = sessionStorage.orderID;


            if (order) {
                var tempArray = JSON.parse(order);
                tempArray.push(lotteryInfo);


                sessionStorage.order = JSON.stringify(tempArray);//2
            } else {
                var empty = [];
                empty.push(lotteryInfo);
                sessionStorage.order = JSON.stringify(empty);
            }
        });

        $('#no-card-list').html('');
        countBetColNum();
        countTotal();

    });

//购买
    $(document).on('click', '#bet-col-buy', function () {
        var noCardList = $("#no-card-list .card");
        if (noCardList.length == 0) {
            $.toast('请先选择');
            return;
        }

        $.ajax({
            async: false,
            url: '/index.php/mobile/account/check',
            success: function (result) {
                if (result !== 'true') {
                    $.popup('.popup-login');
                    // return;
                } else {


                    //初始化
//                        goods_info = [];
                    var temp = [];
                    noCardList.each(function () {
                        var lotteryInfo = JSON.parse($(this).data('lotteryInfo'));
                        lotteryInfo.mul = $("#mul").val();
                        lotteryInfo.period = $("#period").text();
                        temp.push(lotteryInfo);
//                            var tempInfo = {
//                                lottery_type: '双色球',
//                                no: $(this).find(".red").text() + '+' + $(this).find(".blue").text(),
//                                type: $(this).find(".lottery-play").text(),
//                                betNum: $(this).find(".bet-num").text(),
//                                fee: $(this).find(".fee").text(),
//                                mul: $("#mul").val(),
//                                period: $(".period").text()
//                            };
//                            goods_info.push(tempInfo);
                    });
                    sessionStorage.buyOrder = JSON.stringify(temp);
                    $.router.load('/index.php/mobile/bill/index', true);
                }
            }
        });
    });

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
                    // $.toast(result.message);
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
});
