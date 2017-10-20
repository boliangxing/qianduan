// 因为页面有点杂，想不到好的命名方式，故 page以及page块元素 用one two three four前缀表示
function delSiteConfirm(id, _this) {
    $.confirm('你确定删除此地址吗？', function () {
        $.showPreloader();
        $.ajax({
            url: '/index.php/mobile/bill/delSite/id/' + id,
            success: function (result) {
                $.hidePreloader();
                if (result.code === 200) {
                    $(_this).parents(".card").remove();
                    $.toast(result.message);
                } else {
                    $.toast(result.message);
                }
            },
            error: function () {
                $.hidePreloader();
                $.toast('异步请求失败');
            }
        });
    });
}

///one 页面 事件 开始
$(function () {

    //页面初始化传递数值
    $(document).on('pageInit', function (e, id, page) {

        if (id == "one-page") {
            var tempFee = 0;
            var buyOrder = JSON.parse(sessionStorage.getItem('buyOrder'));
            if (!buyOrder) {
                return;
            }
            var totalFee = 0;

            $.each(buyOrder, function (index, item) {
                totalFee += item.mul * item.betNum * 2;
            });

            $("#bill-total-fee").text(totalFee);
        }
    });

    //是否送到家
    $(document).on('click', '#one-send-home', function () {
        if ($(this).prev().prop('checked')) {
            $("#one-receive-site").hide();
        } else {
            $("#one-receive-site").show();
        }
    });

//点击收货地址
    $(document).on('click', '#one-receive-site', function () {
        $.router.load("#two-page");
    });

///one 页面 事件结束

// two页面dom事件 开始

//新增地址
    $(document).on('click', '#two-add-site', function () {
        $.router.load("#three-page");
    });

//ajax // 更新默认地址

    $(document).on('click', '#two-card-list .col-90', function () {
        // $.showPreloader();
        var _this = $(this);
        console.log('two-card-list');
        $.ajax({
            url: '/index.php/mobile/bill/changeSite/id/' + _this.find(".id").val(),
            success: function (result) {

                // $.hidePreloader();
                if (result.code === 200) {
                    console.log('ok');
                    $("#one-receive").html(_this.html());
                    $.router.back();
                } else {
                    $.toast(result.message);
                }

            },
            error: function () {
                // $.hidePreloader();
                $.toast('异步请求失败');
            }
        });
    });

// two页面dom事件 结束

//three事件开始
    $(document).on('click', '#three-receive-site', function () {
        $.router.load('#four-page');
    });

// 新增地址提交
    $(document).on('click', '#three-sub', function () {
        var threeName = $("#three-name").val().trim();
        var threeTel = $("#three-tel").val().trim();
        var threeReceiveSite = $("#three-receive-site").val().trim();
        var threeDetailSite = $("#three-detail-site").val().trim();
        var threeXY = $("#three-xy").val();
        var sex = $("#three-sex").val();
        if (threeName.length === 0) {
            $.toast('姓名不能为空');
            return;
        }
        if (threeTel.length !== 11) {
            $.toast('手机号格式不正确');
            return;
        }
        if (threeReceiveSite.length === 0) {
            $.toast('收货地址不能为空');
            return;
        }
        if (threeDetailSite.length === 0) {
            $.toast('详细地址不能为空');
            return;
        }
        // if (!threeXY) {
        //     $.toast('请先选择');
        //     return;
        // }

        $.showPreloader();

        $.ajax({
            type: 'POST',
            data: {
                contact_name: threeName,
                contact_phone: threeTel,
                gender: sex,
                site_title: threeReceiveSite,
                site_address: threeDetailSite,
                site_point: threeXY
            },
            url: '/index.php/mobile/bill/saveSite',

            success: function (result) {
                $.hidePreloader();
                // console.log(result);
                if (result.code === 200) {

                    $.toast(result.message);

                    var html = '<div class="card">' +
                        '<div class="card-content">' +
                        '<div class="card-content-inner">' +
                        '<p><span class="bold">' + threeName + '</span>' + gender(sex) + threeTel + '</p>' +
                        '<p>' + threeReceiveSite + '<span class="sm-title">' + threeDetailSite + '</span></p>' +
                        '<input type="hidden" value="' + result.data + '" class="id">' +
                        '</div> </div> </div>';
                    $("#two-card-list").append(html);

                    $.router.back();
                } else {
                    $.toast(result.message);
                }

            }, error: function () {
                $.hidePreloader();
                $.toast('异步请求失败');
            }

        });
    });

// three事件结束

    function searchList() {
        var val = $("#four-search-word").val().trim();

        if (val.length > 1) {
            var options = {
                onSearchComplete: function (results) {
                    var html = '';
                    $("#four-card-list").html('');
                    if (local.getStatus() === BMAP_STATUS_SUCCESS) {

                        // var cityName = '杭州市';
                        var num = results.getCurrentNumPois();

                        for (i = 0; i < num; i++) {

                            // if (results.getPoi(i).city == undefined) {
                            //     console.info("city error");
                            //     return;
                            // }
                            // if (results.getPoi(i).city != $.trim(cityName)) {
                            //     return;
                            // }

                            html += '<div class="card" data-note="' + results.getPoi(i).address + '" data-lng="' + results.getPoi(i).point.lng + '" data-lat="' + results.getPoi(i).point.lat + '" data-title="' + results.getPoi(i).title + '" data-city="' + results.getPoi(i).city + '">' +
                                '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                '<div> <i class="icon-map-marker"></i> ' + results.getPoi(i).title + '<br/><span style="0.5rem;color: silver;">' + results.getPoi(i).address +
                                '</span></div> </div> </div> </div>';
                        }
                        $("#four-card-list").html(html);

                        $(document).on('click', '#four-card-list .card', function () {

                            var Temp_Title = $(this).data('title');
                            var Temp_Note = $(this).data('note');
                            var Temp_XY = $(this).data('lng') + "," + $(this).data('lat');
                            $("#four-card-list").html('');
                            $("#four-search-word").val('');
                            $("#three-receive-site").val(Temp_Title);
                            $("#three-detail-site").val(Temp_Note);
                            $("#three-xy").val(Temp_XY);

                            $.router.back();

                        });
                    }

                    if (html === '') {
                        $("#four-no-result").show().find(".card-content-inner").html('没有检索结果');
                    } else {
                        $("#four-no-result").hide();
                    }
                },
                //设置每页容量
                pageCapacity: 5
            };
            // var local = new BMap.LocalSearch('杭州市', options);

            var local = new BMap.LocalSearch(sessionStorage.getItem('nowCity'), options);
            local.search(val);
        }
    }

    $(document).on('input', '#four-search-word', function () {
        searchList();
    });


    $(document).on('click', '#one-take-order', function () {


        var one_take_pic;
        var one_send_home;

        if ($("#one-take-pic").prev().prop('checked')) {
            one_take_pic = 1; //需要
        } else {
            one_take_pic = 2; //不需要
        }

        if ($("#one-send-home").prev().prop('checked')) {
            one_send_home = 1; //需要
        } else {
            one_send_home = 2; //不需要
        }

        $("#goods_info").val(sessionStorage.buyOrder);
        $("#is_take_pic").val(one_take_pic);
        $("#is_send_home").val(one_send_home);

        $('#now_point').val(sessionStorage.getItem('nowPoint'));

        $("#receive_site").val($("#one-receive").find(".id").val());


        $("#order-form").submit();


        return;


        var one_take_pic;
        var one_send_home;
        if ($("#one-take-pic").prev().prop('checked')) {
            one_take_pic = 1;
        } else {
            one_take_pic = 2;
        }

        if ($("#one-send-home").prev().prop('checked')) {
            one_send_home = 1;
        } else {
            one_send_home = 2;
        }


        $("#goods_info").val(JSON.stringify(goods_info));
        $("#is_take_pic").val(one_take_pic);
        $("#is_send_home").val(one_send_home);
        $("#site_id").val($("#one-receive").find(".id").val());
        $("#order-form").submit();
    });

    //   $("#four-select-city").picker({
    //       toolbarTemplate: '<header class="bar bar-nav">\
    // <button class="button button-link pull-left"></button>\
    // <button class="button button-link pull-right close-picker">确定</button>\
    // <h1 class="title">请选择城市</h1>\
    // </header>',
    //       cols: [
    //           {
    //               textAlign: 'center',
    //               values: ['阜阳市', '杭州市', '南京市']
    //           }
    //       ],
    //       onClose: function () {
    //
    //       }
    //   });
});