"use strict";
! function(e) {
    var t = {},
        i = {
            direction: "prev",
            mode: "horizontal",
            speed: 1,
            delay: 30,
            onCarouselTickerLoad: function() {}
        };
    e.fn.carouselTicker = function(n) {
        function s() {
            l.itemsWidth = 0, l.$items.each(function() {
                var t = e(this),
                    i = this.currentStyle || window.getComputedStyle(this),
                    n = parseFloat(i.marginLeft) + parseFloat(i.marginRight);
                t.hasClass(l.cloneCls) || (l.itemsWidth += this.getBoundingClientRect().width + n)
            })
        }

        function o() {
            l.itemsHeight = 0, l.$items.each(function() {
                var t = e(this);
                t.hasClass(l.cloneCls) || (l.itemsHeight += t.outerHeight(!0))
            })
        }

        function r() {
            u.on("mouseover", function() {
                var e = "horizontal" === l.settings.mode ? l.itemsWidth > l.$parent.width() : l.itemsHeight > l.$parent.height();
                e && (clearInterval(l.intervalPointer), l.intervalPointer = !1)
            })
        }

        function c() {
            u.on("mouseleave", function() {
                var e = "horizontal" === l.settings.mode ? l.itemsWidth > l.$parent.width() : l.itemsHeight > l.$parent.height();
                if (l.isMousemove && (l.$list.off(l.eventTypes.mousemove), l.$list.trigger(l.eventTypes.mouseup)), e) {
                    if (l.intervalPointer) return;
                    l.intervalPointer = setInterval(function() {
                        m()
                    }, l.settings.delay)
                }
            })
        }

        function a() {
            var t = !1;
            l.$list.on(l.eventTypes.mousedown, function(i) {
                var n = i.clientX || event.touches[0].pageX,
                    s = i.clientY || event.touches[0].pageY,
                    o = e(this),
                    r = parseFloat(e(this).css("left")),
                    c = parseFloat(e(this).css("top"));
                e(i.target).off("click"), clearInterval(l.intervalPointer), l.intervalPointer = !1, t = !0, o.on(l.eventTypes.mousemove, function(i) {
                    var a = i.clientX || event.touches[0].pageX,
                        h = i.clientY || event.touches[0].pageY,
                        u = n - a,
                        d = s - h;
                    l.touch && e(document).on("touchmove", function(e) {
                        e.preventDefault()
                    }), "horizontal" === l.settings.mode ? l.directionSwitcher = u >= 0 ? -1 : 1 : "vertical" === l.settings.mode && (l.directionSwitcher = d >= 0 ? -1 : 1), l.isMousemove = !0, t && ("horizontal" === l.settings.mode ? (r - u >= 0 && 1 === l.directionSwitcher && (o.css("left", "-=" + l.itemsWidth), r = -l.itemsWidth, n = i.clientX || event.touches[0].pageX, u = 0), r - u <= -l.itemsWidth && -1 === l.directionSwitcher && (o.css("left", 0), r = 0, u = 0, n = i.clientX || event.touches[0].pageX), o.css("left", r - u + "px")) : "vertical" === l.settings.mode && (c - d >= 0 && 1 === l.directionSwitcher && (o.css("top", "-=" + l.itemsHeight), c = -l.itemsHeight, s = i.clientY || event.touches[0].pageY, d = 0), c - d <= -l.itemsHeight && -1 === l.directionSwitcher && (o.css("top", 0), c = 0, d = 0, s = i.clientY || event.touches[0].pageY), o.css("top", c - d + "px")))
                })
            }), l.$list.on(l.eventTypes.mouseup, function(i) {
                var n = e(i.target);
                i.preventDefault(), (n.attr("href") || n.parents().attr("href") && l.isMousemove) && n.on("click", function(e) {
                    e.preventDefault()
                }), t = !1, l.isMousemove = !1, l.settings.direction = 1 === l.directionSwitcher ? "next" : "prev", e(this).off(l.eventTypes.mousemove), l.touch && e(document).off("touchmove"), l.intervalPointer && clearInterval(l.intervalPointer), l.touch && (l.intervalPointer = setInterval(function() {
                    m()
                }, l.settings.delay))
            })
        }
        if (0 == this.length) return this;
        if (this.length > 1) return this.each(function() {
            e(this).carouselTicker(n)
        }), this;
        var l = {},
            h = this,
            u = e(this);
        t.el = this, t.$el = e(this);
        var d = function() {
                l.settings = e.extend({}, i, n), l.intervalPointer = null, l.directionSwitcher = "prev" === l.settings.direction ? -1 : 1, l.itemsWidth = 0, l.childsWidth = 0, l.itemsHeight = 0, l.childsHeight = 0, l.$list = u.children("ul"), l.$items = l.$list.children("li"), l.isInitialize = !1, l.isMousemove = !1, l.$parent = u.parent(), l.wrapCls = "carouselTicker__wrap", l.loaderCls = "carouselTicker__loader", l.cloneCls = "carouselTicker__clone", l.touch = "ontouchstart" in document.documentElement ? !0 : !1, l.eventTypes = {
                    mousedown: l.touch ? "touchstart" : "mousedown",
                    mousemove: l.touch ? "touchmove" : "mousemove",
                    mouseup: l.touch ? "touchend" : "mouseup"
                }, v()
            },
            v = function() {
                function t() {
                    u.children().hasClass(l.wrapCls) || (e("<div class='" + l.loaderCls + "'></div>").appendTo(u), u.find("." + l.wrapCls).css({
                        position: "relative"
                    }), l.$list.wrap("<div class='carouselTicker__wrap' style='position: relative; overflow: hidden; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none;'></div>"), l.$items.clone().addClass(l.cloneCls).appendTo(l.$list), l.$list.css({
                        position: "relative"
                    }), l.isInitialize = !0, l.settings.onCarouselTickerLoad(), p())
                }
                "horizontal" === l.settings.mode ? (s(), l.itemsWidth > l.$parent.width() && (u.find("." + l.wrapCls).css({
                    width: l.$parent.width() + "px"
                }), l.$list.css({
                    width: 2 * l.itemsWidth,
                    left: 0
                }), t())) : "vertical" === l.settings.mode && (o(), l.itemsHeight > l.$parent.height() && (u.find("." + l.wrapCls).css({
                    height: l.$parent.height() + "px"
                }), l.$list.css({
                    height: 2 * l.itemsHeight,
                    top: 0
                }), t())), l.isInitialize && u.on("dragstart", function(e) {
                    return "IMG" == e.target.nodeName.toUpperCase() || "A" == e.target.nodeName.toUpperCase() ? !1 : void 0
                })
            },
            p = function() {
                u.find("." + l.loaderCls).length && u.find("." + l.loaderCls).remove(), l.intervalPointer = setInterval(function() {
                    m()
                }, l.settings.delay), r(), c(), a()
            },
            m = function() {
                var e = "horizontal" === l.settings.mode ? "left" : "top",
                    t = "horizontal" === l.settings.mode ? l.itemsWidth : l.itemsHeight;
                l.$list.css(e, "+=" + l.directionSwitcher * l.settings.speed + "px"), "prev" === l.settings.direction && Math.abs(parseInt(l.$list.css(e))) >= t && l.$list.css(e, 0), "next" === l.settings.direction && parseInt(l.$list.css(e)) >= 0 && l.$list.css(e, -t + "px")
            };
        return h.resizeTicker = function() {
            s(), l.itemsWidth > l.$parent.width() ? l.isInitialize || d() : l.isInitialize && h.destructor()
        }, h.stop = function() {
            clearInterval(l.intervalPointer), l.intervalPointer = !1
        }, h.run = function() {
            p()
        }, h.destructor = function() {
            u.find("." + l.cloneCls).remove(), u.find("." + l.wrapCls).length && (l.$list.unwrap(), l.$list.css({
                left: "auto",
                position: "static",
                width: "auto"
            }), u.css({
                width: "auto",
                position: "static"
            })), clearInterval(l.intervalPointer), l.isInitialize = !1, l.intervalPointer = !1
        }, h.reloadCarouselTicker = function(e) {
            void 0 != e && (n = e), h.destructor(), d()
        }, "loading" === document.readyState ? e(window).on("load", function() {
            d()
        }) : d(), this
    }
}(jQuery);

(function($, undefined) {

    $(window).on("load", function() {
        $("#carouselTicker").carouselTicker();
    })

})(jQuery);