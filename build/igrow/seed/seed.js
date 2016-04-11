/**
 * Copyright © seed.js collect something beautiful 
 * IGrow will grow as time flys
 */
 ;(function(root, factory) {
    if(!window.console){
        window.console = {
            log:function(){},
            warn:function(){}
        }
    }

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.IGrow = factory();
    }
}(this, function(root, undefined) {
    "use strict";
    // like jQuery example:Dom7('.class')
    var Dom7 = function() {
        var e = function(e) {
            var a = this,
            t = 0;
            for (t = 0; t < e.length; t++) a[t] = e[t];
            return a.length = e.length,
            this
        },
        a = function(a, t) {
            var n = [],
            r = 0;
            if (a && !t && a instanceof e) return a;
            if (a) if ("string" == typeof a) {
                var i, o, s = a.trim();
                if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === s.indexOf("<li") && (l = "ul"), 0 === s.indexOf("<tr") && (l = "tbody"), (0 === s.indexOf("<td") || 0 === s.indexOf("<th")) && (l = "tr"), 0 === s.indexOf("<tbody") && (l = "table"), 0 === s.indexOf("<option") && (l = "select"), o = document.createElement(l), o.innerHTML = a, r = 0; r < o.childNodes.length; r++) n.push(o.childNodes[r])
                } else for (i = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], r = 0; r < i.length; r++) i[r] && n.push(i[r])
            } else if (a.nodeType || a === window || a === document) n.push(a);
            else if (a.length > 0 && a[0].nodeType) for (r = 0; r < a.length; r++) n.push(a[r]);
            return new e(n)
        };
        e.prototype = {
            addClass: function(e) {
                if ("undefined" == typeof e) return this;
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var n = 0; n < this.length; n++)"undefined" != typeof this[n].classList && this[n].classList.add(a[t]);
                return this
            },
            removeClass: function(e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var n = 0; n < this.length; n++)"undefined" != typeof this[n].classList && this[n].classList.remove(a[t]);
                return this
            },
            hasClass: function(e) {
                return this[0] ? this[0].classList.contains(e) : !1
            },
            toggleClass: function(e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var n = 0; n < this.length; n++)"undefined" != typeof this[n].classList && this[n].classList.toggle(a[t]);
                return this
            },
            attr: function(e, a) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++) if (2 === arguments.length) this[t].setAttribute(e, a);
                else for (var n in e) this[t][n] = e[n],
                this[t].setAttribute(n, e[n]);
                return this
            },
            removeAttr: function(e) {
                for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                return this
            },
            prop: function(e, a) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0][e] : void 0;
                for (var t = 0; t < this.length; t++) if (2 === arguments.length) this[t][e] = a;
                else for (var n in e) this[t][n] = e[n];
                return this
            },
            data: function(e, a) {
                if ("undefined" == typeof a) {
                    if (this[0]) {
                        var t = this[0].getAttribute("data-" + e);
                        return t ? t: this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                    }
                    return void 0
                }
                for (var n = 0; n < this.length; n++) {
                    var r = this[n];
                    r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}),
                    r.dom7ElementDataStorage[e] = a
                }
                return this
            },
            dataset: function() {
                var e = this[0];
                if (e) {
                    var t = {};
                    if (e.dataset) for (var n in e.dataset) t[n] = e.dataset[n];
                    else for (var r = 0; r < e.attributes.length; r++) {
                        var i = e.attributes[r];
                        i.name.indexOf("data-") >= 0 && (t[a.toCamelCase(i.name.split("data-")[1])] = i.value)
                    }
                    for (var o in t)"false" === t[o] ? t[o] = !1 : "true" === t[o] ? t[o] = !0 : parseFloat(t[o]) === 1 * t[o] && (t[o] = 1 * t[o]);
                    return t
                }
                return void 0
            },
            val: function(e) {
                if ("undefined" == typeof e) return this[0] ? this[0].value: void 0;
                for (var a = 0; a < this.length; a++) this[a].value = e;
                return this
            },
            transform: function(e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                }
                return this
            },
            transition: function(e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                }
                return this
            },
            on: function(e, t, n, r) {
                function i(e) {
                    var r = e.target;
                    if (a(r).is(t)) n.call(r, e);
                    else for (var i = a(r).parents(), o = 0; o < i.length; o++) a(i[o]).is(t) && n.call(i[o], e)
                }
                var o, s, l = e.split(" ");
                for (o = 0; o < this.length; o++) if ("function" == typeof t || t === !1) for ("function" == typeof t && (n = arguments[1], r = arguments[2] || !1), s = 0; s < l.length; s++) this[o].addEventListener(l[s], n, r);
                else for (s = 0; s < l.length; s++) this[o].dom7LiveListeners || (this[o].dom7LiveListeners = []),
                this[o].dom7LiveListeners.push({
                    listener: n,
                    liveListener: i
                }),
                this[o].addEventListener(l[s], i, r);
                return this
            },
            off: function(e, a, t, n) {
                for (var r = e.split(" "), i = 0; i < r.length; i++) for (var o = 0; o < this.length; o++) if ("function" == typeof a || a === !1)"function" == typeof a && (t = arguments[1], n = arguments[2] || !1),
                this[o].removeEventListener(r[i], t, n);
                else if (this[o].dom7LiveListeners) for (var s = 0; s < this[o].dom7LiveListeners.length; s++) this[o].dom7LiveListeners[s].listener === t && this[o].removeEventListener(r[i], this[o].dom7LiveListeners[s].liveListener, n);
                return this
            },
            once: function(e, a, t, n) {
                function r(o) {
                    t(o),
                    i.off(e, a, r, n)
                }
                var i = this;
                "function" == typeof a && (a = !1, t = arguments[1], n = arguments[2]),
                i.on(e, a, r, n)
            },
            trigger: function(e, a) {
                for (var t = 0; t < this.length; t++) {
                    var n;
                    try {
                        n = new CustomEvent(e, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch(r) {
                        n = document.createEvent("Event"),
                        n.initEvent(e, !0, !0),
                        n.detail = a
                    }
                    this[t].dispatchEvent(n)
                }
                return this
            },
            transitionEnd: function(e) {
                function a(i) {
                    if (i.target === this) for (e.call(this, i), t = 0; t < n.length; t++) r.off(n[t], a)
                }
                var t, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                r = this;
                if (e) for (t = 0; t < n.length; t++) r.on(n[t], a);
                return this
            },
            animationEnd: function(e) {
                function a(i) {
                    for (e(i), t = 0; t < n.length; t++) r.off(n[t], a)
                }
                var t, n = ["webkitAnimationEnd", "OAnimationEnd", "MSAnimationEnd", "animationend"],
                r = this;
                if (e) for (t = 0; t < n.length; t++) r.on(n[t], a);
                return this
            },
            width: function() {
                return this[0] === window ? window.innerWidth: this.length > 0 ? parseFloat(this.css("width")) : null
            },
            outerWidth: function(e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth: null
            },
            height: function() {
                return this[0] === window ? window.innerHeight: this.length > 0 ? parseFloat(this.css("height")) : null
            },
            outerHeight: function(e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight: null
            },
            offset: function() {
                if (this.length > 0) {
                    var e = this[0],
                    a = e.getBoundingClientRect(),
                    t = document.body,
                    n = e.clientTop || t.clientTop || 0,
                    r = e.clientLeft || t.clientLeft || 0,
                    i = window.pageYOffset || e.scrollTop,
                    o = window.pageXOffset || e.scrollLeft;
                    return {
                        top: a.top + i - n,
                        left: a.left + o - r
                    }
                }
                return null
            },
            hide: function() {
                for (var e = 0; e < this.length; e++) this[e].style.display = "none";
                return this
            },
            show: function() {
                for (var e = 0; e < this.length; e++) this[e].style.display = "block";
                return this
            },
            css: function(e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++) for (var n in e) this[t].style[n] = e[n];
                        return this
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++) this[t].style[e] = a;
                    return this
                }
                return this
            },
            each: function(e) {
                for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                return this
            },
            html: function(e) {
                if ("undefined" == typeof e) return this[0] ? this[0].innerHTML: void 0;
                for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                return this
            },
            text: function(e) {
                if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;
                for (var a = 0; a < this.length; a++) this[a].textContent = e
            },
            is: function(t) {
                if (!this[0] || "undefined" == typeof t) return ! 1;
                var n, r;
                if ("string" == typeof t) {
                    var i = this[0];
                    if (i === document) return t === document;
                    if (i === window) return t === window;
                    if (i.matches) return i.matches(t);
                    if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                    if (i.mozMatchesSelector) return i.mozMatchesSelector(t);
                    if (i.msMatchesSelector) return i.msMatchesSelector(t);
                    for (n = a(t), r = 0; r < n.length; r++) if (n[r] === this[0]) return ! 0;
                    return ! 1
                }
                if (t === document) return this[0] === document;
                if (t === window) return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (n = t.nodeType ? [t] : t, r = 0; r < n.length; r++) if (n[r] === this[0]) return ! 0;
                    return ! 1
                }
                return ! 1
            },
            indexOf: function(e) {
                for (var a = 0; a < this.length; a++) if (this[a] === e) return a
            },
            index: function() {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                    return a
                }
                return void 0
            },
            eq: function(a) {
                if ("undefined" == typeof a) return this;
                var t, n = this.length;
                return a > n - 1 ? new e([]) : 0 > a ? (t = n + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
            },
            append: function(a) {
                var t, n;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var r = document.createElement("div");
                    for (r.innerHTML = a; r.firstChild;) this[t].appendChild(r.firstChild)
                } else if (a instanceof e) for (n = 0; n < a.length; n++) this[t].appendChild(a[n]);
                else this[t].appendChild(a);
                return this
            },
            prepend: function(a) {
                var t, n;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var r = document.createElement("div");
                    for (r.innerHTML = a, n = r.childNodes.length - 1; n >= 0; n--) this[t].insertBefore(r.childNodes[n], this[t].childNodes[0])
                } else if (a instanceof e) for (n = 0; n < a.length; n++) this[t].insertBefore(a[n], this[t].childNodes[0]);
                else this[t].insertBefore(a, this[t].childNodes[0]);
                return this
            },
            insertBefore: function(e) {
                for (var t = a(e), n = 0; n < this.length; n++) if (1 === t.length) t[0].parentNode.insertBefore(this[n], t[0]);
                else if (t.length > 1) for (var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[n].cloneNode(!0), t[r])
            },
            insertAfter: function(e) {
                for (var t = a(e), n = 0; n < this.length; n++) if (1 === t.length) t[0].parentNode.insertBefore(this[n], t[0].nextSibling);
                else if (t.length > 1) for (var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[n].cloneNode(!0), t[r].nextSibling)
            },
            next: function(t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            },
            nextAll: function(t) {
                var n = [],
                r = this[0];
                if (!r) return new e([]);
                for (; r.nextElementSibling;) {
                    var i = r.nextElementSibling;
                    t ? a(i).is(t) && n.push(i) : n.push(i),
                    r = i
                }
                return new e(n)
            },
            prev: function(t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            },
            prevAll: function(t) {
                var n = [],
                r = this[0];
                if (!r) return new e([]);
                for (; r.previousElementSibling;) {
                    var i = r.previousElementSibling;
                    t ? a(i).is(t) && n.push(i) : n.push(i),
                    r = i
                }
                return new e(n)
            },
            parent: function(e) {
                for (var t = [], n = 0; n < this.length; n++) e ? a(this[n].parentNode).is(e) && t.push(this[n].parentNode) : t.push(this[n].parentNode);
                return a(a.unique(t))
            },
            parents: function(e) {
                for (var t = [], n = 0; n < this.length; n++) for (var r = this[n].parentNode; r;) e ? a(r).is(e) && t.push(r) : t.push(r),
                r = r.parentNode;
                return a(a.unique(t))
            },
            find: function(a) {
                for (var t = [], n = 0; n < this.length; n++) for (var r = this[n].querySelectorAll(a), i = 0; i < r.length; i++) t.push(r[i]);
                return new e(t)
            },
            children: function(t) {
                for (var n = [], r = 0; r < this.length; r++) for (var i = this[r].childNodes, o = 0; o < i.length; o++) t ? 1 === i[o].nodeType && a(i[o]).is(t) && n.push(i[o]) : 1 === i[o].nodeType && n.push(i[o]);
                return new e(a.unique(n))
            },
            remove: function() {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            },
            detach: function() {
                return this.remove()
            },
            add: function() {
                var e, t, n = this;
                for (e = 0; e < arguments.length; e++) {
                    var r = a(arguments[e]);
                    for (t = 0; t < r.length; t++) n[n.length] = r[t],
                    n.length++
                }
                return n
            }
        },
        function() {
            function t(t) {
                e.prototype[t] = function(e) {
                    var n;
                    if ("undefined" == typeof e) {
                        for (n = 0; n < this.length; n++) r.indexOf(t) < 0 && (t in this[n] ? this[n][t]() : a(this[n]).trigger(t));
                        return this
                    }
                    return this.on(t, e)
                }
            }
            for (var n = "click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll".split(" "), r = "resize scroll".split(" "), i = 0; i < n.length; i++) t(n[i])
        } ();
        var t = {};
        a.ajaxSetup = function(e) {
            e.type && (e.method = e.type),
            a.each(e,
            function(e, a) {
                t[e] = a
            })
        };
        var n = 0;
        return a.ajax = function(e) {
            function r(n, r, i) {
                var o = arguments;
                n && a(document).trigger(n, r),
                i && (i in t && t[i](o[3], o[4], o[5], o[6]), e[i] && e[i](o[3], o[4], o[5], o[6]))
            }
            var i = {
                method: "GET",
                data: !1,
                async: !0,
                cache: !0,
                user: "",
                password: "",
                headers: {},
                xhrFields: {},
                statusCode: {},
                processData: !0,
                dataType: "text",
                contentType: "application/x-www-form-urlencoded",
                timeout: 0
            },
            o = ["beforeSend", "error", "complete", "success", "statusCode"];
            e.type && (e.method = e.type),
            a.each(t,
            function(e, a) {
                o.indexOf(e) < 0 && (i[e] = a)
            }),
            a.each(i,
            function(a, t) {
                a in e || (e[a] = t)
            }),
            e.url || (e.url = window.location.toString());
            var s = e.url.indexOf("?") >= 0 ? "&": "?",
            l = e.method.toUpperCase();
            if (("GET" === l || "HEAD" === l) && e.data) {
                var p;
                p = "string" == typeof e.data ? e.data.indexOf("?") >= 0 ? e.data.split("?")[1] : e.data: a.serializeObject(e.data),
                e.url += s + p
            }
            if ("json" === e.dataType && e.url.indexOf("callback=") >= 0) {
                var d, c = "f7jsonp_" + Date.now() + n++,
                u = e.url.split("callback="),
                f = u[0] + "callback=" + c;
                if (u[1].indexOf("&") >= 0) {
                    var m = u[1].split("&").filter(function(e) {
                        return e.indexOf("=") > 0
                    }).join("&");
                    m.length > 0 && (f += "&" + m)
                }
                var h = document.createElement("script");
                return h.type = "text/javascript",
                h.onerror = function() {
                    clearTimeout(d),
                    r(void 0, void 0, "error", null, "scripterror")
                },
                h.src = f,
                window[c] = function(e) {
                    clearTimeout(d),
                    r(void 0, void 0, "success", e),
                    h.parentNode.removeChild(h),
                    h = null,
                    delete window[c]
                },
                document.querySelector("head").appendChild(h),
                void(e.timeout > 0 && (d = setTimeout(function() {
                    h.parentNode.removeChild(h),
                    h = null,
                    r(void 0, void 0, "error", null, "timeout")
                },
                e.timeout)))
            } ("GET" === l || "HEAD" === l) && e.cache === !1 && (e.url += s + "_nocache=" + Date.now());
            var g = new XMLHttpRequest;
            g.requestUrl = e.url,
            g.open(l, e.url, e.async, e.user, e.password);
            var v = null;
            if (("POST" === l || "PUT" === l) && e.data) if (e.processData) {
                var w = [ArrayBuffer, Blob, Document, FormData];
                if (w.indexOf(e.data.constructor) >= 0) v = e.data;
                else {
                    var b = "---------------------------" + Date.now().toString(16);
                    "multipart/form-data" === e.contentType ? g.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + b) : g.setRequestHeader("Content-Type", e.contentType),
                    v = "";
                    var C = a.serializeObject(e.data);
                    if ("multipart/form-data" === e.contentType) {
                        b = "---------------------------" + Date.now().toString(16),
                        C = C.split("&");
                        for (var y = [], x = 0; x < C.length; x++) y.push('Content-Disposition: form-data; name="' + C[x].split("=")[0] + '"\r\n\r\n' + C[x].split("=")[1] + "\r\n");
                        v = "--" + b + "\r\n" + y.join("--" + b + "\r\n") + "--" + b + "--\r\n"
                    } else v = "application/x-www-form-urlencoded" === e.contentType ? C: C.replace(/&/g, "\r\n")
                }
            } else v = e.data;
            e.headers && a.each(e.headers,
            function(e, a) {
                g.setRequestHeader(e, a)
            }),
            "undefined" == typeof e.crossDomain && (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 !== window.location.host),
            e.crossDomain || g.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            e.xhrFields && a.each(e.xhrFields,
            function(e, a) {
                g[e] = a
            });
            var T;
            return g.onload = function() {
                if (T && clearTimeout(T), g.status >= 200 && g.status < 300 || 0 === g.status) {
                    var a;
                    if ("json" === e.dataType) try {
                        a = JSON.parse(g.responseText),
                        r("ajaxSuccess", {
                            xhr: g
                        },
                        "success", a, g.status, g)
                    } catch(n) {
                        r("ajaxError", {
                            xhr: g,
                            parseerror: !0
                        },
                        "error", g, "parseerror")
                    } else r("ajaxSuccess", {
                        xhr: g
                    },
                    "success", g.responseText, g.status, g)
                } else r("ajaxError", {
                    xhr: g
                },
                "error", g, g.status);
                e.statusCode && (t.statusCode && t.statusCode[g.status] && t.statusCode[g.status](g), e.statusCode[g.status] && e.statusCode[g.status](g)),
                r("ajaxComplete", {
                    xhr: g
                },
                "complete", g, g.status)
            },
            g.onerror = function() {
                T && clearTimeout(T),
                r("ajaxError", {
                    xhr: g
                },
                "error", g, g.status)
            },
            r("ajaxStart", {
                xhr: g
            },
            "start", g),
            r(void 0, void 0, "beforeSend", g),
            g.send(v),
            e.timeout > 0 && (T = setTimeout(function() {
                g.abort(),
                r("ajaxError", {
                    xhr: g,
                    timeout: !0
                },
                "error", g, "timeout"),
                r("ajaxComplete", {
                    xhr: g,
                    timeout: !0
                },
                "complete", g, "timeout")
            },
            e.timeout)),
            g
        },
        function() {
            function e(e) {
                a[e] = function(t, n, r) {
                    return a.ajax({
                        url: t,
                        method: "post" === e ? "POST": "GET",
                        data: "function" == typeof n ? void 0 : n,
                        success: "function" == typeof n ? n: r,
                        dataType: "getJSON" === e ? "json": void 0
                    })
                }
            }
            for (var t = "get post getJSON".split(" "), n = 0; n < t.length; n++) e(t[n])
        } (),
        a.trim = function(str){
            return str.replace(/(^\s+|\s+$)/g, '');
        },
        a.parseUrlQuery = function(e) {
            var a, t, n, r = {};
            if (! (e.indexOf("?") >= 0)) return r;
            for (e = e.split("?")[1], t = e.split("&"), a = 0; a < t.length; a++) n = t[a].split("="),
            r[n[0]] = n[1];
            return r
        },
        a.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e) ? !0 : !1
        },
        a.each = function(t, n) {
            if ("object" == typeof t && n) {
                var r, i;
                if (a.isArray(t) || t instanceof e) for (r = 0; r < t.length; r++) n(r, t[r]);
                else for (i in t) t.hasOwnProperty(i) && n(i, t[i])
            }
        },
        a.unique = function(e) {
            for (var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        },
        a.serializeObject = function(e) {
            if ("string" == typeof e) return e;
            var t = [],
            n = "&";
            for (var r in e) if (a.isArray(e[r])) {
                for (var i = [], o = 0; o < e[r].length; o++) i.push(r + "=" + e[r][o]);
                t.push(i.join(n))
            } else t.push(r + "=" + e[r]);
            return t.join(n)
        },
        a.toCamelCase = function(e) {
            return e.toLowerCase().replace(/-(.)/g,
            function(e, a) {
                return a.toUpperCase()
            })
        },
        a.dataset = function(e) {
            return a(e).dataset()
        },
        a.getTranslate = function(e, a) {
            var t, n, r, i;
            return "undefined" == typeof a && (a = "x"),
            r = window.getComputedStyle(e, null),
            window.WebKitCSSMatrix ? i = new WebKitCSSMatrix("none" === r.webkitTransform ? "": r.webkitTransform) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")),
            "x" === a && (n = window.WebKitCSSMatrix ? i.m41: parseFloat(16 === t.length ? t[12] : t[4])),
            "y" === a && (n = window.WebKitCSSMatrix ? i.m42: parseFloat(16 === t.length ? t[13] : t[5])),
            n || 0
        },
        a.requestAnimationFrame = function(e) {
            return window.requestAnimationFrame ? window.requestAnimationFrame(e) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(e) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(e) : window.setTimeout(e, 1e3 / 60)
        },
        a.cancelAnimationFrame = function(e) {
            return window.cancelAnimationFrame ? window.cancelAnimationFrame(e) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(e) : window.clearTimeout(e)
        },
        a.supportTouch = !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
        a.fn = e.prototype,
        a.fn.scrollTo = function(e, t, n, r, i) {
            return 4 === arguments.length && "function" == typeof r && (i = r, r = void 0),
            this.each(function() {
                function o(e) {
                    void 0 === e && (e = (new Date).getTime()),
                    null === w && (w = e);
                    var t, p = Math.max(Math.min((e - w) / n, 1), 0),
                    d = "linear" === r ? p: .5 - Math.cos(p * Math.PI) / 2;
                    return g && (f = s + d * (c - s)),
                    v && (m = l + d * (u - l)),
                    g && c > s && f >= c && (h.scrollTop = c, t = !0),
                    g && s > c && c >= f && (h.scrollTop = c, t = !0),
                    v && u > l && m >= u && (h.scrollLeft = u, t = !0),
                    v && l > u && u >= m && (h.scrollLeft = u, t = !0),
                    t ? void(i && i()) : (g && (h.scrollTop = f), v && (h.scrollLeft = m), void a.requestAnimationFrame(o))
                }
                var s, l, p, d, c, u, f, m, h = this,
                g = t > 0 || 0 === t,
                v = e > 0 || 0 === e;
                if ("undefined" == typeof r && (r = "swing"), g && (s = h.scrollTop, n || (h.scrollTop = t)), v && (l = h.scrollLeft, n || (h.scrollLeft = e)), n) {
                    g && (p = h.scrollHeight - h.offsetHeight, c = Math.max(Math.min(t, p), 0)),
                    v && (d = h.scrollWidth - h.offsetWidth, u = Math.max(Math.min(e, d), 0));
                    var w = null;
                    g && c === s && (g = !1),
                    v && u === l && (v = !1),
                    a.requestAnimationFrame(o)
                }
            })
        },
        a.fn.scrollTop = function(e, a, t, n) {
            3 === arguments.length && "function" == typeof t && (n = t, t = void 0);
            var r = this;
            return "undefined" == typeof e ? r.length > 0 ? r[0].scrollTop: null: r.scrollTo(void 0, e, a, t, n)
        },
        a.fn.scrollLeft = function(e, a, t, n) {
            3 === arguments.length && "function" == typeof t && (n = t, t = void 0);
            var r = this;
            return "undefined" == typeof e ? r.length > 0 ? r[0].scrollLeft: null: r.scrollTo(e, void 0, a, t, n)
        },
        a
    } ();
    window.$ = window.jQuery || window.zepto || Dom7;

    var Validator = window.Validator = {
        messages:{
            'password2':'密码不一致，请重新输入',
            'password':'密码格式有误',
            'cellphone':'手机号格式有误，请输入正确的手机号',
            'username':'用户名格式有误',
            'email':'"邮箱格式不正确，请重新输入"',
            'vcode':'验证码格式有误',
            'truename':'真实姓名',
            'qq':'QQ格式有误',
            'idcard':'身份证号码不正确',
            'tel':'电话格式有误',
            'zipcode':'邮编格式有误',
            'isNumber':'请输入数字',
            'url':'url地址不正确，请检查一下',
            'phone':"电话号码格式不正确，请检查一下"
        },
        makeErrorMsg:function(vname,item){
            var messages = this.messages;
            var name = item.attr('name') || '';
            var hasCustomMsg = this.hasCustomMsg(vname,item);
            var placeholder = item.attr('placeholder') || '';
            var msg = '';
            if('require' === vname){
                msg = hasCustomMsg || placeholder || (name + '不能为空');
            }else {
                msg = hasCustomMsg || messages[vname];
            }
            return msg;
        },
        hasCustomMsg:function(name,item){
            var messages = item.attr('data-messages') || '';
            var objM = messages?JSON.parse(messages):{};

            return objM[name];
        },
        trim:function(item) {
            this.Value = $.trim(this.Value);
            item.val(this.Value);
        },

        require:function(item) {
            var name = item.attr('name');
            var value = item.val();
            if(value == '') {
                //this.ErrorMessage[name] = this.makeErrorMsg('require',item);
                return false;
            } else {
                return true;
            }
        },
        isNumber:function(item) {
            var name = item.attr('name');
            var value = item.val();
            if(isNaN(value)) {
                //this.ErrorMessage[name] = this.messages['isNumber'];
                return false;
            } else {
                return true;
            }
        },
        min_length:function(item, len) {
            var name = item.attr('name');
            var value = item.val();
            if(this.getStrActualLen(value) < len && value!='') {
                this.ErrorMessage[name] = '长度必须大于'+len+'个字符';
                return false;
            } else {
                return true;
            }
        },
        max_length:function(item, len) {
            var name = item.attr('name');
            var value = item.val();
            if(this.getStrActualLen(value) > len && value!='') {
                this.ErrorMessage[name] = '长度不能超过'+len+'个字符';
                return false;
            } else {
                return true;
            }
        },
        length:function(item, len) {
            var name = item.attr('name');
            var value = item.val();
            if(this.getStrActualLen(value) != len && value!='') {
                this.ErrorMessage[name] = '长度只能是'+len+'个字符';
                return false;
            } else {
                return true;
            }
        },
        
        email:function(item) {
            var name = item.attr('name');
            var value = item.val();
            var re = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!re.test(value) && value!='') {
                //this.ErrorMessage[name] = this.messages['email'];
                return false;
            } else {
                return true;
            }
        },
        qq:function(item) {
            var name = item.attr('name');
            var value = item.val();
            var re = /^[0-9]{5,11}$/;
            if(!re.test(value) && value!='') {
                //this.ErrorMessage[name] = this.messages['qq'];
                return false;
            } else {
                return true;
            }
        },
        vcode:function(item) {
            var name = item.attr('name');
            var value = item.val();
            var re = /^\d{4}$/;
            if(!re.test(value) && value!='') {
                //this.ErrorMessage[name] = this.messages['vcode'];
                return false;
            } else {
                return true;
            }
        },
        idcard:function(item) {
            var name = item.attr('name');
            var idCard = item.val();
            var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子  
            var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X 
            /** 
             * 判断身份证号码为18位时最后的验证位是否正确 
             * @param a_idCard 身份证号码数组 
             * @return 
             */ 
            var isTrueValidateCodeBy18IdCard = function(idCard) {  
                var sum = 0; // 声明加权求和变量  
                var a_idCard=idCard.split("");
                   if (a_idCard[17].toLowerCase() == 'x') {  
                        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作  
                    }
                    for ( var i = 0; i < 17; i++) {  
                        sum += Wi[i] * a_idCard[i];// 加权求和  
                    }
                    if (a_idCard[17] == ValideCode[sum % 11]) {  
                        return true;  
                    } else {  
                        return false;  
                    }  
            };
             /** 
              * 验证18位数身份证号码中的生日是否是有效生日 
              * @param idCard 18位书身份证字符串 
              * @return 
              */ 
            var isValidityBrithBy18IdCard = function(idCard18){  
                var year =  idCard18.substring(6,10);  
                var month = idCard18.substring(10,12);  
                var day = idCard18.substring(12,14);  
                temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
                // 这里用getFullYear()获取年份，避免千年虫问题  
                if(temp_date.getFullYear()!=parseFloat(year)  
                      ||temp_date.getMonth()!=parseFloat(month)-1  
                      ||temp_date.getDate()!=parseFloat(day)){  
                        return false;  
                }else{  
                    temp_date = year+"-"+month+"-"+day; 
                    return true;  
                }  
            };
            /** 
             * 验证15位数身份证号码中的生日是否是有效生日 
             * @param idCard15 15位书身份证字符串 
             * @return 
             */ 
            var isValidityBrithBy15IdCard = function(idCard15){  
                var year =  idCard15.substring(6,8);  
                var month = idCard15.substring(8,10);  
                var day = idCard15.substring(10,12);  
                var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法  
                if(temp_date.getYear()!=parseFloat(year)  
                        ||temp_date.getMonth()!=parseFloat(month)-1  
                        ||temp_date.getDate()!=parseFloat(day)){  
                          return false;  
                }else{  
                    return true;  
                }  
            };
            if(idCard){
                if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(idCard)){
                    if(idCard.length == 15 && isValidityBrithBy15IdCard(idCard)){  
                        return true;
                    }else if(idCard.length == 18 && isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(idCard)){  
                        return true;  
                    }else{
                        //this.ErrorMessage[name] = this.makeErrorMsg('idcard',item);
                        return false; 
                    }
                }else{
                    //this.ErrorMessage[name] = this.makeErrorMsg('idcard',item);
                    return false; 
                }
            }
        },
        //手机号码规则：可以以0开头+三位固定号段+8为数字*/
        cellphone:function(item){
            var name = item.attr('name');
            var value = item.val();
            //170是虚拟号段
            /*移动号段16个
             *  134、135、136、137、138、139、147、150、151、152、157、158、159、182、183、187、188 170  
             */
            var pattern1 = /^0{0,1}(13[4-9]|147|15[0-2]|15[7-9]|18[23478]|178|170)[0-9]{8}$/;  
            /*联通号段7个  
            130、131、132、155、156、185、186  
            */  
            var pattern2 = /^0{0,1}(13[0-2]|15[56]|145|18[56]|176)[0-9]{8}$/;  
            /*电信号段4个  
            133、153、180、189   
            */  
            var pattern3 = /^0{0,1}(133|153|180|181|189|177)[0-9]{8}$/;
            if(value!='' && !pattern1.test(value) && !pattern2.test(value) 
                    && !pattern3.test(value)) {
                //this.ErrorMessage[name] = this.messages['cellphone'];
                return false;
            } else {
                return true;
            }
        },
        // 座机
        phone:function(item){
            var name = item.attr('name');
            var value = item.val();
            var re = /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/;
            if(!re.test(value) && value!='') {
                this.ErrorMessage[name] = this.messages['phone'];
                return false;
            } else {
                return true;
            }
            
        },
        
        
        url:function(item){
            var name = item.attr('name');
            var value = item.val();
            var re = /^(https|http)?:\/\/(\S)*$/;
            if(!re.test(value) && value!='') {
                this.ErrorMessage[name] = this.messages['url'];
                return false;
            } else {
                return true;
            }
            
        },
        // 6-16位,支持数字、字母和_、－、／
        username:function(item){
            var name = item.attr('name');
            var value = item.val();
            var re = new RegExp("['\"&\\n\r\t\b\f@,;%/]");
            if(!value || value.length<6 || value.length>16 || re.test(value)) {
                this.ErrorMessage[name] = this.messages['username'];
                return false;
            } else {
                return true;
            }
            
        },
        // 6-20位 必须包含数字和英文
        password:function(item){
            var name = item.attr('name');
            var value = item.val();
            var str = this.Value;
            if(!this.Value || this.Value.length<6 || this.Value.length>20) {
                this.ErrorMessage[name] = this.messages['password'];
                return false;
            } else {
                if(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(str)){
                    return true;
                }else {
                    this.ErrorMessage[name] = this.messages['password'];
                    return false;
                }
                
            }
            
        },
        // 确认密码 data-password="#id"
        password2:function(item){
            var name = item.attr('name');
            var passwordItem = $(item.attr('data-password'));
            var password = passwordItem[0].value;
            var password2 = item[0].value;
            //console.log('password2',name,password,password2)
            if(password != password2) {
                
                this.ErrorMessage[name] = this.messages['password2'];

                return false;
            }else {
                return true;
            }

        },
        Items:{},
        ErrorMessage:{},
        Value:'',
        getMessage:function(item){
            
        },
        clear:function(){
            this.ErrorMessage = {};
            this.errors = [];
        },
        // return ['error1','error2']
        getErrors:function(){
            var errors = [];
            var ErrorMessage = this.ErrorMessage;

            for(var name in ErrorMessage) {
                errors.push(ErrorMessage[name]);
            }

            return errors;


        },
        validate:function($form){
            var self = this;
            var valid = true;

            this.clear();
            $form.find("input").each(function() {
                //console.log(this)
                var name = this.name;
               
                if(!self.fieldValidate($(this))){
                    valid = false;
                    
                }
                
                    
            });

            if(valid) {
                return true;
            }else {
                return this.getErrors();
            }
        },
        /*
            单个域验证 $(input)
            <input type="text" data-validate="require,username" />
        */
        fieldValidate:function(theItem) {
            var self = this;
            var S4 = function(){
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            if(typeof(theItem) != 'undefined') {
                var name = theItem.attr('name');

                if(!name){
                    name = 'input_' + S4() + S4();
                    theItem.attr('name', name);
                    
                    //console.warn(theItem,'name 属性不能为空');
                    //return false;
                }
                //this.Items = {};
                //this.ErrorMessage = {};
                var rulesParsing = theItem.attr('data-validate') || '';
                
                //console.log(name,rulesParsing)
                if (!rulesParsing) return true;

                console.log(name,rulesParsing)
                
                this.Items[name] = theItem;
                this.Value = theItem.val();
                var methods = rulesParsing.indexOf(',')>-1?rulesParsing.split(','):[rulesParsing];
                for(var i in methods) {
                    var method = methods[i];
                    if(typeof(this[method]) == 'function' && this[method](theItem) == false){
                        self.ErrorMessage[name] = self.makeErrorMsg(method,theItem);
                        //console.log(name,tmp)
                        return false;
                    }
                }

                return true;
                
            }
        },
        count:function(obj) {
            var counter = 0;
            for(i in obj) counter++;
            return counter;
        },
        getStrActualLen:function(sChars){
            sChars = $.trim(sChars);
            var len = 0;
            for(i=0;i<sChars.length;i++){
                iCode = sChars.charCodeAt(i);
    //          if((iCode>=0 && iCode<=255)||(iCode>=0xff61 && iCode<=0xff9f)){
                    len += 1;
    //          }else{
    //              len += 2;
    //          }
            }
            return len;
        },
        addMethod:function(){

        }
    };

    // region 浏览器检测
    var UA = function ( ua, appVersion, platform ) {
        return {
            userAgent:ua,

            // win系列
            win32 : platform === "Win32",
            ie : /MSIE ([^;]+)/.test( ua ),
            ieMobile : window.navigator.msPointerEnabled,
            ieVersion : Math.floor( (/MSIE ([^;]+)/.exec( ua ) || [0, "0"])[1] ),

            // ios系列
            ios : (/iphone|ipad/gi).test( appVersion ),
            iphone : (/iphone/gi).test( appVersion ),
            ipad : (/ipad/gi).test( appVersion ),
            iosVersion : parseFloat( ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec( ua ) || [0, ''])[1])
                .replace( 'undefined', '3_2' ).replace( '_', '.' ).replace( '_', '' ) ) || false,
            safari : /Version\//gi.test( appVersion ) && /Safari/gi.test( appVersion ),
            uiWebView : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test( ua ),

            // 安卓系列
            android : (/android/gi).test( appVersion ),
            androidVersion : parseFloat( "" + (/android ([0-9\.]*)/i.exec( ua ) || [0, ''])[1] ),

            // chrome
            chrome : /Chrome/gi.test( ua ),
            chromeVersion : parseInt( ( /Chrome\/([0-9]*)/gi.exec( ua ) || [0, 0] )[1], 10 ),

            // 内核
            webkit : /AppleWebKit/.test( appVersion ),

            // 其他浏览器
            uc : appVersion.indexOf( "UCBrowser" ) !== -1,
            Browser : / Browser/gi.test( appVersion ),
            MiuiBrowser : /MiuiBrowser/gi.test( appVersion ),

            // 微信
            MicroMessenger : ua.toLowerCase().match( /MicroMessenger/i ) == "micromessenger",

            // 其他
            canTouch : "ontouchstart" in document
        };
    }( navigator.userAgent, navigator.appVersion, navigator.platform );


    /*
        模板控制器
    */
    var iTemplate = (function(){
        var template = function(){};
        template.prototype = {
            // 针对数组数据 iTemplate.makeList('<p a="{a}">{b}</p>', [{a:1,b:2},{a:22,b:33}] ) return '<p a="1">2</p><p a="22">33</p>'
            makeList: function(tpl, arr, fn){
                var res = [], $10 = [], reg = /{(.+?)}/g, json2 = {}, index = 0;
                for(var el = 0;el<arr.length;el++){
                    if(typeof fn === "function"){
                        json2 = fn.call(this, el, arr[el], index++)||{};
                    }
                    res.push(
                         tpl.replace(reg, function($1, $2){
                            return ($2 in json2)? json2[$2]: (undefined === arr[el][$2]? '':arr[el][$2]);
                        })
                    );
                }
                return res.join('');
            },
            // 针对单个数据 iTemplate.substitute('<p a="{a}">{b}</p>',{a:1,b:2}) return '<p a="1">2</p>'
            substitute: function(tpl, obj){
                if (!(Object.prototype.toString.call(tpl) === '[object String]')) {
                    return '';
                }
                if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)) {
                    return tpl;
                }
                //    /\{([^{}]+)\}/g
                return tpl.replace(/\{(.*?)\}/igm , function(match, key) {
                    if(typeof obj[key] != 'undefined'){
                        return obj[key];
                    }
                    return '';
                });
            }
        }
        return new template();
    })();

    // UI msgbox
    var MsgBox = (function(){
        var toElement = (function() {
          var div = document.createElement("div");
          return function(html) {
              div.innerHTML = html;
              var element = div.firstChild;
              div.removeChild(element);
              return element;
          };
        })();
        var LOADING_TPL = '<div id="loadingToast" class="weui_loading_toast" style="display:block">'+
                                '<div class="weui_mask_transparent"></div>'+
                                '<div class="weui_toast">'+
                                    '<div class="weui_loading">'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_0"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_1"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_2"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_3"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_4"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_5"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_6"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_7"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_8"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_9"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_10"></div>'+
                                        '<div class="weui_loading_leaf weui_loading_leaf_11"></div>'+
                                    '</div>'+
                                    '<p class="weui_toast_content">数据加载中</p>'+
                                '</div>'+
                            '</div>';
        //动态loading层
        var LOADING=function(){
            //m.stylesheet('@'+webkit+'keyframes loading{0%{'+webkit+'transform:rotate(0deg);}100%{'+webkit+'transform:rotate(360deg);}}');
            var _wrp = toElement(LOADING_TPL);

            _wrp.addEventListener('touchstart',function(e){
                e.preventDefault();//防止滚动
            },false);
            var show=function(){
                var text,timeout;
                if(arguments.length==2){
                    text = arguments[0];
                    timeout = arguments[1];
                }
                text = typeof(arguments[0])=='string'?arguments[0]:'';
                if(text){
                    _wrp.querySelector('.weui_toast_content').innerHTML = text;
                }
                if(timeout) {
                    _wrp.querySelector('.weui_loading').innerHTML = '<div class="weui_toast_icon_circle"></div> <div class="weui_toast_icon_shu"></div> <div class="weui_toast_icon_point"></div>'; 
                }
                
                document.body.appendChild(_wrp);

                if(timeout) {
                    setTimeout(function(){
                        hide();
                    },timeout)
                }
                
            },hide=function(){
                if(_wrp.parentNode)
                _wrp.parentNode.removeChild(_wrp);
            },
            _o={show:show,hide:hide};
            return _o;
        }();


        var ALERT_TPL = '<div class="weui_dialog_alert"  style="display:block;">'+
                            '<div class="weui_mask"></div>'+
                            '<div class="weui_dialog">'+
                                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div>'+
                                '<div class="weui_dialog_bd">弹窗内容，告知当前页面信息等</div>'+
                                '<div class="weui_dialog_ft">'+
                                    '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>';

        var CONFIRM_TPL =   '<div class="weui_dialog_confirm"  style="display: block;">'+
                                '<div class="weui_mask"></div>'+
                                '<div class="weui_dialog">'+
                                    '<div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div>'+
                                    '<div class="weui_dialog_bd">自定义弹窗内容<br>...</div>'+
                                    '<div class="weui_dialog_ft">'+
                                        '<a href="javascript:;" class="weui_btn_dialog default">取消</a>'+
                                        '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

        //弹出层
        var msgBox = function(){
            var alert = function(msg,callback){
                var msg = msg || '';
                var _wrp = toElement(ALERT_TPL);
                var  hide = function(){
                    if(_wrp.parentNode)_wrp.parentNode.removeChild(_wrp);
                };

              
                _wrp.querySelector('.weui_dialog_bd').innerHTML = msg;

                _wrp.querySelector('.weui_mask').addEventListener('touchstart',function(e){
                    
                    e.preventDefault();//防止滚动
                    e.stopPropagation();
                    
                },false);
                _wrp.querySelector('.primary').addEventListener('click',function(e){
                    
                    e.preventDefault();//防止滚动
                    e.stopPropagation();
                    hide();
                    callback && callback();
                    
                },false);

                //console.log(_wrp.querySelector('.primary'));

                document.body.appendChild(_wrp);

                
            },
            confirm = function(msg,yescallback,nocallback){
                var msg = msg || '';
                var _wrp = toElement(CONFIRM_TPL);
                var  hide = function(){
                    if(_wrp.parentNode)_wrp.parentNode.removeChild(_wrp);
                };

              
                _wrp.querySelector('.weui_dialog_bd').innerHTML = msg;

                _wrp.querySelector('.weui_mask').addEventListener('touchstart',function(e){
                    
                    e.preventDefault();//防止滚动
                    e.stopPropagation();
                    
                },false);
                _wrp.querySelector('.primary').addEventListener('click',function(e){
                    
                    e.preventDefault();//防止滚动
                    e.stopPropagation();
                    hide();
                    yescallback && yescallback();
                    
                },false);
                _wrp.querySelector('.default').addEventListener('click',function(e){
                    
                    e.preventDefault();//防止滚动
                    e.stopPropagation();
                    hide();
                    nocallback && nocallback();
                    
                },false);

                document.body.appendChild(_wrp);


            },
            _o = {alert:alert,confirm:confirm,loading:LOADING};
            return _o;
        }();

        return msgBox;

    })();
    // 显示脚本
    var Debugger = (function(){
        var isInit = false;
        var $ = Dom7;

        var init = function(){
            var box = $('<div id="debuggerBox" ondrag="return false;" style="position:fixed;width:200px;top:0;right:0;z-index:999999;"><div id="debugger" style="-webkit-overflow-scrolling:touch;line-height:1.2;background:#000;color:#FFF;height:400px;overflow:auto;"></div></div>');
            
            $('body').append(box);
            isInit = true;
        };

        var obj = {
            dir:function(name,obj){
                if(!isInit){init();}
                var $debugger = $('#debugger');
                var obj = typeof name === 'string'?obj:name;
                var str = '<p>' + name + '</p>';
                for(var key in obj){
                    str+='<p>&nbsp;&nbsp;&nbsp;&nbsp;' + key+' : '+ obj[key] + '</p>';
                }
                $debugger.append(str);

                this.scroll();
            },
            log:function(msg){
                if(!isInit){init();}
                var $debugger = $('#debugger');

                $debugger.append('<p>'+msg+'</p>');
                
                this.scroll();
            },
            clear:function(){
                $('#debugger').html('');
            },
            scroll:function(){
                var $debugger = $('#debugger');
                var scrollHeight = $debugger[0].scrollHeight;
                $debugger.scrollTop(scrollHeight);
            },
            destroy:function(){
                $('#debuggerBox').remove();
            }
        };


        return obj;

    })();



    var arr = [];

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;


    // Use a stripped-down indexOf if we can't use a native one
    var indexOf = arr.indexOf || function( elem ) {
        var i = 0,
            len = this.length;
        for ( ; i < len; i++ ) {
            if ( this[i] === elem ) {
                return i;
            }
        }
        return -1;
    };
    
    
    var device = function() {
        var a = {},
        t = navigator.userAgent,
        n = Dom7,
        r = t.match(/(Android);?[\s\/]+([\d.]+)?/),
        i = t.match(/(iPad).*OS\s([\d_]+)/),
        o = t.match(/(iPod)(.*OS\s([\d_]+))?/),
        s = !i && t.match(/(iPhone\sOS)\s([\d_]+)/);
        if (a.ios = a.android = a.iphone = a.ipad = a.androidChrome = !1, r && (a.os = "android", a.osVersion = r[2], a.android = !0, a.androidChrome = t.toLowerCase().indexOf("chrome") >= 0), (i || s || o) && (a.os = "ios", a.ios = !0), s && !o && (a.osVersion = s[2].replace(/_/g, "."), a.iphone = !0), i && (a.osVersion = i[2].replace(/_/g, "."), a.ipad = !0), o && (a.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, a.iphone = !0), a.ios && a.osVersion && t.indexOf("Version/") >= 0 && "10" === a.osVersion.split(".")[0] && (a.osVersion = t.toLowerCase().split("version/")[1].split(" ")[0]), a.webView = (s || i || o) && t.match(/.*AppleWebKit(?!.*Safari)/i), a.os && "ios" === a.os) {
            var l = a.osVersion.split(".");
            a.minimalUi = !a.webView && (o || s) && (1 * l[0] === 7 ? 1 * l[1] >= 1 : 1 * l[0] > 7) && n('meta[name="viewport"]').length > 0 && n('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
        }
        var p = n(window).width(),
        d = n(window).height();
        a.statusBar = !1,
        a.statusBar = a.webView && p * d === screen.width * screen.height ? !0 : !1;
        var c = [];
        if (a.pixelRatio = window.devicePixelRatio || 1, c.push("pixel-ratio-" + Math.floor(a.pixelRatio)), a.pixelRatio >= 2 && c.push("retina"), a.os && (c.push(a.os, a.os + "-" + a.osVersion.split(".")[0], a.os + "-" + a.osVersion.replace(/\./g, "-")), "ios" === a.os)) for (var u = parseInt(a.osVersion.split(".")[0], 10), f = u - 1; f >= 6; f--) c.push("ios-gt-" + f);
        return a.statusBar ? c.push("with-statusbar-overlay") : n("html").removeClass("with-statusbar-overlay"),
        c.length > 0 && n("html").addClass(c.join(" ")),
        a
    } ();
    /*Debugger.dir('device',device);
    Debugger.dir('device',device);
    Debugger.dir('device',device);*/

    var IGrow = {
        version: '2.0.0',
        date:'2016/02/24',
        $:Dom7,
        ua: UA,
        iTemplate: iTemplate,
        msgbox:MsgBox,

        // A global GUID counter for objects
        plugins: {},
        sub:iTemplate.substitute,
        
        support : function() {
            var e = {
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            };
            return e
        } (),
        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            // Support: Android < 4.0, iOS < 6 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },
        // 生成随机uuid guid()
        guid: function(){
            var S4 = function(){
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        // 生成指定范围的随机数 [1,10]
        range: function(Min,Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        },
        // 类继承
        extendClass: function( subClass, superClass ) {
            var F = function(){};

            F.prototype = superClass.prototype;　　
            subClass.prototype = new F();　　
         
            subClass.superclass = superClass.prototype;
        },
        
        // Evaluates a script in a global context
        globalEval: function( code ) {
            var script,
                indirect = eval;

            code = IGrow.trim( code );

            if ( code ) {
                // If the code includes a valid, prologue position
                // strict mode pragma, execute code by injecting a
                // script tag into the document.
                if ( code.indexOf("use strict") === 1 ) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild( script ).parentNode.removeChild( script );
                } else {
                // Otherwise, avoid the DOM node creation, insertion
                // and removal by using an indirect global eval
                    indirect( code );
                }
            }
        },
        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArraylike( Object(arr) ) ) {
                    IGrow.merge( ret,
                        typeof arr === "string" ?
                        [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },
        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

            // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },
        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },
        isArray: function( obj ) {
            return Object.prototype.toString.call(obj) === '[object Array]'; 
        },
        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return !IGrow.isArray( obj ) && obj - parseFloat( obj ) >= 0;
        },
        // 是否是纯粹的对象 new Object() || {}
        isPlainObject: function( obj ) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if ( IGrow.type( obj ) !== "object" || obj.nodeType || IGrow.isWindow( obj ) ) {
                return false;
            }

            if ( obj.constructor &&
                    !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },
        isFunction: function( obj ) {
            return IGrow.type(obj) === "function";
        },
        noop: function() {},
        // args is for internal usage only
        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );
            
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            }
            

            return obj;
        },
        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var tmp, args, proxy;

            // this throws a TypeError, but we will just return undefined.
            if ( !IGrow.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || IGrow.guid++;

            return proxy;
        },
        trim: function(str){
            return str.replace(/(^\s+|\s+$)/g, '');
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },
        /**
         * 实现类与类之间的继承。
         * @method inherits
         * @grammar Base.inherits( super ) => child
         * @grammar Base.inherits( super, protos ) => child
         * @grammar Base.inherits( super, protos, statics ) => child
         * @param  {Class} super 父类
         * @param  {Object | Function} [protos] 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
         * @param  {Function} [protos.constructor] 子类构造器，不指定的话将创建个临时的直接执行父类构造器的方法。
         * @param  {Object} [statics] 静态属性或方法。
         * @return {Class} 返回子类。
         * @example
         * function Person() {
         *     console.log( 'Super' );
         * }
         * Person.prototype.hello = function() {
         *     console.log( 'hello' );
         * };
         *
         * var Manager = Base.inherits( Person, {
         *     world: function() {
         *         console.log( 'World' );
         *     }
         * });
         *
         * // 因为没有指定构造器，父类的构造器将会执行。
         * var instance = new Manager();    // => Super
         *
         * // 继承子父类的方法
         * instance.hello();    // => hello
         * instance.world();    // => World
         *
         * // 子类的__super__属性指向父类
         * console.log( Manager.__super__ === Person );    // => true
         */
        inherits: function( Super, protos, staticProtos ) {
            var child;

            if ( typeof protos === 'function' ) {
                child = protos;
                protos = null;
            } else if ( protos && protos.hasOwnProperty('constructor') ) {
                child = protos.constructor;
            } else {
                child = function() {
                    return Super.apply( this, arguments );
                };
            }

            // 复制静态方法
            IGrow.extend( true, child, Super, staticProtos || {} );

            /* jshint camelcase: false */

            // 让子类的__super__属性指向父类。
            child.__super__ = Super.prototype;

            // 构建原型，添加原型方法或属性。
            // 暂时用Object.create实现。
            child.prototype = createObject( Super.prototype );
            protos && IGrow.extend( true, child.prototype, protos );

            return child;
        },
        xxoo:function(){}
        



    };

    // Populate the class2type map
    IGrow.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    function isArraylike( obj ) {
        var length = obj.length,
            type = IGrow.type( obj );

        if ( type === "function"  ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }



    // 高频执行事件/方法的防抖 取自 UnderscoreJS 实用框架 
    // 添加resize的回调函数，但是只允许它每300毫秒执行一次  
    /* window.addEventListener('resize', debounce(function(event) {

        console.log('这里写resize过程 ') 

    }, 300));*/ 
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    

    // human_date(+new Date/1000)
    function human_date(h) {
        var g = Math.floor((new Date).getTime() / 1000),
        l = new Date;
        l.setHours(0);
        l.setMinutes(0);
        l.setSeconds(0);
        l = Math.floor(l.getTime() / 1000);
        if (h > l && 0 <= g - h) {
            return 50 >= g - h ? (g = 10 * Math.floor((g - h) % 60 / 10), (10 < h ? g: 10) + "\u79d2\u524d") : 3600 > g - h ? Math.ceil((g - h) / 60) + "\u5206\u949f\u524d": Math.ceil((g - h) / 3600) + "\u5c0f\u65f6\u524d"
        }
        g = new Date;
        g.setTime(1000 * h);
        h = g.getMonth() + 1;
        var l = g.getDate(),
        k = g.getHours(),
        j = g.getMinutes();
        10 > h && (h = "0" + h);
        10 > l && (l = "0" + l);
        10 > k && (k = "0" + k);
        10 > j && (j = "0" + j);
        return g.getFullYear() + "-" + h + "-" + l + " " + k + ":" + j
    }

    IGrow.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !IGrow.isFunction(target) ) {
            target = {};
        }

        // extend  itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }
        

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( IGrow.isPlainObject(copy) || (copyIsArray = IGrow.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && IGrow.isArray(src) ? src : [];

                        } else {
                            clone = src && IGrow.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = IGrow.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }


    // 本地存储 
    var MStorage = (function() {
        var _session = window.sessionStorage,
            _local = window.localStorage,
            _get = function(k) {

                var d = _getData(k);
               
                if (d != null) return d.value;
                return null;
            }, _getData = function(k) {

                if (k in _session) {
                    return JSON.parse(_session.getItem(k));
                } else if (k in _local) { 
                    
                    return JSON.parse(_local.getItem(k)); 
                }
                else return null;
            }, _set = function(k, v) {
                var d = {
                    value: v,
                    ts: (new Date).getTime()
                };
                d = JSON.stringify(d);
                //_session.setItem(k, v);
                _local.setItem(k, d);
            }, _clear = function() {
                //_session.clear();
                _local.clear();
            }, _remove = function(k) {
                //_session.removeItem(k);
                _local.removeItem(k);
            }, _removeExpires = function(time) {
                var now = (new Date).getTime(),
                    data;
                for (var key in _local) {
                    data = MStorage.getData(key);
                    if (now - data.ts > time) {
                        _local.removeItem(key);
                        //_session.removeItem(key);
                    }
                }
            }, _setData = function(k,data) {
                var d;
                if(typeof data === 'object') {
                    data.ts = (new Date).getTime();
                    d = JSON.stringify(data);
                    _local.setItem(k, d);
                }
            };
        return {
            set: _set,
            get: _get,
            setData: _setData,
            getData: _getData,
            clear: _clear,
            remove: _remove,
            removeExpires: _removeExpires
        };
    }());

    
    var Util = {
        debounce:debounce,
        human_date:human_date,
        // 判断闰年
        IsRunYear: function(year) {
            var monarr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            //闰年的话
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                monarr[1] = "29";
                return true;
            }
            return false;
        },
        // 字符串长度
        strlen: function(str) {
            return (/msie/.test(navigator.userAgent.toLowerCase()) && str.indexOf('\n') !== -1) ? str.replace(/\r?\n/g, '_').length : str.length;
        },
        mb_strlen: function(str) {
            var len = 0;
            for(var i = 0; i < str.length; i++) {
                len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? ( 'utf-8' === 'utf-8' ? 3 : 2) : 1;
            }
            return len;
        },
        mb_cutstr: function(str, maxlen, dot) {
            var len = 0;
            var ret = '';
            var dot = !dot && dot !== '' ? '...' : dot;
            maxlen = maxlen - dot.length;
            for(var i = 0; i < str.length; i++) {
                len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? ('utf-8' === 'utf-8' ? 1 : 1) : 1;
                if(len > maxlen) {
                    ret += dot;
                    break;
                }
                ret += str.substr(i, 1);
            }
            return ret;
        },
        strLenCalc2: function(elem, showId, maxlen) {
            var v = elem.value, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = IGrow.strlen(v);
            
            for(var i = 0; i < v.length; i++) {
                if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 127) {
                    curlen -= 2;
                } else {
                    curlen -= 1;
                }
            }
            document.getElementById(showId).innerHTML = Math.floor(curlen / 2);
        },
        
        //获取图片宽 和 高
        imgReady: function( url, success, error ) {
            var width, height, intervalId, check, div,
                img = new Image(),
                body = document.body;
                
            img.src = url;
            
            // 从缓存中读取
            if (img.complete) {
                return success(img.width, img.height);
            }
            // 通过占位提前获取图片头部数据
            if (body) {
                div = document.createElement('div');
                div.style.cssText = 'position:absolute;left:-99999px;top:0;';
                div.appendChild(img);
                body.appendChild(div);
                width = img.offsetWidth;
                height = img.offsetHeight;
               
                check = function () {
                   
                    if (img.offsetWidth !== width || img.offsetHeight !== height) {
                        
                        clearInterval(intervalId);
                        success(img.offsetWidth, img.clientHeight);
                        img.onload = null;
                        div.innerHTML = '';
                        div.parentNode.removeChild(div);
                    };

                };
                
                intervalId = setInterval(check, 150);
            }
            
            // 加载完毕后方式获取
            img.onload = function () {
                if(img.complete){
                    success(img.width, img.height);
                    img.onload = img.onerror = null;
                    clearInterval(intervalId);
                    body && img.parentNode &&img.parentNode.removeChild(img);
                }
                    
            };
            
            // 图片加载错误
            img.onerror = function () {
                error && error();
                clearInterval(intervalId);
                body && img.parentNode && img.parentNode.removeChild(img);
            };
        },
        // 返回无重复的数组
        getNoRepeat: function(array) {
            var map = {};
            var ret = [];

            for (var i = array.length - 1; i >= 0; i--) {
                var value = array[i];
                map[value] = 1;
            };

            for(var key in map) {
                ret.push(key);
            }

            return ret;
        },
        // 获取url 参数 http://www.baidu.com/q?name=1&age=2 return {name:1,age:2}
        getQuery : function(){
            var search = window.location.search;
            var key = arguments[0];
      
            if (search.indexOf('?') != -1) {
                var params = search.substr(1).split('&');
                var query = {};
                var q = [];
                var name = '';

                for (i = 0; i < params.length; i++) {
                    q = params[i].split('=');
                    name = decodeURIComponent(q[0]);

                    if (name.substr(-2) == '[]') {
                        if (!query[name]) {
                            query[name] = [];
                        }
                        query[name].push(q[1]);
                    } else {
                        query[name] = q[1];
                    }

                }
                if (key) {
                    if (query[key]) {
                        return query[key];
                    }

                    return null;
                } else {
                    return query;
                }
            }

        },
        // 格式化日期 formatDate(new Date(1384931712000), 'yyyy-MM-dd hh:mm:ss')
        formatDate: function( date, fmt ) {
            var o = {
                "M+": date.getMonth() + 1,
                //月份   
                "d+": date.getDate(),
                //日   
                "h+": date.getHours(),
                //小时   
                "m+": date.getMinutes(),
                //分   
                "s+": date.getSeconds(),
                //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3),
                //季度   
                "S": date.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },
        // 获取站点根目录
        getRootPath: function() {
            var strFullPath = window.document.location.href;
            var strPath = window.document.location.pathname;
            var pos = strFullPath.indexOf(strPath);
            var prePath = strFullPath.substring(0, pos);
            var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
            return (prePath + postPath);
        },
    };
    
    // qqqqqqqqqqqqqqqq

    var qq = qq || {};

    qq.extend = function(first, second) {
        for (var prop in second) {
            first[prop] = second[prop];
        }
    };
    qq.indexOf = function(arr, elt, from) {
        if (arr.indexOf) {
            return arr.indexOf(elt, from);
        }
        from = from || 0;
        var len = arr.length;
        if (from < 0) {
            from += len;
        }
        for (; from < len; from++) {
            if (from in arr && arr[from] === elt) {
                return from;
            }
        }
        return - 1;
    };
    qq.getUniqueId = (function() {
        var id = 0;
        return function() {
            return id++;
        };
    })();
    qq.attach = function(element, type, fn) {
        if (element.addEventListener) {
            element.addEventListener(type, fn, false);
        } else {
            if (element.attachEvent) {
                element.attachEvent("on" + type, fn);
            }
        }
    };
    qq.detach = function(element, type, fn) {
        if (element.removeEventListener) {
            element.removeEventListener(type, fn, false);
        } else {
            if (element.attachEvent) {
                element.detachEvent("on" + type, fn);
            }
        }
    };
    qq.preventDefault = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    };
    qq.insertBefore = function(a, b) {
        b.parentNode.insertBefore(a, b);
    };
    qq.remove = function(element) {
        element.parentNode.removeChild(element);
    };
    qq.contains = function(parent, descendant) {
        if (parent == descendant) {
            return true;
        }
        if (parent.contains) {
            return parent.contains(descendant);
        } else {
            return !! (descendant.compareDocumentPosition(parent) & 8);
        }
    };
    qq.toElement = (function() {
        var div = document.createElement("div");
        return function(html) {
            div.innerHTML = html;
            var element = div.firstChild;
            div.removeChild(element);
            return element;
        };
    })();
    qq.css = function(element, styles) {
        if (styles.opacity != null) {
            if (typeof element.style.opacity != "string" && typeof(element.filters) != "undefined") {
                styles.filter = "alpha(opacity=" + Math.round(100 * styles.opacity) + ")";
            }
        }
        qq.extend(element.style, styles);
    };
    qq.hasClass = function(element, name) {
        var re = new RegExp("(^| )" + name + "( |$)");
        return re.test(element.className);
    };
    qq.addClass = function(element, name) {
        if (!qq.hasClass(element, name)) {
            element.className += " " + name;
        }
    };
    qq.removeClass = function(element, name) {
        var re = new RegExp("(^| )" + name + "( |$)");
        element.className = element.className.replace(re, " ").replace(/^\s+|\s+$/g, "");
    };
    qq.setText = function(element, text) {
        element.innerText = text;
        element.textContent = text;
    };
    qq.children = function(element) {
        var children = [],
        child = element.firstChild;
        while (child) {
            if (child.nodeType == 1) {
                children.push(child);
            }
            child = child.nextSibling;
        }
        return children;
    };
    qq.getByClass = function(element, className) {
        if (element.querySelectorAll) {
            return element.querySelectorAll("." + className);
        }
        var result = [];
        var candidates = element.getElementsByTagName("*");
        var len = candidates.length;
        for (var i = 0; i < len; i++) {
            if (qq.hasClass(candidates[i], className)) {
                result.push(candidates[i]);
            }
        }
        return result;
    };
    qq.obj2url = function(obj, temp, prefixDone) {
        var uristrings = [],
        prefix = "&",
        add = function(nextObj, i) {
            var nextTemp = temp ? (/\[\]$/.test(temp)) ? temp: temp + "[" + i + "]": i;
            if ((nextTemp != "undefined") && (i != "undefined")) {
                uristrings.push((typeof nextObj === "object") ? qq.obj2url(nextObj, nextTemp, true) : (Object.prototype.toString.call(nextObj) === "[object Function]") ? encodeURIComponent(nextTemp) + "=" + encodeURIComponent(nextObj()) : encodeURIComponent(nextTemp) + "=" + encodeURIComponent(nextObj));
            }
        };
        if (!prefixDone && temp) {
            prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? "": "&": "?";
            uristrings.push(temp);
            uristrings.push(qq.obj2url(obj));
        } else {
            if ((Object.prototype.toString.call(obj) === "[object Array]") && (typeof obj != "undefined")) {
                for (var i = 0,
                len = obj.length; i < len; ++i) {
                    add(obj[i], i);
                }
            } else {
                if ((typeof obj != "undefined") && (obj !== null) && (typeof obj === "object")) {
                    for (var i in obj) {
                        add(obj[i], i);
                    }
                } else {
                    uristrings.push(encodeURIComponent(temp) + "=" + encodeURIComponent(obj));
                }
            }
        }
        return uristrings.join(prefix).replace(/^&/, "").replace(/%20/g, "+");
    };



    IGrow.extend( { MStorage:MStorage } );
    IGrow.extend( { Util:Util } );
    IGrow.extend( { Q:qq } );

    return IGrow;
}));



;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.cookie = factory();
    }
}(this, function(root, undefined) {
    var Cookie = {
        cookieAPI:{
            get: function(name){
                var nameEQ = name + "=";    
                var ca = document.cookie.split(';');//把cookie分割成组    
                for(var i=0;i < ca.length;i++) {    
                    var c = ca[i];//取得字符串    
                    while (c.charAt(0)==' ') {//判断一下字符串有没有前导空格    
                        c = c.substring(1,c.length);//有的话，从第二位开始取    
                    }    
                    if (c.indexOf(nameEQ) == 0) {//如果含有我们要的name    
                        return unescape(c.substring(nameEQ.length,c.length));//解码并截取我们要值    
                    }    
                }    
                return false;
            },
            set: function(name, value, options){
                if (Cookie.isPlainObject(name)) {
                    for (var k in name) {
                        if (name.hasOwnProperty(k)) this.set(k, name[k], value);
                    }
                }else{
                    var opt = Cookie.isPlainObject(options) ? options : { expires: options },
                        expires = opt.expires !== undefined ? opt.expires : '',
                        expiresType = typeof(expires),
                        path = opt.path !== undefined ? ';path=' + opt.path : ';path=/',
                        domain = opt.domain ? ';domain=' + opt.domain : '',
                        secure = opt.secure ? ';secure' : '';

                    //过期时间
                    if (expiresType === 'string' && expires !== '') expires = new Date(expires);
                    else if (expiresType === 'number') expires = new Date(+new Date + 1000 * 60 * 60 * 24 * expires);
                    if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();


                    document.cookie = name+"="+escape(value)+expires+path+domain+secure;   //转码并赋值    
                }
            },
            remove: function(names){
                names = Cookie.isArray(names) ? names : Cookie.toArray(arguments);
                for (var i = 0, l = names.length; i < l; i++) {
                    this.set(names[i], '', -1);
                }
                return names;  
            },
            clear: function(name){
                return this.remove(Cookie.getKeys(this.all()));
            },
            all:function () {
                if (document.cookie === '') return {};
                var cookies = document.cookie.split('; '),result = {};
                for (var i = 0, l = cookies.length; i < l; i++) {
                    var item = cookies[i].split('=');
                    result[unescape(item[0])] = unescape(item[1]);
                }
                return result;
            }
        },
        // Object.names : return []
        getKeys: Object.names || function (obj) {
            var names = [],name = '';
            for (name in obj) {
                if (obj.hasOwnProperty(name)) names.push(name);
            }
            return names;
        },
        // 所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的
        isPlainObject:function (value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },
        isArray:function (value) { return value instanceof Array },
        toArray:function (value) {
            return Array.prototype.slice.call(value);
        }
    };

    cookie = function (name, value, options){
        //console.log(this)
        var argm = arguments,
        _cookie = function(){
            if (argm.length === 0) return cookie.clear();
            if (Cookie.isPlainObject(name) || (argm.length>1&&name&&value))
                return cookie.set(name, value, options);
            if (value === null) return cookie.remove(name);
            if (argm.length === 1) return cookie.get(name);
            return cookie.all();
        }
        return _cookie()
    }
    for (var a in Cookie.cookieAPI) cookie[a] = Cookie.cookieAPI[a];
    return cookie
}));


/**
 * 
 * 
 */
