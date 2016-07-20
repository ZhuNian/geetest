"5.5.9";
"use strict";
!function (a, b) {
  a.Geetest = b(a, a.jQuery || a.Zepto || a.ender || a.$), "function" == typeof define && define.amd ? define("Geetest", ["jquery"], function (c) {
    return b(a, c)
  }) : "undefined" != typeof exports && (exports = b(a))
}(this, function (a, b) {
  var c = {};
  c.serial = function (a, b) {
    var c = a.length, d = [!1], e = 1, f = function (g, h) {
      return h ? (d = [!0], void b.apply(null, d)) : (d[e] = g, e += 1, void(e > c ? b.apply(null, d) : a[e - 1](f)))
    };
    a[0](f)
  }, c.parallel = function (a, b) {
    for (var c = a.length, d = [!1], e = 0, f = function (a) {
      return function (f, g) {
        if (-1 !== e) {
          if (g)return d = [!0], b.apply(null, d), d = [], void(e = -1);
          e += 1, d[a] = f, e === c && b.apply(null, d)
        }
      }
    }, g = 1; c >= g; g += 1)a[g - 1](f(g), g)
  };
  var d = {}, e = {}, f = function (a) {
    return e[a] && e[a].content
  }, g = function (a, b, c) {
    b in e ? "loaded" === e[b].status ? c && c(e[b].content) : "loading" === e[b].status ? h.Y(b + "Loaded", function () {
      c && c(e[b].content)
    }) : t("module " + b + " lost!") : (e[b] = {status: "loading"}, D(a, "js/" + b.toLowerCase() + "." + a.config.version + ".js", function (d) {
      return d ? void t("module " + b + " can not loaded") : void g(a, b, c)
    }))
  };
  d.Z = function (a, b, c) {
    var d;
    if (s(b)) {
      for (var g = [], i = 0; i < b.length; i++)g[i] = f(b[i]);
      d = c.apply(null, g)
    } else d = b();
    return e[a] = {}, e[a].status = "loaded", e[a].content = d, h._(a + "Loaded"), d
  };
  var h = {};
  h.aa = {}, h.aa.global = {}, h.ba = function (a) {
    h.aa[a] = {}
  }, h.ca = function (a, b, c) {
    return c ? (h.aa[c][a] || (h.aa[c][a] = []), void h.aa[c][a].push({
      once: !1,
      callback: b
    })) : (h.aa.global[a] || (h.aa.global[a] = []), void h.aa.global[a].push({once: !1, callback: b}))
  }, h.Y = function (a, b, c) {
    c ? (h.aa[c][a] || (h.aa[c][a] = []), h.aa[c][a].push({
      once: !0,
      callback: b
    })) : (h.aa.global[a] || (h.aa.global[a] = []), h.aa.global[a].push({once: !0, callback: b}))
  }, h.da = function (a, b, c) {
    var d;
    d = c ? h.aa[c][a] : h.aa.global[a], d.splice(m(b, d), 1)
  }, h.ea = function (a, b) {
    n(h.aa, b)
  }, h.fa = function (a, b) {
    var c, d = h.aa[b][a];
    if (d)for (var e = 0; e < d.length; e++)c = d[e], c && (c.callback.call(P.ga("self", b)), c.once && (h.da(a, c, b), e -= 1))
  }, h._ = function (a) {
    var b, c = h.aa.global[a];
    if (c)for (var d = 0; d < c.length; d++)b = c[d], b && (b.callback(), b.once && (h.da(a, b), d -= 1))
  };
  var i = function (a, b) {
    var c = b || {};
    for (var d in a)a.hasOwnProperty(d) && (c[d] = a[d]);
    return c
  }, j = function (a) {
    var b = [];
    for (var c in a)a.hasOwnProperty(c) && "function" != typeof a[c] && b.push(c + "=" + a[c]);
    return b.join("&")
  }, k = function (a) {
    return "function" == typeof a
  }, l = function () {
    return parseInt(1e4 * Math.random()) + (new Date).valueOf()
  }, m = function (a, b, c) {
    var d, e = Array.prototype.indexOf;
    if (b) {
      if (e)return e.call(b, a, c);
      for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
    }
    return -1
  }, n = function (a, b) {
    a[b] = void 0;
    try {
      delete a[b]
    } catch (c) {
    }
  }, o = function (a, b) {
    try {
      a.innerHTML = b
    } catch (c) {
      a.innerText = b
    }
  }, p = function (a, b) {
    return Array.prototype.slice.call(a, b)
  }, q = function (a, b) {
    if (a === b)return !0;
    if (null == a || null == b)return !1;
    if (a.length != b.length)return !1;
    for (var c = 0; c < a.length; ++c)if (a[c] !== b[c])return !1;
    return !0
  }, r = function (a, b) {
    for (var c = [], d = 0; d < a.length; d++)c.push(a[d] - b[d]);
    return c
  }, s = function (a) {
    return Array.isArray ? Array.isArray(a) : "[object Array]" === Object.prototype.toString.call(a)
  }, t = function (a) {
    try {
      console && console.log(a)
    } catch (b) {
    }
  }, u = function () {
    var a = function (a, b) {
      var c;
      if (s(a)) {
        c = [];
        for (var d = 0, e = a.length; e > d; d += 1)c[d] = b(d, a[d])
      } else {
        c = {};
        for (var f in a)a.hasOwnProperty(f) && (c[f] = b(f, a[f]))
      }
      return c
    }, b = function (a) {
      var b = 0;
      if (s(a))b = a.length; else for (var c in a)a.hasOwnProperty(c) && (b += 1);
      return b
    };
    return {ha: a, ia: b}
  }(), v = !1, w = {
    challenge: "",
    type: "slide",
    fullbg: "",
    bg: "",
    slice: "",
    xpos: 0,
    ypos: 0,
    height: 116,
    link: "javascript:;",
    https: !1,
    logo: !0,
    product: "float",
    id: "",
    version: "5.5.9",
    theme: "golden",
    theme_version: "3.0.21",
    show_delay: 250,
    hide_delay: 800,
    lang: "zh-cn",
    clean: !1,
    protocol: "http://",
    path: "static/",
    apiserver: "api.geetest.com/",
    staticservers: ["static.geetest.com/", "dn-staticdown.qbox.me/"],
    retry: 0
  }, x = {
    loaded_theme: {},
    loaded_skin: {},
    loaded_sprite: {},
    mobileSkins: {},
    mobileSprites: {},
    feedback: "http://www.geetest.com/contact/#report",
    homepage: "http://www.geetest.com"
  }, y = function (a, b) {
    for (var c in a)a.hasOwnProperty(c) && "undefined" != typeof b[c] && (a[c] = b[c])
  }, z = function (a, b) {
    return y(x, a), b.config ? i(a, i(b.config)) : i(a, i(w))
  }, A = function (a, b) {
    var c = document.createElement("img");
    c.crossOrigin = "Anonymous", c.onerror = function () {
      b(!0, c), c.onerror = null
    }, c.onload = c.onreadystatechange = function () {
      c.readyState && "loaded" !== c.readyState && "complete" !== c.readyState || (b(!1, c), c.onload = c.onreadystatechange = null)
    }, c.src = a
  }, B = function (a, b, c) {
    var d = document.createElement("link");
    d.setAttribute("rel", "stylesheet"), d.setAttribute("href", b), d.onerror = function () {
      c(!0), d.onload = d.onerror = null
    }, d.onload = function () {
      c(!L(a)), d.onload = d.onerror = null
    }, document.getElementsByTagName("head")[0].appendChild(d)
  }, C = function (a, b) {
    var c = document.createElement("script");
    c.charset = "UTF-8", c.async = !1, c.onerror = function () {
      b(!0), c.onerror = null
    }, c.onload = c.onreadystatechange = function () {
      c.readyState && "loaded" !== c.readyState && "complete" !== c.readyState || (b(!1, null), c.onload = c.onreadystatechange = null)
    }, c.src = a, document.getElementsByTagName("head")[0].appendChild(c)
  }, D = function (a, b, c) {
    var d = a.config.staticservers, e = a.config.protocol, f = a.config.path, g = d.length, h = 0, i = function (a, b) {
      return b.indexOf("pictures/") > -1 ? e + d[a] + b : e + d[a] + f + b
    };
    "function" != typeof c && (c = function () {
    });
    var j = function (a, b) {
      return a ? (h += 1, void k(b)) : void c(!1, b)
    }, k = function (d) {
      return h >= g ? void c(!0, d) : void(b.indexOf(".js") > -1 ? C(i(h, b), j) : b.indexOf(".png") > -1 || b.indexOf(".jpg") > -1 || b.indexOf(".webp") > -1 || b.indexOf(".svg") > -1 ? A(i(h, b), j) : b.indexOf(".css") > -1 ? B(a, i(h, b), j) : (b && t("no such resource: " + b), c(!0, d)))
    };
    k(null)
  }, E = function (a, b, c) {
    a = c.config.protocol + a.replace(/http:\/\/|https:\/\//, "");
    var d = "geetest_" + l();
    window[d] = function (a) {
      a.error && (h.fa("error", c.id), h.fa("statusChange", c.id), n(window, d)), b.call(c, !1, a, c)
    }, C(a + "&callback=" + d, function (d) {
      d && (t("GeeTest Error: request " + a + " can not access"), b.call(c, !0, null, c))
    })
  }, F = document.createElement("img");
  F.onload = F.onerror = function () {
    var a = ".jpg";
    2 === F.height && (a = ".webp"), x.webp = a, h._("WebPLoaded")
  }, F.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
  var G = /msie 6/i.test(navigator.userAgent), H = -1, I = /msie|trident\/|edge/i.test(navigator.userAgent), J = function () {
    return H = "transition"in document.body.style || "webkitTransition"in document.body.style || "mozTransition"in document.body.style || "msTransition"in document.body.style
  };
  document && document.body && J(), G && (x.webp = ".jpg");
  var K = function (a, b) {
    var c;
    return a.currentStyle ? c = a.currentStyle[b] : window.getComputedStyle && (c = window.getComputedStyle(a, null).getPropertyValue(b)), c
  }, L = function (a) {
    if (!I)return !0;
    var b = "178273px", c = P.ga("styleDetectEle", a.id);
    return c && K(c, "width") === b ? (c.parentNode.removeChild(c), P.ka("styleDetectEle", !1, a.id), !0) : !1
  }, M = function (a) {
    if (I) {
      var b = document.createElement("div");
      b.id = "geetest_style_detect_178273px", P.ka("styleDetectEle", b, a.id), document.getElementsByTagName("body")[0].appendChild(b)
    }
  }, N = function (a, b) {
    if (!(this instanceof N))return new N(a, b);
    var c = this;
    return c.id = l(), h.ba(c.id), P.ba(c.id, c), c.config = z(a, c), c.config.protocol = c.config.https ? "https://" : location.protocol + "//", v && (c.config.debug = a.debug), b || a.offline ? (O(!1, a, c), c.bindOn("#" + a.popupbtnid)) : E(c.config.apiserver + "get.php?" + j(a), O, c), M(c), c
  }, O = function (a, b, d) {
    return a ? qa.onError.call(d, !0) : b ? (v && (b = i(d.config.debug, b), d.config = z(b, d)), -1 == H && J(), void c.parallel([function (a) {
      b.offline ? g(d, "Offline", function (b) {
        a(b)
      }) : a(null)
    }, function (a) {
      b.fullpage ? g(d, "Fullpage", function (b) {
        a(b)
      }) : a(null)
    }, function (a) {
      b.benchmark ? g(d, "Benchmark", function (b) {
        a(b)
      }) : a(null)
    }], function (a, e, i, j) {
      i && i.g(), b.offline ? d.config = z(e.g(d), d) : d.config = z(b, d), h.ca("success", qa.onSuccess, d.id), h.ca("refresh", qa.onRefresh, d.id), h.ca("fail", qa.onFail, d.id), h.ca("forbidden", qa.onForbidden, d.id), h.ca("abuse", qa.onAbuse, d.id), h.ca("error", qa.onError, d.id), h.Y("DOMReady", qa.onReady, d.id), h.Y("DOMReady", function () {
        d.config.benchmark && f("Benchmark").g(d)
      }, d.id), c.serial([function (a) {
        d.config.mobile ? g(d, "SVG", function (b) {
          a(b)
        }) : "curtain" === d.config.type ? g(d, "Curtain", function (b) {
          a(b)
        }) : a(null)
      }], function () {
        if (x.loaded_theme[d.config.theme])d.config.mobile && !x.mobileSkins[d.config.theme] ? h.Y(d.config.theme + "Loaded", function () {
          P.ka("loaded", !0, d.id), h.fa("loaded", d.id)
        }) : (P.ka("loaded", !0, d.id), h.fa("loaded", d.id)); else if (x.loaded_theme[d.config.theme] = !0, d.config.mobile) {
          if (window.GeeTestSkins && window.GeeTestSkins[d.config.theme])return x.mobileSkins[d.config.theme] = window.GeeTestSkins[d.config.theme], P.ka("loaded", !0, d.id), void h.fa("loaded", d.id);
          D(d, d.config.theme + "/skin." + d.config.theme_version + ".js", function (a) {
            return a ? void t("svg " + d.config.theme + " skin.js can not loaded") : (x.mobileSkins[d.config.theme] = window.GeeTestSkins[d.config.theme], h._(d.config.theme + "Loaded"), P.ka("loaded", !0, d.id), void h.fa("loaded", d.id))
          })
        } else c.parallel([function (a) {
          D(d, d.config.theme + "/style" + (d.config.https ? "_https" : "") + "." + d.config.theme_version + ".css", function () {
            a(null, !0)
          })
        }, function (a) {
          setTimeout(function () {
            a(null, !0)
          }, 600)
        }], function () {
          P.ka("loaded", !0, d.id), h.fa("loaded", d.id)
        })
      })
    })) : !1
  }, P = {};
  P.aa = {}, P.ba = function (a, b) {
    P.aa[a] = {}, P.aa[a].self = b
  }, P.ka = function (a, b, c) {
    return P.aa[c][a] = b, b
  }, P.ga = function (a, b) {
    return P.aa[b][a]
  };
  var Q = function (a) {
    var b = {
      "zh-cn": {
        loading: "加载中...",
        slide: "按住左边滑块，拖动完成上方拼图",
        curtain: "点击上图按钮并沿道路拖动到终点处",
        curtain_knob: "移动到此开始验证",
        refresh: "刷新验证",
        help: "帮助反馈",
        feedback: "反馈",
        fail: ["验证失败:", "拖动滑块将悬浮图像正确拼合"],
        success: ["验证通过:", "sec 秒的速度超过 score% 的用户"],
        abuse: ["尝试过多:", "系统正在自动刷新图片"],
        forbidden: ["再来一次:", "哇哦～怪物吃了拼图 count 秒后重试"],
        error: ["出现错误:", "请关闭验证重试"]
      },
      "zh-tw": {
        loading: "載入中…",
        slide: ">>> 滑動以完成拼圖 >>>",
        curtain: "點擊上圖並沿路線滑至終點",
        curtain_knob: "滑動至此完成驗證",
        refresh: "更新驗證圖",
        help: "幫助",
        feedback: "回報問題",
        fail: ["驗證失敗:", "請將懸浮圖片拼合"],
        success: ["驗證通過:", "sec 秒的速度超過 score% 的用戶"],
        abuse: ["嘗試過多次:", "系統正在更新圖片"],
        forbidden: ["再來一次:", "小怪物吃掉了拼圖 count 秒後重試"],
        error: ["出現錯誤:", "請關閉驗證後重試"]
      },
      ja: {
        loading: "ロード中...",
        slide: ">>> スライドで認証完成 >>>",
        curtain: "ボタンを終点までドラックしてください",
        curtain_knob: "ここから認証を始めます",
        refresh: "更新します",
        help: "ヘルプ",
        feedback: "お問合せ",
        fail: ["認証失敗:", "スライドでパブルを合わせて下さい"],
        success: ["認証完成:", "sec 秒で、ユーザーの score% を超えます"],
        abuse: ["操作が多過ぎます:", "再生中です"],
        forbidden: ["もう一度:", "count 秒後に再操作してください"],
        error: ["エラーです:", "閉じてやり直して下さい"]
      },
      ko: {
        loading: "로드...",
        slide: ">>> 슬라이더를 드래그 >>>",
        curtain: "길을 따라 버튼을 드래그",
        curtain_knob: "확인하기 위해 여기로 이동",
        refresh: "새로 고침",
        help: "도움",
        feedback: "피드백",
        fail: ["실패:", "퍼즐을 완료하려면 슬라이더를 드래그"],
        success: ["성공:", "sec초는 검증을 완료 당신은 사람들의 score%를 이길"],
        abuse: ["자주 운영:", "새로 고침 이미지"],
        forbidden: ["다시 시도:", "괴물 퍼즐을 먹는다 count초 후 다시 시도"],
        error: ["오류:", "다시 시도하십시오"]
      },
      en: {
        loading: "loading...",
        slide: "Drag the button to verify",
        curtain: "Drag the button along the road",
        curtain_knob: "Move here to verify",
        refresh: "Refresh",
        help: "Support",
        feedback: "Feedback",
        fail: ["Fail:", "Drag the button to fill the image"],
        success: ["Success:", "Take secs and defeat score% users"],
        abuse: ["Excessive:", "Server is refreshing the image"],
        forbidden: ["Try Again:", "Wow~ Monster eats the image"],
        error: ["Server Error:", "Please try again later"]
      }
    };
    if ("string" != typeof a)return b["zh-cn"];
    a = a.toLowerCase();
    var c = a.indexOf("-"), d = c > -1 ? a.slice(0, c) : a;
    return "zh" === d && (d += a.indexOf("tw") > -1 || a.indexOf("hk") > -1 ? "-tw" : "-cn"), b[d] || b["zh-cn"]
  }, R = {};
  R.la = function sa (a, b, c) {
    var d, e = document.createElement("div");
    if (b = b || e.cloneNode(), "string" == typeof a)return void b.appendChild(document.createTextNode(a));
    for (d in a)if (a.hasOwnProperty(d)) {
      var f, g = d.split("."), h = "" === g[0] ? "div" : g[0], i = g[1];
      "input" === h ? (f = document.createElement(h), f.className = i, f.type = "hidden", f.name = i) : (f = document.createElement(h), f.className = i), b.appendChild(f), c(f, "." + i.split(" ")[0]), sa(a[d], f, c)
    }
    return b.childNodes ? b : null
  }, R.ma = function (a) {
    var b = Q(a);
    return {
      ".gt_widget": {
        ".gt_holder_top": {},
        ".gt_box_holder": {
          ".gt_box": {
            ".gt_loading": {},
            "a.gt_bg": {".gt_cut_bg": {}, ".gt_slice": {}},
            "a.gt_fullbg": {".gt_cut_fullbg": {}, ".gt_flash": {}, ".gt_ie_success": {}},
            "a.gt_curtain": {
              ".gt_curtain_bg_wrap": {".gt_curtain_bg": {".gt_cut_curtain": {}}},
              ".gt_curtain_button": {}
            },
            "a.gt_box_tips": {}
          }, ".gt_info": {".gt_info_tip": {".gt_info_icon": {}, ".gt_info_text": {}}}
        },
        ".gt_bottom": {
          "a.gt_refresh_button": {".gt_refresh_tips": b.refresh},
          "a.gt_help_button": {".gt_help_tips": b.help},
          "a.gt_logo_button": {}
        }
      },
      ".gt_input": {"input.geetest_challenge": {}, "input.geetest_validate": {}, "input.geetest_seccode": {}},
      ".gt_slider": {
        ".gt_guide_tip": b.slide,
        ".gt_slider_knob": {},
        ".gt_curtain_tip": b.curtain,
        ".gt_curtain_knob": b.curtain_knob,
        ".gt_ajax_tip": {}
      }
    }
  }, R.na = function (a, b) {
    return a.parentNode.insertBefore(b, a.nextSibling), b
  }, R.oa = function (a) {
    return "string" == typeof a ? 0 == a.indexOf("#") ? a = document.getElementById(a.replace("#", "")) : "querySelector"in document ? a = document.querySelector(a) : k(window.jQuery) && (a = window.jQuery(a)[0]) : a.length && (a = a[0]), a
  }, R.pa = function (a) {
    try {
      for (var b = a; a.parentNode != document.body && b.offsetTop - a.parentNode.offsetTop < 160;)a = a.parentNode, "hidden" == K(a, "overflow") && (a.style.overflow = "visible")
    } catch (c) {
    }
  }, R.qa = function (a) {
    for (var b = a.offsetLeft, c = a.offsetParent; null !== c;)b += c.offsetLeft, c = c.offsetParent;
    return b
  }, R.ra = function (a) {
    for (var b = a.offsetTop, c = a.offsetParent; null !== c;)b += c.offsetTop, c = c.offsetParent;
    return b
  }, R.sa = function (a, b) {
    a.style.top = R.ra(b) - 160 + "px", a.style.left = R.qa(b) + "px"
  }, R.C = function (a, b) {
    var c = this;
    a = R.oa(a), R.ta(c);
    var d = c.$;
    if ("gyroscope" === c.config.type)f("Gyro").g(c).T(c).W(c); else if (c.config.mobile) {
      var e = f("SVG");
      e.g(c), e.T(c), e.W(c)
    } else {
      if ("popup" !== c.config.product)c.dom = R.la(R.ma(c.config.lang), !1, d); else {
        var g = f("Popup");
        c.dom = R.la(g.ma(c.config.lang), !1, d)
      }
      if (R.ua(c, !0), R.va(c), R.wa(c), R.xa(c, !0), aa.ya(c), "curtain" === c.config.type) {
        var i = f("Curtain");
        i.ya(c)
      }
      d(".gt_flash").style.height = c.config.height - 22 + "px"
    }
    if (c.dom.style["touch-action"] = "none", c.dom.style["ms-touch-action"] = "none", la(c), c.dom.id = "geetest_" + c.id, c.config.mobile ? c.dom.className = "gt_mobile_holder " + c.config.product + " " + c.config.lang : c.dom.className = "gt_holder " + c.config.product + " " + c.config.lang, "float" != c.config.product || c.config.mobile || ga(c), "popup" != c.config.product || c.config.mobile)b ? R.na(a, c.dom) : a.appendChild(c.dom); else {
      document.body.appendChild(c.dom);
      var j = d(".gt_input");
      b ? R.na(a, j) : a.appendChild(j)
    }
    if ("gyroscope" === c.config.type && P.ka("scale", c.dom.clientWidth / 260, c.id), "float" === c.config.product && !c.config.mobile)if (c.config.sandbox) {
      var k = d(".gt_widget");
      c.dom.removeChild(k);
      var l = document.createElement("div");
      l.className = c.dom.className + " gt_clone", l.appendChild(k), document.getElementsByTagName("body")[0].appendChild(l), R.sa(l, c.dom), c.cloneDom = l
    } else setTimeout(function () {
      R.pa(c.dom)
    }, 2e3);
    P.ka("DOMReady", !0, c.id), h.fa("DOMReady", c.id)
  }, R.ua = function (a, b) {
    var c = a.$;
    if (S.za(c(".gt_curtain")), S.za(c(".gt_curtain_button")), S.za(c(".gt_curtain_tip")), S.za(c(".gt_curtain_knob")), "slide" == a.config.type)aa.Aa(a, b); else {
      var d = f("Curtain");
      aa.za(a, b), d.Aa(a, b)
    }
  }, R.wa = function (a) {
    var b = a.$, c = b(".gt_logo_button");
    a.config.logo ? (c.href = x.homepage, c.target = "_blank") : R.Ba(c, "no_logo"), a.config.clean && R.Ba(b(".gt_widget"), "clean");
    var d = b(".gt_help_button");
    d.href = x.feedback, d.target = "_blank"
  }, R.va = function (a) {
    var b = a.$(".gt_fullbg"), c = a.$(".gt_box_tips");
    a.config.link ? (b.href = c.href = a.config.link, b.target = c.target = "_blank") : (c.style.display = "none", b.removeAttribute("href"), b.style.cursor = "default")
  }, R.Ba = function (a, b) {
    if (a) {
      for (var c = b.split(" "), d = a.className.split(" "), e = 0, f = c.length; f > e; e++)-1 == m(c[e], d) && d.push(c[e]);
      a.className = d.join(" ")
    }
  }, R.Ca = function (a, c) {
    if (a) {
      "string" == typeof a && (a = b(a));
      for (var d, e = c.split(" "), f = a.className.split(" "), g = 0, h = e.length; h > g; g++)d = m(e[g], f), -1 != d && f.splice(d, 1);
      a.className = f.join(" ")
    }
  }, R.Da = function (a, b) {
    var c = a.className.split(" ");
    return -1 != m(b, c)
  }, R.Ea = function (a, b, c) {
    var d = function () {
      var d = new Date, e = u.ia(b), f = {}, g = !1, h = 0, i = function () {
        if (!(e > h))if (g)a.config.retry += 1, P.ka("status", "auto", a.id), a.refresh(); else {
          a.config.retry = 0;
          var b = G ? -2 : (new Date).getTime() - d.getTime();
          c(f, b)
        }
      };
      u.ha(b, function (b, c) {
        D(a, c.replace(".jpg", x.webp), function (a, c) {
          h += 1, g || (a ? "fullbg" !== b ? g = !0 : f[b] = !1 : !G && c.src && c.src.indexOf(".webp") > -1 && (!c.width || c.width < 10) ? (x.webp = ".jpg", g = !0) : f[b] = c), i()
        })
      })
    };
    x.webp ? d() : h.Y("WebPLoaded", d)
  }, R.xa = function (a, b) {
    var c = a.$, d = a.config.height;
    c(".gt_box_holder").style.height = d + "px", G && (c(".gt_cut_fullbg").style.height = d + "px", c(".gt_cut_bg").style.height = d + "px", c(".gt_curtain_bg_wrap").style.height = d + "px", c(".gt_curtain_bg").style.height = d + "px", c(".gt_cut_curtain").style.height = d + "px");
    var e = a.config.type;
    if ("slide" == e)R.Ea(a, {fullbg: a.config.fullbg, bg: a.config.bg, slice: a.config.slice}, function (d, e) {
      T.Fa(d.fullbg.src, d.bg.src, a, b), P.ka("imgload", e, a.id);
      var f = c(".gt_slice");
      G ? f.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + d.slice.src + '")' : (f.style.backgroundImage = "url(" + d.slice.src + ")", f.style.width = (d.slice.width || 60) + "px", f.style.height = (d.slice.height || 60) + "px"), f.style.left = a.config.xpos + "px", f.style.top = a.config.ypos + "px", setTimeout(function () {
        P.ka("status", "ready", a.id), oa.Aa("ready", a), h.fa("statusChange", a.id)
      }, 400)
    }); else {
      var f = 900;
      b && (f = 0), R.Ea(a, {fullbg: a.config.fullbg, bg: a.config.bg}, function (d, e) {
        var g = c(".gt_curtain_button");
        P.ka("imgload", e, a.id), g.style.top = a.config.ypos + "px", g.style.left = a.config.xpos + "px", T.Fa(d.fullbg.src, d.bg.src, a, b), setTimeout(function () {
          P.ka("status", "ready", a.id), oa.Aa("ready", a), h.fa("statusChange", a.id)
        }, f)
      })
    }
  }, N.prototype.appendTo = function (a, b) {
    return P.ga("loaded", this.id) ? R.C.call(this, a, b) : h.Y("loaded", function () {
      R.C.call(this, a, b)
    }, this.id), this
  }, R.ta = function (a) {
    var b = {};
    a.$ = function (a, c) {
      return a && c ? void(b[c] = a) : b[a]
    }
  };
  var S = function () {
    var a = R.Ba, b = R.Ca, c = function (c, d, e) {
      var f = function () {
        H && d ? (a(c, "gt_animate"), setTimeout(function () {
          a(c, "gt_hide")
        }), setTimeout(function () {
          b(c, "gt_show")
        }, 20), setTimeout(function () {
          b(c, "gt_animate")
        }, d)) : (b(c, "gt_show"), a(c, "gt_hide"))
      };
      return e ? setTimeout(f, e) : void f()
    }, d = function (c, d, e) {
      var f = function () {
        H && d ? (a(c, "gt_animate"), setTimeout(function () {
          b(c, "gt_hide")
        }), setTimeout(function () {
          a(c, "gt_show")
        }, 20), setTimeout(function () {
          b(c, "gt_animate")
        }, d + 20)) : (b(c, "gt_hide"), a(c, "gt_show"))
      };
      return e ? setTimeout(f, e) : void f()
    }, e = function (c, d, e, f, g) {
      var h = function () {
        H && d ? (a(c, "gt_animate"), "function" == typeof f && f(), "function" == typeof g && setTimeout(g, 0), setTimeout(function () {
          b(c, "gt_animate")
        }, d)) : "function" == typeof g && g()
      };
      return e ? setTimeout(h, e) : void h()
    };
    return {za: c, Aa: d, Ga: e}
  }(), T = function () {
    var a = function () {
      for (var a, b = "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_"), c = [], d = 0, e = 52; e > d; d++)a = 2 * parseInt(b[parseInt(d % 26 / 2)]) + d % 2, parseInt(d / 2) % 2 || (a += d % 2 ? -1 : 1), a += 26 > d ? 26 : 0, c.push(a);
      return c
    }, b = function (a) {
      var b = a(".gt_fullbg"), c = a(".gt_cut_fullbg"), d = a(".gt_bg"), e = a(".gt_cut_bg"), f = a(".gt_slice"), g = a(".gt_curtain");
      b.style.backgroundImage = "none", d.style.backgroundImage = "none", g.style.backgroundImage = "none", f.style.backgroundImage = "none", S.za(b), S.za(d), S.za(g), S.za(f), S.za(c), S.za(e)
    }, c = function (a, b) {
      var c = 300, d = 600;
      b && (c = d = 0);
      var e = a.$;
      S.Aa(e(".gt_fullbg"), c), "slide" == a.config.type ? (S.Aa(e(".gt_bg"), 0, c), S.Aa(e(".gt_slice"), 0, c)) : (S.Aa(e(".gt_curtain"), d), S.Aa(e(".gt_curtain_button"), d))
    }, d = function (b, c, d, e, f) {
      var g = c.split("/pictures/gt/")[1].split("/"), h = 8 !== g[0].length;
      if (!h)return void(d.style.backgroundImage = "url(" + c + ")");
      var i, j, k, l = [];
      if (P.ga(b + "Arr", f.id))for (l = P.ga(b + "Arr", f.id), i = 0, j = l.length; j > i; i++)l[i].style.backgroundImage = "url(" + c + ")"; else {
        P.ka(b + "Arr", l, f.id);
        var m, n = a(), o = document.createElement("div");
        for (o.className = "gt_cut_" + b + "_slice", i = 0, j = n.length; j > i; i++)k = "-" + (n[i] % 26 * 12 + 1) + "px " + (n[i] > 25 ? -f.config.height / 2 : 0) + "px", m = o.cloneNode(), m.style.backgroundImage = "url(" + c + ")", l.push(m), e.appendChild(m), m.style.backgroundPosition = k
      }
      S.Aa(f.$(".gt_cut_" + b))
    }, e = function (a, e, f, g) {
      var h = f.$;
      b(h), a && d("fullbg", a, h(".gt_fullbg"), h(".gt_cut_fullbg"), f), "slide" == f.config.type ? d("bg", e, h(".gt_bg"), h(".gt_cut_bg"), f) : d("curtain", e, h(".gt_curtain_bg"), h(".gt_cut_curtain"), f), setTimeout(function () {
        c(f, g)
      }, 100)
    }, f = function (b) {
      var c, d, e = {h: null, w: 11}, f = [], g = a(), h = 0, i = b / 2;
      e.h = i + 1;
      for (var j = 0, k = g.length; k > j; j++)c = g[j] % 26 * 12 + 1, d = g[j] > 25 ? i : 0, j > 25 && (h = i), f[j] = {}, f[j].cx = j % 26 * 10, f[j].cy = h, f[j].ix = -c + f[j].cx, f[j].iy = -d + h;
      return e.all = f, e
    }, g = function (b, c, d, e) {
      var f = document.createElement("canvas");
      f.width = b.width, f.height = d;
      var g = f.getContext("2d");
      g.drawImage(b, 0, 0);
      var h = c.getContext("2d");
      c.height = d, c.width = e;
      for (var i = d / 2, j = 10, k = a(), l = 0, m = k.length; m > l; l += 1) {
        var n = k[l] % 26 * 12 + 1, o = k[l] > 25 ? i : 0, p = g.getImageData(n, o, j, i);
        h.putImageData(p, l % 26 * 10, l > 25 ? i : 0)
      }
    };
    return {Fa: e, Ha: b, Ia: f, Ja: g}
  }(), U = "move", V = "down", W = "up", X = "scroll", Y = "blur", Z = "focus", $ = "unload", _ = {};
  _.evts = {
    down: ["mousedown", "touchstart", "pointerdown", "MSPointerDown"],
    move: ["mousemove", "touchmove", "pointermove", "MSPointerMove"],
    up: ["mouseup", "touchend", "pointerup", "MSPointerUp"],
    cancel: ["touchcancel"],
    scroll: [X],
    gyroscope: ["deviceorientation"],
    click: ["click"],
    blur: [Y],
    focus: [Z],
    unload: [$]
  }, _.aa = [], _.ga = function (a, b) {
    for (var c, d = 0, e = _.aa.length; e > d; d++)if (c = _.aa[d], c.dom == a && c.event == b)return c;
    return c = {
      dom: a, event: b, handlerList: [], Ka: function () {
      }
    }, _.aa.push(c), c
  }, _.La = function (a, b, c) {
    for (var d, e = _.evts[b], f = _.ga(a, b), g = 0, h = e.length; h > g; g++)f.handlerList.length && (d = f.Ka, window.addEventListener ? a.removeEventListener(e[g], d, !1) : window.attachEvent && a.detachEvent("on" + e[g], d)), window.addEventListener ? (f.handlerList.push(c), f.Ka = function (b) {
      for (var c = 0, d = f.handlerList.length; d > c; c++)f.handlerList[c](b).call(a)
    }, a.addEventListener(e[g], c, !1)) : window.attachEvent && a.attachEvent("on" + e[g], c)
  };
  var aa = {};
  aa.Aa = function (a) {
    var b = a.$;
    aa.Ga(0, a, !0), S.Aa(b(".gt_guide_tip"), 500), S.Aa(b(".gt_slider_knob"), 500)
  }, aa.za = function (a) {
    var b = a.$;
    S.za(b(".gt_bg"), 500), S.za(b(".gt_slider_knob"), 500), S.za(b(".gt_guide_tip"), 500), setTimeout(function () {
      aa.Ga(0, a, 0)
    }, 500)
  }, aa.Ka = function (a, b) {
    var c = this, d = c.$, e = d(".gt_slice"), f = d(".gt_slider_knob");
    if (b.type)return na.Aa("fail", c, 3e3), oa.Aa("lock", c), S.Aa(d(".gt_fullbg"), 300), void setTimeout(function () {
      ka(b, c)
    }, 500);
    if (a || "error" === b.message)na.Aa("error", c), oa.Aa("error", c), P.ka("status", "error", c.id), h.fa("error", c.id); else if (b.success) {
      var g = d(".gt_flash");
      P.ka("score", b.score, c.id), na.Aa("success", c), oa.Aa("success", c), H || S.Aa(d(".gt_ie_success")), S.Aa(g, 1500), S.za(g, 0, 1600), S.Aa(d(".gt_fullbg"), 1500), pa.Ma(b.validate, c), h.fa("success", c.id), setTimeout(function () {
        P.ka("status", "success", c.id), h.fa("statusChange", c.id)
      }, 400)
    } else"fail" == b.message ? (na.Aa("fail", c), oa.Aa("fail", c), S.za(e, 100), S.Aa(e, 100, 100), S.za(e, 100, 200), S.Aa(e, 100, 300), S.Ga(e, 400, 500, !1, function () {
      aa.Ga(0, c, !0)
    }), S.Ga(f, 400, 500), h.fa("fail", c.id), setTimeout(function () {
      P.ka("status", "ready", c.id), oa.Aa("ready", c), h.fa("statusChange", c.id), S.Aa(d(".gt_guide_tip"), 500)
    }, 1e3)) : "forbidden" == b.message ? (na.Aa("forbidden", c), oa.Aa("forbidden", c), h.fa("forbidden", c.id), setTimeout(function () {
      P.ka("status", "auto", c.id), c.refresh()
    }, 4e3)) : "abuse" == b.message && (na.Aa("abuse", c), oa.Aa("fail", c), h.fa("abuse", c.id), setTimeout(function () {
      P.ka("status", "auto", c.id), c.refresh()
    }, 1500))
  }, aa.Ga = function (a, b, c) {
    var d = b.$, e = d(".gt_slider_knob"), f = d(".gt_slice");
    a = 2 > a ? 2 : a > 198 ? 198 : a, c && (a = 0), e.style.left = a + "px", f.style.left = b.config.xpos + a + "px"
  }, aa.Na = function (a) {
    var b = a.$;
    return function (c) {
      var d = P.ga("status", a.id);
      if ("ready" == d && "slide" == a.config.type && 2 != c.button) {
        if (a.config.fullpage) {
          var e = f("Fullpage");
          e.$a(a), e.ab()
        }
        "pointerdown" !== c.type || P.ga("pointerdown", a.id) || P.ka("pointerdown", !0, a.id), P.ka("startTime", new Date, a.id), P.ka("status", "moving", a.id), h.fa("statusChange", a.id), c.preventDefault ? c.preventDefault() : c.returnValue = !1;
        var g = b(".gt_slider_knob");
        R.Ba(b(".gt_slice"), "moving"), R.Ba(g, "moving");
        var i = c.clientX || c.changedTouches && c.changedTouches[0].clientX, j = c.clientY || c.changedTouches && c.changedTouches[0].clientY, k = g.getBoundingClientRect();
        P.ka("startX", i, a.id), P.ka("startY", j, a.id), ma.g([Math.round(k.left - i), Math.round(k.top - j), 0], a.id), ma.Oa([0, 0, 0], a.id), S.za(b(".gt_fullbg"), 300), S.za(b(".gt_guide_tip"), 500)
      }
    }
  }, aa.Pa = function (a) {
    return function (b) {
      var c = P.ga("status", a.id);
      if ("moving" == c && "slide" == a.config.type && (!P.ga("pointerdown", a.id) || "pointermove" === b.type)) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1;
        var d = P.ga("startX", a.id), e = P.ga("startY", a.id), g = (b.changedTouches && b.changedTouches[0].clientX || b.clientX) - d, h = e - (b.changedTouches && b.changedTouches[0].clientY || b.clientY), i = parseInt(g);
        aa.Ga(i, a), ma.Oa([Math.round(g), Math.round(h), (new Date).getTime() - P.ga("startTime", a.id)], a.id), a.config.benchmark && f("Benchmark").X(a)
      }
    }
  }, aa.Qa = function (a) {
    var b = a.$;
    return function (c) {
      var d = P.ga("status", a.id);
      if ("moving" == d && "slide" == a.config.type && (!P.ga("pointerdown", a.id) || "pointerup" === c.type)) {
        if (a.config.fullpage) {
          var e = f("Fullpage");
          e.c()
        }
        d = P.ka("status", "lock", a.id), oa.Aa("lock", a), R.Ca(b(".gt_slice"), "moving"), R.Ca(b(".gt_slider_knob"), "moving");
        var g = P.ga("startX", a.id), h = P.ga("startY", a.id), i = (c.changedTouches && c.changedTouches[0].clientX || c.clientX) - g, k = h - (c.changedTouches && c.changedTouches[0].clientY || c.clientY), l = new Date;
        P.ka("endTime", l, a.id), ma.Oa([Math.round(i), Math.round(k), l.getTime() - P.ga("startTime", a.id)], a.id);
        var m = parseInt(i), n = ma.Ra(a.id);
        if (a.config.offline) {
          var o = f("Offline");
          return void aa.Ka.call(a, !1, o.ajax(m, P.ga("endTime", a.id).getTime() - P.ga("startTime", a.id), a))
        }
        var p = {
          gt: a.config.gt,
          challenge: a.config.challenge,
          userresponse: aa.Sa(m, a.config.challenge),
          passtime: P.ga("endTime", a.id).getTime() - P.ga("startTime", a.id),
          imgload: P.ga("imgload", a.id),
          a: n
        };
        if (a.config.benchmark) {
          var q = f("Benchmark").i(a);
          p.b1 = q.b1, p.b2 = q.b2
        }
        E(a.config.apiserver + "ajax.php?" + j(p), aa.Ka, a)
      }
    }
  }, aa.ya = function (a) {
    var b = a.$, c = b(".gt_slider_knob");
    _.La(c, V, aa.Na(a)), _.La(document, U, aa.Pa(a)), _.La(document, W, aa.Qa(a))
  }, aa.Sa = function (a, b) {
    for (var c = b.slice(32), d = [], e = 0; e < c.length; e++) {
      var f = c.charCodeAt(e);
      d[e] = f > 57 ? f - 87 : f - 48
    }
    c = 36 * d[0] + d[1];
    var g = Math.round(a) + c;
    b = b.slice(0, 32);
    var h, i = [[], [], [], [], []], j = {}, k = 0;
    e = 0;
    for (var l = b.length; l > e; e++)h = b.charAt(e), j[h] || (j[h] = 1, i[k].push(h), k++, k = 5 == k ? 0 : k);
    for (var m, n = g, o = 4, p = "", q = [1, 2, 5, 10, 50]; n > 0;)n - q[o] >= 0 ? (m = parseInt(Math.random() * i[o].length, 10), p += i[o][m], n -= q[o]) : (i.splice(o, 1), q.splice(o, 1), o -= 1);
    return p
  };
  var ba = function (a) {
    return function () {
      ca(a)
    }
  }, ca = function (a) {
    for (var b = a.config.show_delay, c = a.config.hide_delay, d = P.ga("status", a.id), e = "ready" == d || "success" == d || "error" == d, g = P.ga("in", a.id), h = a.$(".gt_widget"), i = P.ga("hideDelay", a.id) || [], j = 0, k = i.length; k > j; j++)clearTimeout(i[j]);
    i = [];
    var l;
    if (e && !g) {
      if (R.Da(h, "gt_hide"))return;
      if ("curtain" == a.config.type) {
        var m = f("Curtain");
        l = m.setFloat(!1, a, c), i = i.concat(l)
      }
      i.push(S.za(h, 400, c)), P.ka("hideDelay", i, a.id)
    } else {
      if (R.Da(h, "gt_show"))return;
      if (b = e ? b : 0, "curtain" == a.config.type) {
        var m = f("Curtain");
        l = m.setFloat(!0, a, b), i = i.concat(l)
      }
      i.push(S.Aa(h, 400, b)), P.ka("hideDelay", i, a.id)
    }
  }, da = function (a, b) {
    if (!a || null == a || "undefined" == typeof a)return !1;
    if (b.compareDocumentPosition) {
      var c = b.compareDocumentPosition(a);
      return !(20 !== c && 0 !== c)
    }
    if (b.contains)return b.contains(a);
    for (; a != b && a;)a = a.parentNode;
    return !!a
  }, ea = function (a) {
    return function (b) {
      fa(b, a)
    }
  }, fa = function (a, b) {
    var c = a.target || a.srcElement, d = P.ga("in", b.id), e = da(c, b.dom);
    b.config.sandbox && !e && (e = da(c, b.cloneDom)), d != e && (b.config.sandbox && R.sa(b.cloneDom, b.dom), P.ka("in", e, b.id), h.fa("hoverChange", b.id))
  }, ga = function (a) {
    var b = a.$;
    P.ka("in", !1, a.id), S.za(b(".gt_widget")), _.La(document, "move", ea(a)), _.La(document, "up", ea(a)), h.ca("statusChange", ba(a), a.id), h.ca("hoverChange", ba(a), a.id)
  }, ha = {};
  ha.ma = function (a, b) {
    return a = a || x.lang, {
      ".gt_mask": {},
      ".gt_popup_wrap": {
        ".gt_popup_header": {
          ".gt_popup_ready": "请先完成下方验证",
          ".gt_popup_finish": "页面将在2秒后跳转",
          ".gt_popup_cross": {}
        }, ".gt_popup_box": b ? b.ma(a) : R.ma(a)
      }
    }
  }, ha.Aa = function (a) {
    var b = a.$;
    S.Aa(a.dom, 400), "success" == P.ga("status", a.id) && a.refresh(), S.za(b(".gt_popup_finish")), S.Aa(b(".gt_popup_ready"))
  }, ha.za = function (a) {
    S.za(a.dom, 400)
  }, ha.bindOn = function (a) {
    var b = this, c = b.$;
    if (b.config.mobile)return b;
    if (!P.ga("DOMReady", b.id))return void h.Y("DOMReady", function () {
      ha.bindOn.call(b, a)
    }, b.id);
    if ("popup" === b.config.product) {
      var d = P.ga("enablePopup", b.id);
      void 0 == d && P.ka("enablePopup", !0, b.id);
      var e = R.oa(a);
      if (!e)return void setTimeout(function () {
        ha.bindOn.call(b, a)
      }, 100);
      P.ka("popup_btn", e, b.id);
      var f = e.cloneNode(!0);
      _.La(f, "click", function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        var c = P.ga("enablePopup", b.id);
        c && ha.Aa(b)
      }), _.La(c(".gt_mask"), "click", function () {
        ha.za(b)
      }), _.La(c(".gt_popup_cross"), "click", function () {
        ha.za(b)
      });
      try {
        f.href = "javascript:;"
      } catch (g) {
      }
      f.id = e.id, e.style.display = "none", e.id = "origin_" + e.id, R.na(e, f), h.ca("success", function () {
        S.Aa(c(".gt_popup_finish")), S.za(c(".gt_popup_ready")), setTimeout(function () {
          ha.za(b), e.click()
        }, 1e3)
      }, b.id)
    }
  }, N.prototype.bindOn = function (a) {
    return P.ga("loaded", this.id) ? ha.bindOn.call(this, a) : h.Y("loaded", function () {
      ha.bindOn.call(this, a)
    }, this.id), this
  }, N.prototype.enable = function () {
    P.ka("enablePopup", !0, this.id)
  }, N.prototype.disable = function () {
    P.ka("enablePopup", !1, this.id)
  };
  var ia = function (a) {
    return function () {
      ja(a)
    }
  }, ja = function (a) {
    if (a.config.retry > 3)return void t("can not loaded imgs");
    var b = P.ga("status", a.id);
    if ("ready" === b || "success" === b || "auto" === b) {
      if (h.fa("statusChange", a.id), P.ka("status", "lock", a.id), pa.Ha(a), a.config.mobile) {
        var c = f("SVG");
        c.T(a, !0)
      } else if ("gyroscope" === a.config.type) {
        var d = f("Gyro");
        d.T(a)
      } else {
        var e = a.$;
        T.Ha(a.$), S.za(e(".gt_ie_success")), oa.Aa("lock", a)
      }
      if (a.config.offline) {
        var g = f("Offline");
        return void ka(g.g(a), a)
      }
      E(a.config.apiserver + "refresh.php?" + j({challenge: a.config.challenge, gt: a.config.gt}), function (b, c) {
        b && (c = {}), ka(c, a)
      }, a)
    }
  }, ka = function (a, b) {
    if (h.fa("refresh", b.id), v ? (a = i(b.config.debug, a), b.config = z(a, b)) : y(b.config, a), b.config.mobile) {
      var c = f("SVG");
      c.W(b)
    } else"gyroscope" === b.config.type ? f("Gyro").W(b) : (R.ua(b), R.va(b), R.xa(b));
    clearTimeout(P.ga("autoRefresh", b.id)), P.ka("autoRefresh", setTimeout(function () {
      b.refresh()
    }, 54e4), b.id)
  };
  N.prototype.refresh = function () {
    ja(this)
  };
  var la = function (a) {
    if (a.config.mobile) {
      var b = P.ga("eles", a.id);
      _.La(b.refresh, "click", ia(a))
    } else _.La(a.$(".gt_refresh_button"), "click", ia(a));
    P.ka("autoRefresh", setTimeout(function () {
      a.refresh()
    }, 54e4), a.id), h.ca("success", function () {
      clearTimeout(P.ga("autoRefresh", a.id))
    }, a.id)
  }, ma = function () {
    var a = function (a, b) {
      P.ka("arr", [a], b)
    }, b = function (a, b) {
      P.ga("arr", b).push(a)
    }, c = function (a) {
      for (var b = [], c = 0, d = a.length - 1; d > c; c++) {
        var e = [];
        e[0] = Math.round(a[c + 1][0] - a[c][0]), e[1] = Math.round(a[c + 1][1] - a[c][1]), e[2] = Math.round(a[c + 1][2] - a[c][2]), 0 === e[0] && 0 === e[1] && 0 === e[2] || b.push(e)
      }
      return b
    }, d = function (a) {
      var b = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr", c = b.length, d = "", e = Math.abs(a), f = parseInt(e / c);
      f >= c && (f = c - 1), f && (d = b.charAt(f)), e %= c;
      var g = "";
      return 0 > a && (g += "!"), d && (g += "$"), g + d + b.charAt(e)
    }, e = function (a) {
      for (var b = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]], c = "stuvwxyz~", d = 0, e = b.length; e > d; d++)if (a[0] == b[d][0] && a[1] == b[d][1])return c[d];
      return 0
    }, f = function (a) {
      for (var b, f = c(P.ga("arr", a)), g = [], h = [], i = [], j = 0, k = f.length; k > j; j++)b = e(f[j]), b ? h.push(b) : (g.push(d(f[j][0])), h.push(d(f[j][1]))), i.push(d(f[j][2]));
      return g.join("") + "!!" + h.join("") + "!!" + i.join("")
    };
    return {Ra: f, Oa: b, g: a}
  }(), na = {};
  na.Fa = function (a, b, c, d) {
    var e = i(Q(c)[b]);
    if (d)for (var f in d)d.hasOwnProperty(f) && (e[1] = e[1].replace(f, d[f]));
    var g = document.createElement("span");
    g.className = "gt_info_type", o(g, e[0]);
    var h = document.createElement("span");
    h.className = "gt_info_content", o(h, e[1]), o(a, ""), a.appendChild(g), a.appendChild(h)
  }, na.Aa = function (a, b, c) {
    var d = b.$;
    "undefined" == typeof c && (c = 2e3);
    var e = d(".gt_info"), f = d(".gt_info_tip");
    f.className = "gt_info_tip " + a;
    var g = P.ga("infoHide", b.id);
    g && clearTimeout(g);
    var h, i = 3, j = function () {
      na.Fa(k, a, b.config.lang, {count: i}), i--, -1 == i && clearInterval(h)
    }, k = d(".gt_info_text"), l = {};
    if ("success" == a) {
      var m = (P.ga("endTime", b.id).getTime() - P.ga("startTime", b.id)) / 1e3;
      l.sec = m.toFixed(1), l.score = 100 - P.ga("score", b.id)
    } else"forbidden" == a && (j(), h = setInterval(j, 1e3), c = 4e3);
    "forbidden" != a && na.Fa(k, a, b.config.lang, l), S.Aa(e, 200), c && P.ka("infoHide", S.za(e, 300, c), b.id)
  };
  var oa = {};
  oa.Aa = function (a, b) {
    var c = b.$;
    c(".gt_ajax_tip").className = "gt_ajax_tip " + a;
  };
  var pa = {};
  pa.Ta = function (a, b) {
    var c = b.$, d = a ? b.config.challenge : "", e = a ? a.split("|")[0] : "", f = a ? a.split("|")[0] + "|jordan" : "";
    P.ka("geetest_challenge", d, b.id), P.ka("geetest_validate", e, b.id), P.ka("geetest_seccode", f, b.id), c(".geetest_challenge").value = d, c(".geetest_validate").value = e, c(".geetest_seccode").value = f
  }, pa.Ma = function (a, b) {
    pa.Ta(a, b)
  }, pa.Ha = function (a) {
    pa.Ta(!1, a)
  }, N.prototype.getValidate = function () {
    var a = {
      geetest_challenge: P.ga("geetest_challenge", this.id),
      geetest_validate: P.ga("geetest_validate", this.id),
      geetest_seccode: P.ga("geetest_seccode", this.id)
    };
    return a.geetest_challenge ? a : !1
  };
  var qa = {};
  qa.onStatusChange = function (a, b) {
    var c = P.ga("onStatusChange", b.id);
    "function" == typeof c && c.call(b, a);
    var d = "Success" == a ? 1 : 0;
    "function" == typeof window.gt_custom_ajax && (b.config.mobile ? window.gt_custom_ajax(d, b.dom.id, a) : window.gt_custom_ajax(d, b.$, a))
  }, qa.onSuccess = function () {
    var a = this, b = P.ga("onSuccess", a.id);
    "function" == typeof b && b.call(a), qa.onStatusChange("Success", a)
  }, qa.onRefresh = function () {
    var a = this, b = P.ga("onRefresh", a.id);
    "function" == typeof b && b.call(a), "function" == typeof window.gt_custom_refresh && window.gt_custom_refresh(a.$)
  }, qa.onFail = function () {
    var a = P.ga("onFail", this.id);
    "function" == typeof a && a.call(this), qa.onStatusChange("Fail", this)
  }, qa.onForbidden = function () {
    qa.onStatusChange("Forbidden", this)
  }, qa.onAbuse = function () {
    qa.onStatusChange("Abuse", this)
  }, qa.onError = function (a) {
    var b = this;
    a || (b.config.mobile ? h.fa("CanvasError", b.id) : (P.ka("status", "error", b.id), oa.Aa("error", b), na.Aa("error", b, !1)), clearTimeout(P.ga("autoRefresh", b.id)));
    var c = P.ga("onError", b.id);
    "function" == typeof c && c.call(b), "function" == typeof window.gt_custom_error && window.gt_custom_error(b, b.$)
  }, qa.onReady = function () {
    var a = P.ga("onReady", this.id);
    "function" == typeof a && a.call(this), "function" == typeof window.onGeetestLoaded && window.onGeetestLoaded(this)
  }, N.prototype.onSuccess = function (a) {
    return P.ka("onSuccess", a, this.id), this
  }, N.prototype.onFail = function (a) {
    return P.ka("onFail", a, this.id), this
  }, N.prototype.onRefresh = function (a) {
    return P.ka("onRefresh", a, this.id), this
  }, N.prototype.onError = function (a) {
    return P.ka("onError", a, this.id), this
  }, N.prototype.onStatusChange = function (a) {
    return P.ka("onStatusChange", a, this.id), this
  }, N.prototype.onReady = function (a) {
    return P.ka("onReady", a, this.id), this
  }, N.prototype.getPasstime = function () {
    return P.ga("endTime", this.id) - P.ga("startTime", this.id)
  }, N.prototype.hideRefresh = function () {
    var a = this;
    if (!P.ga("DOMReady", a.id))return h.Y("DOMReady", function () {
      a.hideRefresh()
    }, a.id), this;
    if (a.config.mobile) {
      var b = P.ga("eles", a.id);
      b.refresh.parentNode.removeChild(b.refresh), b.refresh = {style: {}}
    } else {
      var c = this.$ && this.$(".gt_refresh_button");
      if (!c)return;
      c.style.width = "0";
      try {
        c.style.setProperty("margin-left", "0", "important")
      } catch (d) {
      }
    }
  };
  var ra = function (a, b) {
    P.ka("scale", b / 260, a.id);
    var c = P.ga("eles", a.id);
    "gyroscope" === a.config.type ? a.dom.style.width = b + "px" : (c.svg.style.width = b + "px", c.svg.style.height = Math.ceil(b * (a.config.height + P.ga("panelHeight", a.id)) / 260) + "px")
  };
  return N.prototype.zoom = function (a) {
    var b = this;
    if (!P.ga("DOMReady", b.id))return h.Y("DOMReady", function () {
      b.zoom(a)
    }, b.id), this;
    if (!b.config.mobile && "gyroscope" !== b.config.type)return this;
    if ("string" == typeof a && a.indexOf("%") > -1) {
      var c = getComputedStyle ? getComputedStyle(b.dom.parentNode).width : b.dom.parentNode.currentStyle.width;
      a = parseInt(a) * parseInt(c) / 100
    }
    return ra(b, parseInt(a)), this
  }, N.define = function (a, b, c) {
    d.Z(a, b, c)
  }, d.Z("Event", function () {
    return h
  }), d.Z("Animate", function () {
    return S
  }), d.Z("Browser", function () {
    return {getCSS3: J}
  }), d.Z("Request", function () {
    return E
  }), d.Z("Data", function () {
    return P
  }), d.Z("Decoder", function () {
    return T
  }), d.Z("Dom", function () {
    return R
  }), d.Z("DomEvent", function () {
    return _
  }), d.Z("Info", function () {
    return na
  }), d.Z("Input", function () {
    return pa
  }), d.Z("getLang", function () {
    return Q
  }), d.Z("Popup", function () {
    return ha
  }), d.Z("Slide", function () {
    return aa
  }), d.Z("Tip", function () {
    return oa
  }), d.Z("Tool", function () {
    return {
      copy: i,
      toParam: j,
      isFunction: k,
      random: l,
      inArray: m,
      removeProperty: n,
      setText: o,
      slice: p,
      arrayEqual: q,
      diff: r,
      isArray: s,
      getResource: D,
      log: t
    }
  }), d.Z("Analyse", function () {
    return ma
  }), d.Z("Global", function () {
    return x
  }), d.Z("Flow", function () {
    return c
  }), d.Z("Modules", function () {
    return e
  }), d.Z("Flow", function () {
    return c
  }), d.Z("getModule", function () {
    return f
  }), d.Z("Utility", function () {
    return u
  }), N
});