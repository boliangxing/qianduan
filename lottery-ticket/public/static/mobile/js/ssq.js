//公有的方法
var mutual = {
    /**
     * 组合算法
     * @param n 元素的总个数
     * @param m 参与选择的元素个数
     * @returns {number}
     */
    combination: function (n, m) {
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
    },
    /**
     * 将少于两位数的数字补零
     * @param a 数组
     * @returns {*|Array|{get, configurable, enumerable}}
     */
    zeroFill: function (a) {
        return $.map(a, function (n) {
            if (n.toString().length < 2) {
                return '0' + n;
            } else {
                return n;
            }
        });
    },
    /**
     * 随机根据指定数字范围随机生成指定长度的数字
     * @param start 数字范围开始
     * @param end   数字范围结束
     * @param len   指定数字长度
     * @returns {*}
     */
    randCode: function (start, end, len) {
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
    },
    //将一个字符串按 个数 分组
    strGroup: function (str, num) {
        var temp = [];
        for (var i = 0; i < str.length; i = i + num) {
            temp.push(str.substr(i, num));
        }
        return temp;
    }
};
//普通投注
var usual = {
    //清除
    clearBall: function () {
        $('#usual-red-table td a').removeClass('my-button-caution');
        $('#usual-blue-table td a').removeClass('my-button-primary');
        $("#usual-bet-num").text(0);
    },
    //计算投注栏个数并赋值
    countBetColNum: function () {
        var cardNum = $('#bet-col-page .card').length;
        $('#usual-bet-col-num').text(cardNum);
    },
    //计算投注个数并赋值
    countBetNum: function () {
        var redNum = $('#usual-red-table td .my-button-caution').length;
        var blueNum = $('#usual-blue-table td .my-button-primary').length;
        if (redNum < 6 || blueNum < 1) {
            return;
        }
        var odds = mutual.combination(redNum, 6) * mutual.combination(blueNum, 1);
        $('#usual-bet-num').text(odds);
    }

};
// 胆拖(bravery tow) 投注
var bt = {
    //清除
    clearBall: function () {
        $('#bravery-table td a').removeClass('my-button-caution');
        $('#tow-table td a').removeClass('my-button-caution');
        $('#bt-blue-table td a').removeClass('my-button-primary');
        $("#bt-bet-num").text(0);
    },
    /**
     * 胆拖 选球规则
     * @param isToast 时候需要 toast 提醒
     * @returns {boolean}
     */
    NoRule: function (isToast) {

        var braveryNum = $("#bravery-table td .my-button-caution").length;
        var towNum = $("#tow-table td .my-button-caution").length;
        var btBlueNum = $("#bt-blue-table td .my-button-primary").length;

        if (braveryNum < 1) {
            if (isToast) {
                $.toast("红球胆码至少1个");
            }
            return false;
        }

        if (braveryNum > 5) {
            if (isToast) {
                $.toast("红球胆码至多5个");
            }
            return false;
        }
        if (towNum < 2) {
            if (isToast) {
                $.toast("红球拖码至少2个");
            }
            return false;
        }

        if ((braveryNum + towNum) < 6) {
            if (isToast) {
                $.toast("红球胆码+红球拖码至少6个");
            }
            return false;
        }
        if (btBlueNum < 1) {
            if (isToast) {
                $.toast("蓝球至少选择1个");
            }
            return false;
        }
        return true;
    },
    //计算胆拖注数并赋值
    countBetNum: function () {
        var braveryNum = $("#bravery-table td .my-button-caution").length;
        var towNum = $("#tow-table td .my-button-caution").length;
        var btBlueNum = $("#bt-blue-table td .my-button-primary").length;

        if (!bt.NoRule(false)) {
            return;
        }
        var odds = mutual.combination(towNum, (6 - braveryNum)) * mutual.combination(btBlueNum, 1);
        $("#bt-bet-num").text(odds);
    },
    //计算投注栏个数并赋值
    countBetColNum: function () {
        var cardNum = $('#bet-col-page .card').length;
        $('#bt-bet-col-num').text(cardNum);
    }
};
//投注栏
var betCol = {
    //计算投注单 总注数及总金额
    countTotal: function () {
        var totalFee = 0;
        var totalBetNum = 0;
        $("#no-card-list .card").each(function () {
            var betNum = $(this).find(".bet-num").text();
            var fee = $(this).find(".fee").text();
            totalFee += Number(fee);
            totalBetNum += Number(betNum)
        });
        var mul = $("#mul").val();
        totalFee *= mul;
        $("#total-bet").text(totalBetNum);
        $("#total-fee").text(totalFee);
    },
    //删除投注栏卡片列表
    removeCardList: function (_this) {
        $(_this).parents(".card").remove();
        betCol.countTotal();
    },
    /**
     * 生成投注栏卡片列表
     * @param redNo 红球
     * @param blueNo 蓝球
     * @param betNum 注数
     * @param type 类型 单式/复式/胆拖
     */
    makeNoCard: function (redNo, blueNo, betNum, type) {
        var cardHtml = '<div class="card">' +
            '<div class="card-content">' +
            '<div class="card-content-inner">' +
            '<div class="row">' +
            '<div class="col-90" style="word-wrap:break-word">' +
            '<span class="red">' + redNo + '</span>+<span class="blue">' + blueNo + '</span> ' +
            '<div class="hint-font"><span class="lottery-play">' + type + '</span> <span class="bet-num">' + betNum + '</span>注 <span class="fee">' + betNum * 2 + '</span>元</div>' +
            '</div>' +
            '<div class="col-10">' +
            '<span class="icon-trash" onclick="betCol.removeCardList(this);"></span> ' +
            '</div> </div> </div> </div> </div>';

        //增加投注栏的 列表
        $('#no-card-list').prepend(cardHtml);
    },
    //机选
    machineChoice: function (num) {
        for (var i = 0; i < num; i++) {
            var redNo = mutual.randCode(1, 33, 6);
            var blueNo = mutual.randCode(1, 16, 1);
            redNo = mutual.zeroFill(redNo).join('&nbsp;');
            blueNo = mutual.zeroFill(blueNo).join('&nbsp;');
            betCol.makeNoCard(redNo, blueNo, 1, '单式');
        }
    }
};


$(function () {

    //选择玩法标准or 胆拖
    $(document).on('click', '.play-type', function () {
        var _this = $(this);

        var buttons1 = [
            {
                text: '请选择',
                label: true
            },
            {
                text: '普通投注',
                bold: true,
                onClick: function () {
                    if (_this.text().indexOf('普通') === -1) {
                        $.router.load('#common-page');
                    }
                }
            },
            {
                text: '胆拖投注',
                onClick: function () {
                    if (_this.text().indexOf('胆拖') === -1) {
                        $.router.load('#bt-page');
                    }
                }
            }
        ];
        var buttons2 = [
            {
                text: '取消',
                bg: 'danger'
            }
        ];
        var groups = [buttons1, buttons2];
        $.actions(groups);
    });

    //普通投注事件监听开始

    //清除
    $(document).on('click', '#usual-remove-one', function () {
        usual.clearBall();
    });

    //投注
    $(document).on('click', '#usual-bet', function () {
        var redNo = $('#usual-red-table td .my-button-caution');
        var blueNo = $('#usual-blue-table td .my-button-primary');

        if (redNo.length < 6 || blueNo.length < 1) {
            $.toast("请至少选择6个红球和1个蓝球");
            return;
        }
        usual.clearBall();
        //概率即注数
        var odds = mutual.combination(redNo.length, 6) * mutual.combination(blueNo.length, 1);
        var type;
        if (odds > 1) {
            type = '复式';
        } else {
            type = '单式';
        }
        var redNoArr = [];
        var blueNoArr = [];
        $.each(redNo, function () {
            redNoArr.push($(this).text());
        });
        $.each(blueNo, function () {
            blueNoArr.push($(this).text());
        });
        betCol.makeNoCard(redNoArr.join('&nbsp;'), blueNoArr.join('&nbsp;'), odds, type);
        usual.countBetColNum();
        bt.countBetColNum();
        betCol.countTotal();
    });

    //红球手选
    $(document).on('click', '#usual-red-table td a', function () {
        $(this).toggleClass('my-button-caution');
        usual.countBetNum();
    });
    //蓝球手选
    $(document).on('click', '#usual-blue-table td a', function () {
        $(this).toggleClass('my-button-primary');
        usual.countBetNum();
    });
    //机选红蓝 一注
    $(document).on('click', '#usual-machine-one', function () {
        usual.clearBall()
        var randRedBall = mutual.randCode(1, 33, 6);
        $.each(randRedBall, function (index) {
            $("#usual-red-table td a").eq(randRedBall[index] - 1).addClass('my-button-caution');
        });

        var randBlueBall = mutual.randCode(1, 16, 1);
        $.each(randBlueBall, function (index) {
            $("#usual-blue-table td a").eq(randBlueBall[index] - 1).addClass('my-button-primary');
        });
        usual.countBetNum();
    });

    //普通投注事件监听结束


    //胆拖玩法事件监听 开始
    //胆码手选
    $(document).on('click', '#bravery-table td a', function () {

        var braveryNo = $(this).text();
        var temp = [];
        $("#tow-table td .my-button-caution").each(function () {
            temp.push($(this).text());
        });
        if ($.inArray(braveryNo, temp) !== -1) {
            $.toast("胆码和拖码不能重复请重新选择");
            return;
        }
        if ($("#bravery-table td .my-button-caution").length >= 5) {
            $.toast("胆码不能超过五个");
            return;
        }

        $(this).toggleClass('my-button-caution');
        bt.countBetNum();
    });

    //拖码手选
    $(document).on('click', '#tow-table td a', function () {
        var towNo = $(this).text();
        var temp = [];
        $("#bravery-table td .my-button-caution").each(function () {
            temp.push($(this).text());
        });
        if ($.inArray(towNo, temp) !== -1) {
            $.toast("胆码和拖码不能重复请重新选择");
            return;
        }
        $(this).toggleClass('my-button-caution');
        bt.countBetNum();
    });

    //胆拖蓝球手选
    $(document).on('click', '#bt-blue-table tr a', function () {
        $(this).toggleClass('my-button-primary');
        bt.countBetNum();
    });
    $(document).on('click', '#bt-remove-no', function () {
        bt.clearBall();
    });
    //  胆拖投注
    $(document).on('click', '#bt-bet', function () {

        if (!bt.NoRule(true)) {
            return;
        }
        var braveryNo = $("#bravery-table td .my-button-caution");
        var towNo = $("#tow-table td .my-button-caution");
        var btBlueNo = $("#bt-blue-table td .my-button-primary");
        bt.clearBall();
        var braveryNoArr = [];
        var towNoArr = [];
        var btBlueNoArr = [];

        $.each(braveryNo, function () {
            braveryNoArr.push($(this).text());
        });
        $.each(towNo, function () {
            towNoArr.push($(this).text());
        });
        $.each(btBlueNo, function () {
            btBlueNoArr.push($(this).text());
        });

        var odds = mutual.combination(towNo.length, (6 - braveryNo.length)) * mutual.combination(btBlueNo.length, 1);

        betCol.makeNoCard('(' + braveryNoArr.join('&nbsp;') + ')' + towNoArr.join('&nbsp;'), btBlueNoArr.join('&nbsp;'), odds, '胆拖');
        usual.countBetColNum();
        bt.countBetColNum();
        betCol.countTotal();

    });
    //胆拖玩法事件监听 结束


    //投注栏事件监听 开始
    //投注栏机选一注
    $(document).on('click', '#bet-col-machine-one', function () {
        betCol.machineChoice(1);

        usual.countBetColNum();
        bt.countBetColNum();
        betCol.countTotal();
    });

    //投注栏机选五注
    $(document).on('click', '#bet-col-machine-five', function () {
        betCol.machineChoice(5);

        usual.countBetColNum();
        bt.countBetColNum();

        betCol.countTotal();
    });
    //清空所有
    $(document).on('click', '#remove-all', function () {
        $('#no-card-list').html('');
        usual.countBetColNum();
        bt.countBetColNum();
        betCol.countTotal();
    });

    //增加倍数
    $(document).on('click', '#add-mul', function () {
        var mul = $("#mul");
        if (!Number(mul.val())) {
            return;
        }
        if (Number(mul.val()) > 99) {
            return;
        }
        mul.val(Number(mul.val()) + 1);
        betCol.countTotal();

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
        betCol.countTotal();
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
        betCol.countTotal();
    });
    //倍数blur
    $(document).on('blur', '#mul', function () {
        var reg = /^[1-9]{1}[0-9]?$/;
        if (!reg.test($("#mul").val())) {
            $("#mul").val(1);
        }
        betCol.countTotal();
    });

    $("#isSend").click(function () {
        if ($(this).prev().prop('checked')) {
            $("#getPlace").hide();
        } else {
            $("#getPlace").show();
        }
    });
    //购买
    $("#bet-col-buy").click(function () {
        var noCardList = $("#no-card-list .card");
        if (noCardList.length == 0) {
            $.toast('请先选择');
            return;
        }

        var noInfo = [];
        var input_html = '';
        noCardList.each(function () {
            var tempInfo = {
                no: $(this).find(".red").text() + '+' + $(this).find(".blue").text(),
                type: $(this).find(".lottery-play").text(),
                betNum: $(this).find(".bet-num").text(),
                fee: $(this).find(".fee").text(),
                mul: $("#mul").val()
            };
            noInfo.push(tempInfo);
            // input_html += '<input type="hidden" name="goods_info" value="'+JSON.stringify(tempInfo)+'">';


        });
        // console.log(noInfo);

        // var totalInfo = {
        //     mul: $("#mul").val(),
        //     totalBet: $("#total-bet").text(),
        //     totalFee: $("#total-fee").text()
        // };

        $("#goods_info").val(JSON.stringify(noInfo));
        $("#show_total_fee").val($("#total-fee").text());
        $("#goods-form").submit();

        // $.ajax({
        //     type: 'POST',
        //     data: {totalInfo: totalInfo, noInfo: noInfo},
        //     url: '/index.php/mobile/bill/check',
        //     success: function (result) {
        //         console.log(result);
        //         window.location.href= '/index.php/mobile/bill/index';
        //     }, error: function () {
        //         $.toast('异步请求失败');
        //     }
        // });
    });

    // $("#bet-col-back").click(function () {
    //     $.router.load('')
    // });


    //投注栏事件监听结束


    $.init();
});


