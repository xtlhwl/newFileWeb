//下一页按钮  -- TitTab头部切换名  --Box隐藏显示的盒子--BoxNum当前需要显示的盒子

function Wuxdt() {
    var GifKai = false;
    $(window).scroll(function () {
        mTop = $(".WxDongTu").offset().top;
        sTop = $(window).scrollTop();
        if (GifKai == false) {
            if (sTop > mTop - 400) {
                $(".WxDongTu")
                    .find("img")
                    .attr("src", img_url + "WxGif.gif");
                setTimeout(function () {
                    $(".OrdXys_con").css({ display: "block" });
                }, 2200);
                setTimeout("settimer()", 2300);
                GifKai = true;
            }
        }
    });
}
//gif图显示
function settimer() {
    $(".OrdXys_con").css({ transform: "scale(1,1)" });
}

//五行统计条形图
function WXStat(classTu, wxshu) {
    $(classTu).css({ width: $(wxshu).text() });
    if ($(classTu).width() == 0) {
        $(classTu).find("em").css("display", "none");
    } else {
        $(classTu).find("em").css("display", "block");
    }
}

//收藏五角星
function collect(e) {
    var elm = $(e);
    var obj = {
        id: elm.data("val"),
        order_id: $(".Weinamelist").data("val"),
        data: [],
    };
    $(e)
        .parents("li")
        .find(".WeinameLl_Con")
        .each(function () {
            var py = $(this).find("p").text();
            var jtz = $(this).find("span").text();
            var wx = $(this).find("i").text();
            obj.data.push({ py: py, jtz: jtz, wx: wx });
        });
    $.post(collect_url, obj, function (data) {
        if (data.status) {
            if (data.info.state == 1) {
                $(e).find("i").addClass("collectdinw");
                elm.data("val", data.info.id);
            } else {
                $(e).find("i").removeClass("collectdinw");
                elm.data("val", data.info.id);
            }
        } else {
            layer.msg(data.info);
        }
    });
}
//
// $(function(){
// 	$('.mem_elect i').on('click',function(e){
//
// 	})
// })
function mem_elect(e) {
    e.preventDefault();
    $(e).parents(".mem_radio").find("i").removeClass("mem_elect_gou");
    $(e).addClass("mem_elect_gou");
    $("#mem_sex").val($(e).attr("data-value"));
}
//推荐名字js
function Xiala() {
    var slide = function (option) {
        var defaults = {
            container: "",
            next: function () {},
        };
        var start,
            end,
            length,
            isLock = false, //是否锁定整个操作
            isCanDo = false, //是否移动滑块
            isTouchPad = /hp-tablet/gi.test(navigator.appVersion),
            hasTouch = "ontouchstart" in window && !isTouchPad;
        var obj = document.querySelector(option.container);
        var loading = obj.firstElementChild;
        var offset = loading.clientHeight;
        var objparent = obj.parentElement;
        /*操作方法*/
        var fn = {
            //移动容器
            translate: function (diff) {
                obj.style.webkitTransform = "translate3d(0," + diff + "px,0)";
                obj.style.transform = "translate3d(0," + diff + "px,0)";

                if (diff > 20) {
                    $(".WeiList_jiaz").show();
                }
                if (diff > 40) {
                    $(".WeiList_jiaz").addClass("transform");

                    var tim = setTimeout(function () {
                        $(".WeiList_jiaz")
                            .find("img")
                            .attr("src", img_url + "Weijiazai.gif");
                    }, 500);
                }
                if (diff > 60) {
                    $(".NoBox").show();
                    $("body").css({ overflow: "hidden", height: "100vh" });
                }
                if (diff < 15) {
                    $(".WeiList_jiaz")
                        .hide()
                        .removeClass("transform")
                        .find("img")
                        .attr("src", img_url + "Weijiantou.png");
                    clearInterval(tim);
                }
            },
            //设置效果时间
            setTransition: function (time) {
                obj.style.webkitTransition = "all " + time + "s";
                obj.style.transition = "all " + time + "s";
            },
            //返回到初始位置
            back: function () {
                fn.translate(0 - offset);
                //标识操作完成
                isLock = false;
            },
            addEvent: function (element, event_name, event_fn) {
                if (element.addEventListener) {
                    element.addEventListener(event_name, event_fn, false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + event_name, event_fn);
                } else {
                    element["on" + event_name] = event_fn;
                }
            },
        };

        fn.translate(0 - offset);
        fn.addEvent(obj, "touchstart", start);
        fn.addEvent(obj, "touchmove", move);
        fn.addEvent(obj, "touchend", end);
        fn.addEvent(obj, "mousedown", start);
        fn.addEvent(obj, "mousemove", move);
        fn.addEvent(obj, "mouseup", end);

        //滑动开始
        function start(e) {
            if (objparent.scrollTop <= 0 && !isLock) {
                var even = typeof event == "undefined" ? e : event;
                //标识操作进行中
                isLock = true;
                isCanDo = true;
                //保存当前鼠标Y坐标
                start = hasTouch ? even.touches[0].pageY : even.pageY;
                //消除滑块动画时间
                fn.setTransition(0);
                //	            loading.innerHTML='下拉刷新数据';
            }
            return false;
        }

        //滑动中
        function move(e) {
            if (objparent.scrollTop <= 0 && isCanDo) {
                var even = typeof event == "undefined" ? e : event;
                //保存当前鼠标Y坐标
                end = hasTouch ? even.touches[0].pageY : even.pageY;
                if (start < end) {
                    even.preventDefault();
                    //消除滑块动画时间
                    fn.setTransition(0);
                    //移动滑块
                    if ((end - start - offset) / 2 <= 150) {
                        length = (end - start - offset) / 2;
                        fn.translate(length);
                    } else {
                        length += 0.3;
                        fn.translate(length);
                    }
                }
            }
        }
        //滑动结束
        function end(e) {
            if (isCanDo) {
                isCanDo = false;
                //判断滑动距离是否大于等于指定值
                if (end - start >= offset) {
                    //设置滑块回弹时间
                    fn.setTransition(1);
                    //保留提示部分
                    fn.translate(0);
                    //执行回调函数
                    //	                loading.innerHTML='正在刷新数据';
                    if (typeof option.next == "function") {
                        option.next.call(fn, e);
                    }
                } else {
                    //返回初始状态
                    fn.back();
                }
            }
        }
    };
    slide({
        container: ".WeiList",
        next: function (e) {
            //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
            var that = this;
            setTimeout(function () {
                that.back.call();
            }, 2000);
        },
    });
}

// $('.NoBox_bjNo').on('click',function(){
// 	$('.NoBox').hide();
// 	$('body').css({'overflow':'auto','height':'100%'})
// })
function NoBox_bjNo() {
    $(".NoBox").hide();
    $("body").css({ overflow: "auto", height: "100%" });
}
//大师起名底部按钮
function Bottombut() {
    var formTop = $(".dsInfo").eq(0);
    var ft = formTop.offset().top;
    formTop.css({ position: "relative" });
    var hrefs =
        '<div style="width: 100%; height: 1px; overflow: hidden;position: absolute; left: 0; top: -0.75rem;" id="ceForm"></div>';
    formTop.prepend(hrefs);
    var hTop = $("#ceForm").offset().top;
    var fiex =
        '<a style=" width: 100%; position: fixed; left: 0; right: 0; bottom: 0; z-index: 99; background-color:rgba(0,0,0,0.3); font-size:0.36rem;color:#fff;text-align:center;letter-spacing: 0.02rem;line-height:1.1rem;height:1.1rem; display:none;" class="fix">' +
        '<span style="width:85%;height:80%;background:#9b0300;display:block;margin:0.12rem auto 0;border-radius:5px;line-height:0.9rem;">立即测算</span>' +
        "</a>";
    var fixDiv = '<div style="width:100%; height:0rem;" class="fixDiv"></div>';
    $("body").append(fiex).append(fixDiv);
    $(window).scroll(function () {
        var docTop = $(this).scrollTop() - 20;
        if (docTop >= hTop) {
            $(".fixDiv").show();
            $(".fix").show();
        } else {
            $(".fixDiv").hide();
            $(".fix").hide();
        }
    });
    $(".fix").click(function () {
        var t = $("#ceForm").offset().top;
        //console.log(t)
        $(window).scrollTop(t);
        $(".fixDiv").hide();
        $(".fix").hide();
    });
}

//weiNamexuanz 选择
function Afresh(clas, col, cont) {
    $("." + clas).on("click", function () {
        $("." + clas).removeClass(col);
        $(this).addClass(col);
        $("#" + cont).val($("." + col).attr("data-value"));
        Afresh_but();
    });
}

// $('.dsSet_liradio').on('click',function(){
// 	$('.dsSet_liradio').find('i').removeClass('mem_elect_gou');
// 	$(this).find('i').addClass('mem_elect_gou');
// 	$('#taocan').val($('.mem_elect_gou').attr('data-value'));
// })
// $('.urgency i').on('click',function(e){
// 	e.preventDefault();
// 	$('#jiaji').val('');
// 	if($('.urgency i').attr('class') == 'mem_elect_gou'){
// 		$(this).removeClass('mem_elect_gou');
// 		$('.prompting').html('*宝宝的名字只需等待<span>３个工作日</span>即可取好哦！');
// 		$('#jiaji').val(0);
// 		return false;
// 	}else{
// 		$(this).addClass('mem_elect_gou');
// 		$('.prompting').html('*宝宝的名字将会在<span>24小时内</span>取好哦！太棒了~');
//         $('#jiaji').val(1);
// 		return false;
// 	}
//
// })
function dsSet_liradio() {
    $(".dsSet_liradio").find("i").removeClass("mem_elect_gou");
    $(this).find("i").addClass("mem_elect_gou");
    $("#taocan").val($(".mem_elect_gou").attr("data-value"));
}
function urgency(e) {
    e.preventDefault();
    $("#jiaji").val("");
    if ($(e).attr("class") == "mem_elect_gou") {
        $(e).removeClass("mem_elect_gou");
        $(".prompting").html(
            "*宝宝的名字只需等待<span>３个工作日</span>即可取好哦！"
        );
        $("#jiaji").val(0);
        return false;
    } else {
        $(e).addClass("mem_elect_gou");
        $(".prompting").html(
            "*宝宝的名字将会在<span>24小时内</span>取好哦！太棒了~"
        );
        $("#jiaji").val(1);
        return false;
    }
}
//套餐分组，套餐滑动
function taocanblock() {
    function setheight() {
        var div = document.getElementById("boxgung");
        //div.style.width="40%";
        div.style.height = 400;
        div.style.overflow = "auto";
    }
    window.onload = setheight;

    var Taocancon_a =
        '<div class="taocancon_box_no"></div><img src="' +
        img_url +
        'taocanCon_ban.png"/><h2 class="taocancon_h2">初级套餐</h2><p class="taocancon_p">名字注重时尚现代，追求个性 (时尚+吉祥)</p>' +
        '<dl class="taocancon_dl"><dt>套餐细则一</dt><dd>由孙弘均老师弟子起名。</dd><dt>套餐细则二</dt><dd>首次提供<i class="OrdName_Color">5</i>个吉祥美名方案，同时推荐一个最佳名字，重名率低于十万分之一。不满意可以免费重新再起或者升级更高套餐，直到满意为止。1天内完成.</dd><dt>超值赠品</dt><dd>名字寓意+八字排盘+乳名或小名3个+小儿关煞破解+1500字《起名说明书》</dd></dl><p class="taocancon_p OrdName_Color" style="text-align:left;text-indent:2em;">初级套餐原价10000元，超值特价299元。直接在线下单赠送价值1000元的宝妈商学院VIP一年。</p>';

    var Taocancon_b =
        '<div class="taocancon_box_no"></div><img src="' +
        img_url +
        'taocanCon_ban.png"/><h2 class="taocancon_h2">高级套餐</h2><p class="taocancon_p">名字注重吉祥大气，幸福平安 (时尚+吉祥+财富三合一套餐)</p>' +
        '<dl class="taocancon_dl"><dt>套餐细则一</dt><dd>由孙弘均老师儿子孙超宇先生起名。</dd><dt>套餐细则二</dt><dd>首次提供<i class="OrdName_Color">8</i>个吉祥美名方案，同时推荐一个最佳名字，重名率低于五十万分之一。不满意可以免费重新再起或者升级更高套餐，直到满意为止！1到2天内容完成。</dd><dt>超值赠品</dt><dd>名字寓意+八字排盘+生肖禁忌排查+小儿关煞破解+适合行业+最佳旅行地+乳名或小名5个+英文名3个+2000字《起名说明书》+赠价值198千足金转运珠！</dd></dl><p class="taocancon_p OrdName_Color" style="text-align:left;text-indent:2em;">高级套餐原价20000元，超值特价599元。直接在线下单赠送价值3000元的宝妈商学院VIP三年。</p>';

    var Taocancon_c =
        '<div class="taocancon_box_no"></div><img src="' +
        img_url +
        'taocanCon_ban.png"/><h2 class="taocancon_h2">顶级套餐</h2><p class="taocancon_p">名字注重财运亨通，才华横溢 (时尚+吉祥+财富+智慧四合一套餐)</p>' +
        '<dl class="taocancon_dl"><dt>套餐细则一</dt><dd>由孙弘均老师本人起名，每天只有<i class="OrdName_Color">3</i>个名额</dd><dt>套餐细则二</dt><dd>首次提供<i class="OrdName_Color">10</i>个吉祥美名方案，同时推荐一个最佳名字，重名率低于五十万分之一。不满意可以免费重新再起或者升级更高套餐，直到满意为止！1到3天内完成。</dd><dt>超值赠品</dt><dd>名字寓意+八字排盘+生肖禁忌排查+小儿关煞破解+适合行业+最佳旅行地+小名8个+英文名5个+3000字《起名说明书》+起名手写稿+起名升文服务+赠价值1000元黄金项链！</dd></dl><p class="taocancon_p OrdName_Color" style="text-align:left;text-indent:2em;">顶级套餐原价30000元，超值特价999元。直接在线下单赠送价值6000元的宝妈商学院VIP六年</p>';
    var taocwei =
        '<div class="taocancon_box_no"></div><img src="' +
        img_url +
        'taocanCon_ban.png"/><p style="font-size:0.4rem;padding:0 0.35rem;margin-top:0.4rem;text-align: center;">预约老师起名请加微信:</p><p style="font-size:0.5rem;padding:0 0.35rem;margin-top:0.2rem;text-align:center;color:#c33936;">' +
        wx_no +
        '<span style="font-size: 0.4rem;color:black;">(长按复制)</span></p><img src="' +
        wxewm +
        '" style="width:2.5rem;height:2.5rem;" />';

    $(".dsSetlic_block").on("click", function () {
        //  	$('#boxgung').html('');
        $(".taocancon").show();
        $("#boxgung").html(taocwei);
        //  	if($(this).attr('data-tao') == '1'){
        //  		$('#boxgung').html(Taocancon_a);
        //  	}else if($(this).attr('data-tao') == '2'){
        //  		$('#boxgung').html(Taocancon_b);
        //  	}else{
        //  		$('#boxgung').html(Taocancon_c);
        //  	}
        $(".taocancon_box_no").on("click", function () {
            $(".taocancon").hide();
        });
    });
}
function xiapage(num) {
    $(".Neworder_tit li").removeClass("Neworder_tit_bj");
    $(".Neworder_tit li:eq(" + num + ")").addClass("Neworder_tit_bj");
    $(".change_nav").hide();
    scrollTo(0, 0);
    $(".weiNamexuanz").hide();
    $(".change_nav").each(function () {
        if ($(this).data("box") == num) {
            $(this).show();
        }
        if (num == 1) {
            $(".weiNamexuanz").show();
        }
        if (num == 0) {
            Wuxdt();
        }
    });
}
