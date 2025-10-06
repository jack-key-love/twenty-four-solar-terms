(function($) {
  'use strict';
    /*---------------------------------
        Preloader JS
    -----------------------------------*/
    var prealoaderOption = $(window);
    prealoaderOption.on("load", function () {
        var preloader = jQuery('.spinner');
        var preloaderArea = jQuery('.preloader_area');
        preloader.fadeOut();
        preloaderArea.delay(350).fadeOut('slow');
    });
    /*---------------------------------
        Preloader JS
    -----------------------------------*/

    /*---------------------------------
        sticky header JS
    -----------------------------------*/
    $(window).on('scroll',function() {
        var scroll = $(window).scrollTop();
         if (scroll < 106) {
          $(".header_area").removeClass("sticky");
         }else{
          $(".header_area").addClass("sticky");
         }
    });
    /*---------------------------------
        sticky header JS
    -----------------------------------*/
    /*---------------------------------
        Search JS
    -----------------------------------*/
    // 确保所有页面都有搜索框结构
    if ($(".search_wrapper").length === 0) {
      // 动态创建搜索框结构
      var searchHtml = '<div class="search_wrapper">' +
        '<div class="search_content">' +
        '<a href="#" class="close_link"><i class="fas fa-times"></i></a>' +
        '<form id="search_form" class="search_form">' +
        '<div class="form-group mb-0">' +
        '<input type="text" id="search_input" class="form_control" placeholder="输入节气名称，如：立春" required>' +
        '<button type="submit" class="submit_btn"><i class="fas fa-search"></i></button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>';

      $('body').append(searchHtml);
    }

    // 处理搜索按钮点击事件 - 兼容不同页面的按钮类名
    $(document).on('click', '.search_btn, .search > a, .close_link', function(e) {
      e.preventDefault();
      $(".search_wrapper").toggleClass("active");
      // 当搜索框打开时，自动聚焦到输入框
      if ($(".search_wrapper").hasClass("active")) {
        setTimeout(function() {
          $("#search_input").focus();
        }, 300);
      }
    });

    // 节气页面映射
    var solarTermsMap = {
      "立春": "lichun.html",
      "雨水": "yushui.html",
      "惊蛰": "jingzhe.html",
      "春分": "chunfen.html",
      "清明": "qingming.html",
      "谷雨": "guyu.html",
      "立夏": "lixia.html",
      "小满": "xiaoman.html",
      "芒种": "mangzhong.html",
      "夏至": "xiazhi.html",
      "小暑": "xiaoshu.html",
      "大暑": "dashu.html",
      "立秋": "liqiu.html",
      "处暑": "chushu.html",
      "白露": "bailu.html",
      "秋分": "qiufen.html",
      "寒露": "hanlu.html",
      "霜降": "shuangjiang.html",
      "立冬": "lidong.html",
      "小雪": "xiaoxue.html",
      "大雪": "daxue.html",
      "冬至": "dongzhi.html",
      "小寒": "xiaohan.html",
      "大寒": "dahan.html",
      "除夕": "chunjie.html",
      "春节": "chunjie.html",
      "元宵节": "chunjie.html",
      "端午节": "chunjie.html",
      "七夕节": "chunjie.html",
      "中秋节": "chunjie.html",
      "重阳节": "chunjie.html"
    };

    // 搜索表单提交事件
    $(document).on('submit', "#search_form", function(e) {
      e.preventDefault();
      var query = $("#search_input").val().trim();
      if (query && solarTermsMap[query]) {
        // 找到匹配的节气，跳转到对应页面
        window.location.href = solarTermsMap[query];
      } else {
        // 未找到匹配的节气，显示自定义弹窗并清空输入框
        var msg = "未找到该节气页面";
        var existingAlert = $("#custom_alert");
        if (existingAlert.length === 0) {
          let alertHtml = '<div id="custom_alert" role="alert" aria-live="assertive" style="position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;display:none;padding:12px 18px;background:rgba(0,0,0,0.85);color:#fff;border-radius:8px;font-size:14px;box-shadow:0 6px 18px rgba(0,0,0,0.3);">';
          alertHtml += '<span class="custom_alert_msg">'+ msg +'</span>';
          alertHtml += '<button type="button" id="custom_alert_close" aria-label="关闭提示" style="margin-left:12px;background:transparent;border:none;color:#fff;font-weight:700;cursor:pointer;font-size:18px;line-height:1;">×</button>';
          alertHtml += '</div>';
          $('body').append(alertHtml);
          $(document).on('click', '#custom_alert_close', function() {
            $('#custom_alert').fadeOut(200);
          });
        } else {
          existingAlert.find('.custom_alert_msg').text(msg);
          if (!existingAlert.find('#custom_alert_close').length) {
            existingAlert.append('<button type="button" id="custom_alert_close" aria-label="关闭提示" style="margin-left:12px;background:transparent;border:none;color:#fff;font-weight:700;cursor:pointer;font-size:18px;line-height:1;">×</button>');
          }
        }
        existingAlert.stop(true, true).fadeIn(200).delay(2500).fadeOut(300);
        $("#search_input").val("");
      }
    });

    // 点击搜索区域外部关闭搜索框
    $(document).on('click', function(e) {
      var searchWrapper = $(".search_wrapper");
      if (searchWrapper.hasClass("active") &&
          !$(e.target).closest('.search_wrapper, .search_btn, .search > a').length) {
        searchWrapper.removeClass("active");
      }
    });

    // 处理ESC键关闭搜索框
    $(document).on('keydown', function(e) {
      if (e.key === "Escape" && $(".search_wrapper").hasClass("active")) {
        $(".search_wrapper").removeClass("active");
      }
    });
    /*---------------------
        Sidebar-menu js
    -----------------------*/
    $(".menu_icon,.close_btn").on('click', function (e) {
      e.preventDefault();
      $(".sidenav_menu").toggleClass("active");
    });
    $.sidebarMenu($('.sidebar-menu'))
    /*----------------------
        Scroll top js
    ------------------------*/
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
          $('#scroll_top').fadeIn();
      } else {
          $('#scroll_top').fadeOut();
      }
    });
    $('#scroll_top').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*----------------------
        Scroll top js
    ------------------------*/
    /*----------------------
        slider js
    ------------------------*/
    $('.testimonial_slide_1').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay:false,
        speed: 400,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });
    $('.time_slide').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay:false,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    /*----------------------
        slider js
    ------------------------*/
    /*----------------------
        magnific-Popup js
    ----------------------*/
    $('.play_btn').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    /*----------------------
        magnific-Popup js
    ----------------------*/
    /*----------------------
        datepicker js
    ------------------------*/
    $( "#datepicker" ).datepicker();
    /*----------------------
        nice-select js
    ------------------------*/
    $('.selectoption').niceSelect();
    /*----------------------
        Countdown Timer js
    ----------------------*/
    if($('.offer_countdown').length){
      $('.offer_countdown').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime('' + '<div class="counter_column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter_column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter_column"><div class="inner"><span class="count">%M</span>Minutes</div></div>  ' + '<div class="counter_column"><div class="inner"><span class="count">%S</span>Seconds</div></div>'));
      });
     });
    }

})(window.jQuery);
