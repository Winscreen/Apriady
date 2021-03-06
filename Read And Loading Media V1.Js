<!-- Winscreen.web.id -->

    $(document).ready(function() {
     $(window).scroll(function() {
         $(this).scrollTop() ? $(".totop").fadeIn() : $(".totop").fadeOut()
     }), $(".totop").click(function() {
         $("html,body").animate({
             scrollTop: 0
         }, 500)
     });
     var n = window.location.href;
     $(".navlist li a,.navlist li ul li ul li a").filter(function() {
         return $(this).prop("href") === n
     }).parent("li").addClass("current-menu-parent");
     var l = window.location.href;
     $(".navlist li ul li a,.navlist li ul li a").filter(function() {
         return $(this).prop("href") === l
     }).parents("li").parents("ul").parent().addClass("current-menu-parent"), $(".navlist ul").parent().addClass("menu-item-has-children item-plus")
 });
 ! function(e) {
     "use strict";

     function i() {
         e(".blog-grid").length && setTimeout(function() {
             e(".blog-grid .post-wrapper").masonry({
                 columnWidth: ".grid-item",
                 itemSelector: ".grid-item"
             })
         }, 1)
     }

     function t() {
         var i = e('input[type="search"], input[type="text"], input[type="email"], textarea');
         i.each(function() {
             var i = e(this),
                 t = i.val();
             i.focus(function() {
                 e(this).val() === t && e(this).val("")
             }), i.blur(function() {
                 "" === e(this).val() && e(this).val(t)
             })
         })
     }

     function a() {
         if (e(".blog-timeline").length) {
             var i = e(window).scrollTop(),
                 t = e(window).height(),
                 a = e(".blog-timeline .content").offset().top,
                 n = i - a;
             e(".pi-line").css({
                 top: "0",
                 "-webkit-transform": "translateY(" + n + "px)",
                 "-o-transform": "translateY(" + n + "px)",
                 "-ms-transform": "translateY(" + n + "px)",
                 "-moz-transform": "translateY(" + n + "px)",
                 transform: "translateY(" + n + "px)"
             }), e(".blog-timeline .post-meta").each(function() {
                 var a = e(this),
                     n = a.offset().top,
                     s = n - t / 2;
                 i >= s ? a.addClass("metaLight") : a.removeClass("metaLight")
             })
         }
     }

     function n() {
         e().tweet && e(".latest-tweets").each(function() {
             var i = e(".latest-tweets");
             i.tweet({
                 username: i.data("username"),
                 join_text: "auto",
                 avatar_size: null,
                 count: i.data("number"),
                 template: "{text}",
                 loading_text: "loading tweets...",
                 modpath: i.data("modpath"),
                 callback: d
             })
         })
     }

     function s() {
         var i = e(".pi-navigation"),
             t = e("#header").offset().top + e("#header").outerHeight() - 52,
             a = e(window).scrollTop();
         a >= t ? i.addClass("nav-fixed") : i.removeClass("nav-fixed")
     }
     var o = {
             Android: function() {
                 return navigator.userAgent.match(/Android/i)
             },
             BlackBerry: function() {
                 return navigator.userAgent.match(/BlackBerry/i)
             },
             iOS: function() {
                 return navigator.userAgent.match(/iPhone|iPad|iPod/i)
             },
             Opera: function() {
                 return navigator.userAgent.match(/Opera Mini/i)
             },
             Windows: function() {
                 return navigator.userAgent.match(/IEMobile/i)
             },
             any: function() {
                 return o.Android() || o.BlackBerry() || o.iOS() || o.Opera() || o.Windows()
             }
         },
         r = (window.innerWidth, e(window).height(), ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>']),
         l = function() {
             var i = e(".post-slider");
             i.length > 0 && i.owlCarousel({
                 autoPlay: !1,
                 slideSpeed: 300,
                 navigation: !0,
                 pagination: !1,
                 singleItem: !0,
                 autoHeight: !0,
                 navigationText: r
             })
         },
          c = function() {
              var i = e(".featured-slider");
              i.length > 0 && i.owlCarousel({
                  autoPlay: 2e4,
                  slideSpeed: 300,
                  navigation: !0,
                  pagination: !1,
                  items: 5,
                  loop:true,
                  itemsCustom: [
                      [0, 1],
                      [500, 2],
                      [992, 3],
                      [1200, 3],
                      [1400, 4]
                  ],
                  navigationText: r,
              })
          },
         u = {
             obj: {
                 subscribeEmail: e("#subscribe-email"),
                 subscribeButton: e("#subscribe-button"),
                 subscribeMsg: e("#subscribe-form .subscribe-status"),
                 subscribeContent: e("#subscribe-form .form-remove"),
                 dataMailchimp: e("#subscribe-form").attr("data-mailchimp"),
                 success_message: "Terima kasih telah bergabung dengan mailing list kami. Silahkan cek email Anda untuk link konfirmasi.",
                 failure_message: "Ada masalah saat memproses pengajuan Anda.",
                 noticeError: "{msg}",
                 noticeInfo: "{msg}",
                 basicAction: "mail/subscribe.php",
                 mailChimpAction: "mail/subscribe-mailchimp.php"
             },
             eventLoad: function() {
                 var i = u.obj;
                 e(i.subscribeButton).on("click", function() {
                     if ("" != i.subscribeEmail.val()) {
                         if (window.ajaxCalling) return;
                         var e = "true" === i.dataMailchimp;
                         u.ajaxCall(e ? i.mailChimpAction : i.basicAction)
                     } else i.subscribeMsg.html("Email is required.").fadeIn("slow");
                     return !1
                 })
             },
             ajaxCall: function(i) {
                 window.ajaxCalling = !0;
                 var t = u.obj,
                     a = t.subscribeMsg.html("").hide();
                 t.subscribeButton.val("Sending"), e.ajax({
                     url: i,
                     type: "POST",
                     dataType: "json",
                     data: {
                         subscribeEmail: t.subscribeEmail.val()
                     },
                     success: function(e) {
                         if (e.status) t.subscribeContent.fadeOut(500, function() {
                             a.html(t.success_message).fadeIn(500)
                         });
                         else {
                             switch (e.msg) {
                                 case "email-required":
                                     a.html(t.noticeError.replace("{msg}", "Email is required."));
                                     break;
                                 case "email-err":
                                     a.html(t.noticeError.replace("{msg}", "Email invalid."));
                                     break;
                                 case "duplicate":
                                     a.html(t.noticeError.replace("{msg}", "Email is duplicate."));
                                     break;
                                 case "filewrite":
                                     a.html(t.noticeInfo.replace("{msg}", "Mail list file is open."));
                                     break;
                                 case "undefined":
                                     a.html(t.noticeInfo.replace("{msg}", "undefined error."));
                                     break;
                                 case "not-support":
                                     a.html(t.noticeInfo.replace("{msg}", "Your host do not support php mail function."));
                                     break;
                                 case "api-error":
                                     t.subscribeContent.fadeOut(500, function() {
                                         a.html(t.failure_message)
                                     })
                             }
                             t.subscribeButton.val("Send"), a.fadeIn(500)
                         }
                     },
                     error: function() {
                         alert("Connection error")
                     },
                     complete: function() {
                         window.ajaxCalling = !1
                     }
                 })
             }
         },
         d = function() {
             e(".twitter-slider").owlCarousel({
                 autoPlay: !1,
                 slideSpeed: 300,
                 navigation: !0,
                 pagination: !1,
                 singleItem: !0,
                 autoHeight: !0,
                 transitionStyle: "fade",
                 navigationText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>']
             })
         };
     e(document).ready(function() {
         u.eventLoad(), o.any() && e("html").addClass("ismobile"), e(document).on("click", ".share-toggle", function() {
             var i = e(this);
             i.toggleClass("toggle-active"), i.siblings(".share").toggleClass("share-active")
         }), e(".search-box .icon-search").on("click", function() {
             e(this).toggleClass("active"), e('.search-box input[type="search"]').toggleClass("fadein")
         }), e("html").on("click", function() {
             e(".search-box .icon-search").removeClass("active"), e('.search-box input[type="search"]').removeClass("fadein")
         }), e(".search-box").on("click", function(e) {
             e.stopPropagation()
         }), e(".pi-line").height(e(window).height() / 2), e(window).scroll(function() {
             a(), s()
         })
     }), e(window).on("load resize", function() {
         var i = e(".sidebar-right"),
             t = e(".sidebar-left");
         i.closest(".blog-standard").find(".content").css("margin-right", "100px"), t.closest(".blog-standard").find(".content").css({
             "margin-left": "30px",
             "margin-right": "70px"
         }), i.closest(".blog-grid, .blog-list, .blog-timeline").find(".content").css("margin-right", "30px"), t.closest(".blog-grid, .blog-list, .blog-timeline").find(".content").css("margin-left", "30px"), t.closest(".blog-content").find(".col-md-9").addClass("col-md-push-3"), t.closest(".blog-content").find(".col-md-3").addClass("col-md-pull-9"), e(".blog-standard .post").each(function() {
             var i = e(this),
                 t = i.find(".post-meta"),
                 a = i.find(".post-title"),
                 n = i.find(".post-media");
             t.insertAfter(window.innerWidth < 992 ? a : n)
         }), e(".blog-list .post").each(function() {
             {
                 var i = e(this),
                     t = i.find(".post-meta"),
                     a = i.find(".post-title"),
                     n = i.find(".post-author");
                 i.find(".post-media")
             }
             n.insertAfter(t.children().first()), t.insertAfter(a)
         }), e(".pi-navigation").each(function() {
             var i = e(this),
                 t = i.find(".open-menu"),
                 a = i.find(".close-menu"),
                 n = i.find(".navlist"),
                 s = i.find(".sub-menu"),
                 o = e("#header"),
                 r = window.innerWidth,
                 l = e(window).height(),
                 c = i.data("menu-responsive");
             c > r ? (t.show(), o.addClass("header-responsive"), n.addClass("off-canvas").css("height", l - 52), n.children(".menu-item-has-children").removeClass("item-plus"), 0 === i.find(".submenu-toggle").length && (e(".menu-item-has-children, .navList > .menu-item-language-current").children("a").after('<span class="submenu-toggle"><i class="fa fa-angle-right"></i></span>'), n.on("click", ".submenu-toggle", function(i) {
                 i.preventDefault(), e(this).siblings(".sub-menu").addClass("sub-menu-active")
             })), s.each(function() {
                 var t = e(this);
                 0 === t.find(".back-mb").length && t.prepend('<li class="back-mb"><a href="#">Kembali</a></li>'), i.on("click", ".back-mb a", function(i) {
                     i.preventDefault(), e(this).parent().parent().removeClass("sub-menu-active")
                 })
             }), t.on("click", function() {
                 n.addClass("off-canvas-active"), e(this).addClass("toggle-active"), a.show()
             }), a.on("click", function() {
                 n.removeClass("off-canvas-active"), t.removeClass("toggle-active"), e(".sub-menu").removeClass("sub-menu-active"), e(this).hide()
             }), e("html").on("click", function() {
                 n.removeClass("off-canvas-active"), t.removeClass("toggle-active"), e(".sub-menu").removeClass("sub-menu-active"), a.hide()
             }), i.on("click", function(e) {
                 e.stopPropagation()
             })) : (t.hide(), o.removeClass("header-responsive"), n.removeClass("off-canvas").css("height", "auto"), n.children(".menu-item-has-children").addClass("item-plus"), e(".back-mb, .submenu-toggle").remove())
         })
     }), e(window).load(function() {
         e("#preloader").fadeOut(1e3), n(), i(), t(), l(), c()
     })
 }(jQuery);
