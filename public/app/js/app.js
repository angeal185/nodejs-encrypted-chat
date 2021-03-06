! function(t, e) {
    "function" == typeof define && define.amd ? define("castrato/castrato", [], e()) : "object" == typeof exports ? module.exports = e : t.castrato = e
}(this, function() {
    function t(t, e, o, s) {
        var c = [t, o, 1 < o.length];
        if ((i[e] || (i[e] = [])).push(c), r[e])
            for (t = 0, c = [c];
                (o = r[e][t++]) && (n(0, 0, o[0], o[1], c), !s););
    }

    function e(t, e, n) {
        var o = 0;
        if (toSubs = i[e])
            for (; e = toSubs[o++];) e[0] !== t || n && n !== e[1] || toSubs.splice(--o, 1)
    }

    function n(t, e, n, o, c) {
        var a, u, f, d = c || i[e] || [],
            l = d.length,
            m = [];
        if (i["*"] && (d = d.concat(i["*"])), u = a = d.length)
            for (f = o ? function(t) {
                    t && m.push(t), --a || (o(m, l), o = 0)
                } : s; c = d[--u];) c[1](n, c[2] ? f : a--, e);
        !a && o && o(m, l), t && (r[e] || (r[e] = [])).push([n, o])
    }
    var o = 0,
        i = {},
        r = {},
        s = function() {};
    return function() {
        var i = o++;
        return {
            emit: function(t, e, o, i) {
                return !0 !== t && !1 !== t && (i = o, o = e, e = t, t = !1), n(t, e, o, i), this
            },
            on: function(e, n) {
                return t(i, e, n), this
            },
            once: function(n, o) {
                return t(i, n, function t(r, s) {
                    e(i, n, t), o(r, 1 < o.length ? s : s())
                }, !0), this
            },
            off: function(t, n) {
                return e(i, t, n), this
            }
        }
    }
}()), define("castrato", ["castrato/castrato"], function(t) {
        return t
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define("crypto-js/core", [], e) : t.CryptoJS = e()
    }(this, function() {
        var t = t || function(t, e) {
            var n = Object.create || function() {
                    function t() {}
                    return function(e) {
                        var n;
                        return t.prototype = e, n = new t, t.prototype = null, n
                    }
                }(),
                o = {},
                i = o.lib = {},
                r = i.Base = function() {
                    return {
                        extend: function(t) {
                            var e = n(this);
                            return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
                                e.$super.init.apply(this, arguments)
                            }), e.init.prototype = e, e.$super = this, e
                        },
                        create: function() {
                            var t = this.extend();
                            return t.init.apply(t, arguments), t
                        },
                        init: function() {},
                        mixIn: function(t) {
                            for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                            t.hasOwnProperty("toString") && (this.toString = t.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    }
                }(),
                s = i.WordArray = r.extend({
                    init: function(t, n) {
                        t = this.words = t || [], n != e ? this.sigBytes = n : this.sigBytes = 4 * t.length
                    },
                    toString: function(t) {
                        return (t || a).stringify(this)
                    },
                    concat: function(t) {
                        var e = this.words,
                            n = t.words,
                            o = this.sigBytes,
                            i = t.sigBytes;
                        if (this.clamp(), o % 4)
                            for (var r = 0; r < i; r++) {
                                var s = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                                e[o + r >>> 2] |= s << 24 - (o + r) % 4 * 8
                            } else
                                for (var r = 0; r < i; r += 4) e[o + r >>> 2] = n[r >>> 2];
                        return this.sigBytes += i, this
                    },
                    clamp: function() {
                        var e = this.words,
                            n = this.sigBytes;
                        e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4)
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t.words = this.words.slice(0), t
                    },
                    random: function(e) {
                        for (var n, o = [], i = function(e) {
                                var e = e,
                                    n = 987654321,
                                    o = 4294967295;
                                return function() {
                                    n = 36969 * (65535 & n) + (n >> 16) & o, e = 18e3 * (65535 & e) + (e >> 16) & o;
                                    var i = (n << 16) + e & o;
                                    return i /= 4294967296, i += .5, i * (t.random() > .5 ? 1 : -1)
                                }
                            }, r = 0; r < e; r += 4) {
                            var c = i(4294967296 * (n || t.random()));
                            n = 987654071 * c(), o.push(4294967296 * c() | 0)
                        }
                        return new s.init(o, e)
                    }
                }),
                c = o.enc = {},
                a = c.Hex = {
                    stringify: function(t) {
                        for (var e = t.words, n = t.sigBytes, o = [], i = 0; i < n; i++) {
                            var r = e[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            o.push((r >>> 4).toString(16)), o.push((15 & r).toString(16))
                        }
                        return o.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, n = [], o = 0; o < e; o += 2) n[o >>> 3] |= parseInt(t.substr(o, 2), 16) << 24 - o % 8 * 4;
                        return new s.init(n, e / 2)
                    }
                },
                u = c.Latin1 = {
                    stringify: function(t) {
                        for (var e = t.words, n = t.sigBytes, o = [], i = 0; i < n; i++) {
                            var r = e[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            o.push(String.fromCharCode(r))
                        }
                        return o.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, n = [], o = 0; o < e; o++) n[o >>> 2] |= (255 & t.charCodeAt(o)) << 24 - o % 4 * 8;
                        return new s.init(n, e)
                    }
                },
                f = c.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(u.stringify(t)))
                        } catch (t) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return u.parse(unescape(encodeURIComponent(t)))
                    }
                },
                d = i.BufferedBlockAlgorithm = r.extend({
                    reset: function() {
                        this._data = new s.init, this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                    },
                    _process: function(e) {
                        var n = this._data,
                            o = n.words,
                            i = n.sigBytes,
                            r = this.blockSize,
                            c = 4 * r,
                            a = i / c;
                        a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
                        var u = a * r,
                            f = t.min(4 * u, i);
                        if (u) {
                            for (var d = 0; d < u; d += r) this._doProcessBlock(o, d);
                            var l = o.splice(0, u);
                            n.sigBytes -= f
                        }
                        return new s.init(l, f)
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t._data = this._data.clone(), t
                    },
                    _minBufferSize: 0
                }),
                l = (i.Hasher = d.extend({
                    cfg: r.extend(),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t), this.reset()
                    },
                    reset: function() {
                        d.reset.call(this), this._doReset()
                    },
                    update: function(t) {
                        return this._append(t), this._process(), this
                    },
                    finalize: function(t) {
                        t && this._append(t);
                        var e = this._doFinalize();
                        return e
                    },
                    blockSize: 16,
                    _createHelper: function(t) {
                        return function(e, n) {
                            return new t.init(n).finalize(e)
                        }
                    },
                    _createHmacHelper: function(t) {
                        return function(e, n) {
                            return new l.HMAC.init(t, n).finalize(e)
                        }
                    }
                }), o.algo = {});
            return o
        }(Math);
        return t
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define("crypto-js/enc-base64", ["./core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return function() {
            function e(t, e, n) {
                for (var o = [], r = 0, s = 0; s < e; s++)
                    if (s % 4) {
                        var c = n[t.charCodeAt(s - 1)] << s % 4 * 2,
                            a = n[t.charCodeAt(s)] >>> 6 - s % 4 * 2;
                        o[r >>> 2] |= (c | a) << 24 - r % 4 * 8, r++
                    }
                return i.create(o, r)
            }
            var n = t,
                o = n.lib,
                i = o.WordArray,
                r = n.enc;
            r.Base64 = {
                stringify: function(t) {
                    var e = t.words,
                        n = t.sigBytes,
                        o = this._map;
                    t.clamp();
                    for (var i = [], r = 0; r < n; r += 3)
                        for (var s = e[r >>> 2] >>> 24 - r % 4 * 8 & 255, c = e[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255, a = e[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, u = s << 16 | c << 8 | a, f = 0; f < 4 && r + .75 * f < n; f++) i.push(o.charAt(u >>> 6 * (3 - f) & 63));
                    var d = o.charAt(64);
                    if (d)
                        for (; i.length % 4;) i.push(d);
                    return i.join("")
                },
                parse: function(t) {
                    var n = t.length,
                        o = this._map,
                        i = this._reverseMap;
                    if (!i) {
                        i = this._reverseMap = [];
                        for (var r = 0; r < o.length; r++) i[o.charCodeAt(r)] = r
                    }
                    var s = o.charAt(64);
                    if (s) {
                        var c = t.indexOf(s);
                        c !== -1 && (n = c)
                    }
                    return e(t, n, i)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }(), t.enc.Base64
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define("crypto-js/md5", ["./core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return function(e) {
            function n(t, e, n, o, i, r, s) {
                var c = t + (e & n | ~e & o) + i + s;
                return (c << r | c >>> 32 - r) + e
            }

            function o(t, e, n, o, i, r, s) {
                var c = t + (e & o | n & ~o) + i + s;
                return (c << r | c >>> 32 - r) + e
            }

            function i(t, e, n, o, i, r, s) {
                var c = t + (e ^ n ^ o) + i + s;
                return (c << r | c >>> 32 - r) + e
            }

            function r(t, e, n, o, i, r, s) {
                var c = t + (n ^ (e | ~o)) + i + s;
                return (c << r | c >>> 32 - r) + e
            }
            var s = t,
                c = s.lib,
                a = c.WordArray,
                u = c.Hasher,
                f = s.algo,
                d = [];
            ! function() {
                for (var t = 0; t < 64; t++) d[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
            }();
            var l = f.MD5 = u.extend({
                _doReset: function() {
                    this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(t, e) {
                    for (var s = 0; s < 16; s++) {
                        var c = e + s,
                            a = t[c];
                        t[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                    }
                    var u = this._hash.words,
                        f = t[e + 0],
                        l = t[e + 1],
                        m = t[e + 2],
                        p = t[e + 3],
                        h = t[e + 4],
                        g = t[e + 5],
                        y = t[e + 6],
                        v = t[e + 7],
                        _ = t[e + 8],
                        k = t[e + 9],
                        w = t[e + 10],
                        x = t[e + 11],
                        b = t[e + 12],
                        S = t[e + 13],
                        B = t[e + 14],
                        A = t[e + 15],
                        C = u[0],
                        j = u[1],
                        E = u[2],
                        H = u[3];
                    C = n(C, j, E, H, f, 7, d[0]), H = n(H, C, j, E, l, 12, d[1]), E = n(E, H, C, j, m, 17, d[2]), j = n(j, E, H, C, p, 22, d[3]), C = n(C, j, E, H, h, 7, d[4]), H = n(H, C, j, E, g, 12, d[5]), E = n(E, H, C, j, y, 17, d[6]), j = n(j, E, H, C, v, 22, d[7]), C = n(C, j, E, H, _, 7, d[8]), H = n(H, C, j, E, k, 12, d[9]), E = n(E, H, C, j, w, 17, d[10]), j = n(j, E, H, C, x, 22, d[11]), C = n(C, j, E, H, b, 7, d[12]), H = n(H, C, j, E, S, 12, d[13]), E = n(E, H, C, j, B, 17, d[14]), j = n(j, E, H, C, A, 22, d[15]), C = o(C, j, E, H, l, 5, d[16]), H = o(H, C, j, E, y, 9, d[17]), E = o(E, H, C, j, x, 14, d[18]), j = o(j, E, H, C, f, 20, d[19]), C = o(C, j, E, H, g, 5, d[20]), H = o(H, C, j, E, w, 9, d[21]), E = o(E, H, C, j, A, 14, d[22]), j = o(j, E, H, C, h, 20, d[23]), C = o(C, j, E, H, k, 5, d[24]), H = o(H, C, j, E, B, 9, d[25]), E = o(E, H, C, j, p, 14, d[26]), j = o(j, E, H, C, _, 20, d[27]), C = o(C, j, E, H, S, 5, d[28]), H = o(H, C, j, E, m, 9, d[29]), E = o(E, H, C, j, v, 14, d[30]), j = o(j, E, H, C, b, 20, d[31]), C = i(C, j, E, H, g, 4, d[32]), H = i(H, C, j, E, _, 11, d[33]), E = i(E, H, C, j, x, 16, d[34]), j = i(j, E, H, C, B, 23, d[35]), C = i(C, j, E, H, l, 4, d[36]), H = i(H, C, j, E, h, 11, d[37]), E = i(E, H, C, j, v, 16, d[38]), j = i(j, E, H, C, w, 23, d[39]), C = i(C, j, E, H, S, 4, d[40]), H = i(H, C, j, E, f, 11, d[41]), E = i(E, H, C, j, p, 16, d[42]), j = i(j, E, H, C, y, 23, d[43]), C = i(C, j, E, H, k, 4, d[44]), H = i(H, C, j, E, b, 11, d[45]), E = i(E, H, C, j, A, 16, d[46]), j = i(j, E, H, C, m, 23, d[47]), C = r(C, j, E, H, f, 6, d[48]), H = r(H, C, j, E, v, 10, d[49]), E = r(E, H, C, j, B, 15, d[50]), j = r(j, E, H, C, g, 21, d[51]), C = r(C, j, E, H, b, 6, d[52]), H = r(H, C, j, E, p, 10, d[53]), E = r(E, H, C, j, w, 15, d[54]), j = r(j, E, H, C, l, 21, d[55]), C = r(C, j, E, H, _, 6, d[56]), H = r(H, C, j, E, A, 10, d[57]), E = r(E, H, C, j, y, 15, d[58]), j = r(j, E, H, C, S, 21, d[59]), C = r(C, j, E, H, h, 6, d[60]), H = r(H, C, j, E, x, 10, d[61]), E = r(E, H, C, j, m, 15, d[62]), j = r(j, E, H, C, k, 21, d[63]), u[0] = u[0] + C | 0, u[1] = u[1] + j | 0, u[2] = u[2] + E | 0, u[3] = u[3] + H | 0
                },
                _doFinalize: function() {
                    var t = this._data,
                        n = t.words,
                        o = 8 * this._nDataBytes,
                        i = 8 * t.sigBytes;
                    n[i >>> 5] |= 128 << 24 - i % 32;
                    var r = e.floor(o / 4294967296),
                        s = o;
                    n[(i + 64 >>> 9 << 4) + 15] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), n[(i + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
                    for (var c = this._hash, a = c.words, u = 0; u < 4; u++) {
                        var f = a[u];
                        a[u] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8)
                    }
                    return c
                },
                clone: function() {
                    var t = u.clone.call(this);
                    return t._hash = this._hash.clone(), t
                }
            });
            s.MD5 = u._createHelper(l), s.HmacMD5 = u._createHmacHelper(l)
        }(Math), t.MD5
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define("crypto-js/sha1", ["./core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return function() {
            var e = t,
                n = e.lib,
                o = n.WordArray,
                i = n.Hasher,
                r = e.algo,
                s = [],
                c = r.SHA1 = i.extend({
                    _doReset: function() {
                        this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var n = this._hash.words, o = n[0], i = n[1], r = n[2], c = n[3], a = n[4], u = 0; u < 80; u++) {
                            if (u < 16) s[u] = 0 | t[e + u];
                            else {
                                var f = s[u - 3] ^ s[u - 8] ^ s[u - 14] ^ s[u - 16];
                                s[u] = f << 1 | f >>> 31
                            }
                            var d = (o << 5 | o >>> 27) + a + s[u];
                            d += u < 20 ? (i & r | ~i & c) + 1518500249 : u < 40 ? (i ^ r ^ c) + 1859775393 : u < 60 ? (i & r | i & c | r & c) - 1894007588 : (i ^ r ^ c) - 899497514, a = c, c = r, r = i << 30 | i >>> 2, i = o, o = d
                        }
                        n[0] = n[0] + o | 0, n[1] = n[1] + i | 0, n[2] = n[2] + r | 0, n[3] = n[3] + c | 0, n[4] = n[4] + a | 0
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            e = t.words,
                            n = 8 * this._nDataBytes,
                            o = 8 * t.sigBytes;
                        return e[o >>> 5] |= 128 << 24 - o % 32, e[(o + 64 >>> 9 << 4) + 14] = Math.floor(n / 4294967296), e[(o + 64 >>> 9 << 4) + 15] = n, t.sigBytes = 4 * e.length, this._process(), this._hash
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                });
            e.SHA1 = i._createHelper(c), e.HmacSHA1 = i._createHmacHelper(c)
        }(), t.SHA1
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define("crypto-js/hmac", ["./core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        ! function() {
            var e = t,
                n = e.lib,
                o = n.Base,
                i = e.enc,
                r = i.Utf8,
                s = e.algo;
            s.HMAC = o.extend({
                init: function(t, e) {
                    t = this._hasher = new t.init, "string" == typeof e && (e = r.parse(e));
                    var n = t.blockSize,
                        o = 4 * n;
                    e.sigBytes > o && (e = t.finalize(e)), e.clamp();
                    for (var i = this._oKey = e.clone(), s = this._iKey = e.clone(), c = i.words, a = s.words, u = 0; u < n; u++) c[u] ^= 1549556828, a[u] ^= 909522486;
                    i.sigBytes = s.sigBytes = o, this.reset()
                },
                reset: function() {
                    var t = this._hasher;
                    t.reset(), t.update(this._iKey)
                },
                update: function(t) {
                    return this._hasher.update(t), this
                },
                finalize: function(t) {
                    var e = this._hasher,
                        n = e.finalize(t);
                    e.reset();
                    var o = e.finalize(this._oKey.clone().concat(n));
                    return o
                }
            })
        }()
    }),
    function(t, e, n) {
        "object" == typeof exports ? module.exports = exports = e(require("./core"), require("./sha1"), require("./hmac")) : "function" == typeof define && define.amd ? define("crypto-js/evpkdf", ["./core", "./sha1", "./hmac"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return function() {
            var e = t,
                n = e.lib,
                o = n.Base,
                i = n.WordArray,
                r = e.algo,
                s = r.MD5,
                c = r.EvpKDF = o.extend({
                    cfg: o.extend({
                        keySize: 4,
                        hasher: s,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var n = this.cfg, o = n.hasher.create(), r = i.create(), s = r.words, c = n.keySize, a = n.iterations; s.length < c;) {
                            u && o.update(u);
                            var u = o.update(t).finalize(e);
                            o.reset();
                            for (var f = 1; f < a; f++) u = o.finalize(u), o.reset();
                            r.concat(u)
                        }
                        return r.sigBytes = 4 * c, r
                    }
                });
            e.EvpKDF = function(t, e, n) {
                return c.create(n).compute(t, e)
            }
        }(), t.EvpKDF
    }),
    function(t, e, n) {
        "object" == typeof exports ? module.exports = exports = e(require("./core"), require("./evpkdf")) : "function" == typeof define && define.amd ? define("crypto-js/cipher-core", ["./core", "./evpkdf"], e) : e(t.CryptoJS)
    }(this, function(t) {
        t.lib.Cipher || function(e) {
            var n = t,
                o = n.lib,
                i = o.Base,
                r = o.WordArray,
                s = o.BufferedBlockAlgorithm,
                c = n.enc,
                a = (c.Utf8, c.Base64),
                u = n.algo,
                f = u.EvpKDF,
                d = o.Cipher = s.extend({
                    cfg: i.extend(),
                    createEncryptor: function(t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    },
                    init: function(t, e, n) {
                        this.cfg = this.cfg.extend(n), this._xformMode = t, this._key = e, this.reset()
                    },
                    reset: function() {
                        s.reset.call(this), this._doReset()
                    },
                    process: function(t) {
                        return this._append(t), this._process()
                    },
                    finalize: function(t) {
                        t && this._append(t);
                        var e = this._doFinalize();
                        return e
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function t(t) {
                            return "string" == typeof t ? b : k
                        }
                        return function(e) {
                            return {
                                encrypt: function(n, o, i) {
                                    return t(o).encrypt(e, n, o, i)
                                },
                                decrypt: function(n, o, i) {
                                    return t(o).decrypt(e, n, o, i)
                                }
                            }
                        }
                    }()
                }),
                l = (o.StreamCipher = d.extend({
                    _doFinalize: function() {
                        var t = this._process(!0);
                        return t
                    },
                    blockSize: 1
                }), n.mode = {}),
                m = o.BlockCipherMode = i.extend({
                    createEncryptor: function(t, e) {
                        return this.Encryptor.create(t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.Decryptor.create(t, e)
                    },
                    init: function(t, e) {
                        this._cipher = t, this._iv = e
                    }
                }),
                p = l.CBC = function() {
                    function t(t, n, o) {
                        var i = this._iv;
                        if (i) {
                            var r = i;
                            this._iv = e
                        } else var r = this._prevBlock;
                        for (var s = 0; s < o; s++) t[n + s] ^= r[s]
                    }
                    var n = m.extend();
                    return n.Encryptor = n.extend({
                        processBlock: function(e, n) {
                            var o = this._cipher,
                                i = o.blockSize;
                            t.call(this, e, n, i), o.encryptBlock(e, n), this._prevBlock = e.slice(n, n + i)
                        }
                    }), n.Decryptor = n.extend({
                        processBlock: function(e, n) {
                            var o = this._cipher,
                                i = o.blockSize,
                                r = e.slice(n, n + i);
                            o.decryptBlock(e, n), t.call(this, e, n, i), this._prevBlock = r
                        }
                    }), n
                }(),
                h = n.pad = {},
                g = h.Pkcs7 = {
                    pad: function(t, e) {
                        for (var n = 4 * e, o = n - t.sigBytes % n, i = o << 24 | o << 16 | o << 8 | o, s = [], c = 0; c < o; c += 4) s.push(i);
                        var a = r.create(s, o);
                        t.concat(a)
                    },
                    unpad: function(t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                },
                y = (o.BlockCipher = d.extend({
                    cfg: d.cfg.extend({
                        mode: p,
                        padding: g
                    }),
                    reset: function() {
                        d.reset.call(this);
                        var t = this.cfg,
                            e = t.iv,
                            n = t.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var o = n.createEncryptor;
                        else {
                            var o = n.createDecryptor;
                            this._minBufferSize = 1
                        }
                        this._mode && this._mode.__creator == o ? this._mode.init(this, e && e.words) : (this._mode = o.call(n, this, e && e.words), this._mode.__creator = o)
                    },
                    _doProcessBlock: function(t, e) {
                        this._mode.processBlock(t, e)
                    },
                    _doFinalize: function() {
                        var t = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            t.pad(this._data, this.blockSize);
                            var e = this._process(!0)
                        } else {
                            var e = this._process(!0);
                            t.unpad(e)
                        }
                        return e
                    },
                    blockSize: 4
                }), o.CipherParams = i.extend({
                    init: function(t) {
                        this.mixIn(t)
                    },
                    toString: function(t) {
                        return (t || this.formatter).stringify(this)
                    }
                })),
                v = n.format = {},
                _ = v.OpenSSL = {
                    stringify: function(t) {
                        var e = t.ciphertext,
                            n = t.salt;
                        if (n) var o = r.create([1398893684, 1701076831]).concat(n).concat(e);
                        else var o = e;
                        return o.toString(a)
                    },
                    parse: function(t) {
                        var e = a.parse(t),
                            n = e.words;
                        if (1398893684 == n[0] && 1701076831 == n[1]) {
                            var o = r.create(n.slice(2, 4));
                            n.splice(0, 4), e.sigBytes -= 16
                        }
                        return y.create({
                            ciphertext: e,
                            salt: o
                        })
                    }
                },
                k = o.SerializableCipher = i.extend({
                    cfg: i.extend({
                        format: _
                    }),
                    encrypt: function(t, e, n, o) {
                        o = this.cfg.extend(o);
                        var i = t.createEncryptor(n, o),
                            r = i.finalize(e),
                            s = i.cfg;
                        return y.create({
                            ciphertext: r,
                            key: n,
                            iv: s.iv,
                            algorithm: t,
                            mode: s.mode,
                            padding: s.padding,
                            blockSize: t.blockSize,
                            formatter: o.format
                        })
                    },
                    decrypt: function(t, e, n, o) {
                        o = this.cfg.extend(o), e = this._parse(e, o.format);
                        var i = t.createDecryptor(n, o).finalize(e.ciphertext);
                        return i
                    },
                    _parse: function(t, e) {
                        return "string" == typeof t ? e.parse(t, this) : t
                    }
                }),
                w = n.kdf = {},
                x = w.OpenSSL = {
                    execute: function(t, e, n, o) {
                        o || (o = r.random(8));
                        var i = f.create({
                                keySize: e + n
                            }).compute(t, o),
                            s = r.create(i.words.slice(e), 4 * n);
                        return i.sigBytes = 4 * e, y.create({
                            key: i,
                            iv: s,
                            salt: o
                        })
                    }
                },
                b = o.PasswordBasedCipher = k.extend({
                    cfg: k.cfg.extend({
                        kdf: x
                    }),
                    encrypt: function(t, e, n, o) {
                        o = this.cfg.extend(o);
                        var i = o.kdf.execute(n, t.keySize, t.ivSize);
                        o.iv = i.iv;
                        var r = k.encrypt.call(this, t, e, i.key, o);
                        return r.mixIn(i), r
                    },
                    decrypt: function(t, e, n, o) {
                        o = this.cfg.extend(o), e = this._parse(e, o.format);
                        var i = o.kdf.execute(n, t.keySize, t.ivSize, e.salt);
                        o.iv = i.iv;
                        var r = k.decrypt.call(this, t, e, i.key, o);
                        return r
                    }
                })
        }()
    }),
    function(t, e, n) {
        "object" == typeof exports ? module.exports = exports = e(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" == typeof define && define.amd ? define("crypto-js/aes", ["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return function() {
            var e = t,
                n = e.lib,
                o = n.BlockCipher,
                i = e.algo,
                r = [],
                s = [],
                c = [],
                a = [],
                u = [],
                f = [],
                d = [],
                l = [],
                m = [],
                p = [];
            ! function() {
                for (var t = [], e = 0; e < 256; e++) e < 128 ? t[e] = e << 1 : t[e] = e << 1 ^ 283;
                for (var n = 0, o = 0, e = 0; e < 256; e++) {
                    var i = o ^ o << 1 ^ o << 2 ^ o << 3 ^ o << 4;
                    i = i >>> 8 ^ 255 & i ^ 99, r[n] = i, s[i] = n;
                    var h = t[n],
                        g = t[h],
                        y = t[g],
                        v = 257 * t[i] ^ 16843008 * i;
                    c[n] = v << 24 | v >>> 8, a[n] = v << 16 | v >>> 16, u[n] = v << 8 | v >>> 24, f[n] = v;
                    var v = 16843009 * y ^ 65537 * g ^ 257 * h ^ 16843008 * n;
                    d[i] = v << 24 | v >>> 8, l[i] = v << 16 | v >>> 16, m[i] = v << 8 | v >>> 24, p[i] = v, n ? (n = h ^ t[t[t[y ^ h]]], o ^= t[t[o]]) : n = o = 1
                }
            }();
            var h = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                g = i.AES = o.extend({
                    _doReset: function() {
                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                            for (var t = this._keyPriorReset = this._key, e = t.words, n = t.sigBytes / 4, o = this._nRounds = n + 6, i = 4 * (o + 1), s = this._keySchedule = [], c = 0; c < i; c++)
                                if (c < n) s[c] = e[c];
                                else {
                                    var a = s[c - 1];
                                    c % n ? n > 6 && c % n == 4 && (a = r[a >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a]) : (a = a << 8 | a >>> 24, a = r[a >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a], a ^= h[c / n | 0] << 24), s[c] = s[c - n] ^ a
                                }
                            for (var u = this._invKeySchedule = [], f = 0; f < i; f++) {
                                var c = i - f;
                                if (f % 4) var a = s[c];
                                else var a = s[c - 4];
                                f < 4 || c <= 4 ? u[f] = a : u[f] = d[r[a >>> 24]] ^ l[r[a >>> 16 & 255]] ^ m[r[a >>> 8 & 255]] ^ p[r[255 & a]]
                            }
                        }
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._keySchedule, c, a, u, f, r)
                    },
                    decryptBlock: function(t, e) {
                        var n = t[e + 1];
                        t[e + 1] = t[e + 3], t[e + 3] = n, this._doCryptBlock(t, e, this._invKeySchedule, d, l, m, p, s);
                        var n = t[e + 1];
                        t[e + 1] = t[e + 3], t[e + 3] = n
                    },
                    _doCryptBlock: function(t, e, n, o, i, r, s, c) {
                        for (var a = this._nRounds, u = t[e] ^ n[0], f = t[e + 1] ^ n[1], d = t[e + 2] ^ n[2], l = t[e + 3] ^ n[3], m = 4, p = 1; p < a; p++) {
                            var h = o[u >>> 24] ^ i[f >>> 16 & 255] ^ r[d >>> 8 & 255] ^ s[255 & l] ^ n[m++],
                                g = o[f >>> 24] ^ i[d >>> 16 & 255] ^ r[l >>> 8 & 255] ^ s[255 & u] ^ n[m++],
                                y = o[d >>> 24] ^ i[l >>> 16 & 255] ^ r[u >>> 8 & 255] ^ s[255 & f] ^ n[m++],
                                v = o[l >>> 24] ^ i[u >>> 16 & 255] ^ r[f >>> 8 & 255] ^ s[255 & d] ^ n[m++];
                            u = h, f = g, d = y, l = v
                        }
                        var h = (c[u >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[d >>> 8 & 255] << 8 | c[255 & l]) ^ n[m++],
                            g = (c[f >>> 24] << 24 | c[d >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & u]) ^ n[m++],
                            y = (c[d >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & f]) ^ n[m++],
                            v = (c[l >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & d]) ^ n[m++];
                        t[e] = h, t[e + 1] = g, t[e + 2] = y, t[e + 3] = v
                    },
                    keySize: 8
                });
            e.AES = o._createHelper(g)
        }(), t.AES
    }),
    function(t, e) {
        "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define("crypto-js/enc-utf8", ["./core"], e) : e(t.CryptoJS)
    }(this, function(t) {
        return t.enc.Utf8
    }), define("$.utils", ["websocket", "crypto-js/aes", "crypto-js/sha1", "crypto-js/enc-utf8"], function(t, e, n, o) {
        var i = {},
            r = /^\d+$/;
        return i.io = t, i.SHA1 = function(t) {
            return n(t).toString()
        }, i.AES = {
            decrypt: function(t, n) {
                return e.decrypt(t, n).toString(o)
            },
            encrypt: function(t, n) {
                return e.encrypt(t, n).toString()
            }
        }, i.ssplit = function(t, e) {
            var n = t.split(e);
            return [n.shift(), n.join(e)]
        }, i.activeElement = function() {
            try {
                return document.activeElement
            } catch (t) {
                return
            }
        }, i.isDigits = function(t) {
            return r.test(t)
        }, i.template = function(t, e) {
            return t && t.replace(/{(\w+)}/gi, function(t, n) {
                return e.hasOwnProperty(n) ? e[n] : t
            })
        }, i.getJSON = function(t, e, n) {
            var o = new XMLHttpRequest;
            o.open("GET", t, !0), o.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (this.status >= 200 && this.status < 400) try {
                        e && e(JSON.parse(this.responseText))
                    } catch (t) {
                        n && n()
                    } else n && n()
            }, o.send(), o = null
        }, i.escapeHtml = function() {
            var t = /[&<>"'\/]/g,
                e = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                };
            return function(n) {
                return String(n).replace(t, function(t) {
                    return e[t]
                })
            }
        }(), i
    }), define("$.proto", [], function() {
        var t = {};
        return t.html = function(t) {
            return this.forEach(function(e) {
                e.innerHTML = t
            }), this
        }, t.append = function(t) {
            return this.forEach(function(e) {
                e.innerHTML += t
            }), this
        }, t.first = function() {
            return this[0]
        }, t.on = function(t, e) {
            return this.forEach(function(n) {
                n.addEventListener ? n.addEventListener(t, e, !1) : n.attachEvent && n.attachEvent("on" + t, e)
            }), this
        }, t.focus = function() {
            return this[0] && this[0].focus(), this
        }, t
    }), define("$", ["$.utils", "$.proto"], function(t, e) {
        function n() {}

        function o(t) {
            var e, o = new n;
            if (void 0 !== t)
                if (t === document) o.push(document);
                else if (t === window) o.push(window);
            else if (e = document.querySelectorAll(t))
                for (var i = 0; i < e.length; i++) o.push(e[i]);
            return o
        }
        n.prototype = new Array;
        for (var i in e) n.prototype[i] = e[i];
        for (var r in t) o[r] = t[r];
        return o
    }), define("settings", {
        title: "Chat-App - Online",
        ttl: 6e5,
        motd: "<pre></pre>",
        nick: {
            maxLen: 20,
            minLen: 2
        },
        key: {
            maxLen: 1024,
            minLen: 8
        },
        room: {
            minLen: 1,
            maxLen: 64
        },
        notifications: {
            maxOnePerMs: 3e3
        }
    }), define("templates", {
        help: "<pre>                                                                \nChat-App, encrypted instant chat.                                      \n                                                                       \n----------------------------------------------------------------------\t\n                                                                       \nClient:                                                    \t\t\t\n\t/key\t\tStrongPassphrase\tSets encryption key                 \n\t/nick\t\tNickName\t\tSets an optional nick                   \n\t/mute  \t\t\t\t\tAudio on\t\t\t\t\t\t\t\t\t\n\t/unmute  \t\t\t\tAudio off\t\t\t\t\t\t\t\t\t\n\t/clear\t\t\t\t\tClear on-screen buffer                      \n\t/help\t\t\t\t\tThis                                        \n\t/title\t\t\t\t\tSet your local page title\t\t\t\t\t\n\t/torch\t\tAfterSeconds\t\tConsole messages are torched  \t\t\n\t\t\t\t\t\tafter this amount of seconds \t\t\t\t\t\n\t\t\t\t\t\t(default 600).\t\t\t\t\t\t\t\t\t\n                                                                       \nRoom:                                                    \t\t\t\t\n\t/join\t\tRoomId\t\t\tJoin a room\t                            \n\t/leave\t\t\t\t\tLeave the room                              \n\t/count\t\t\t\t\tCount participants                          \n                                                                       \nHost:  \t\t                                                    \t\n\t/hosts\t\t\t\t\tList available hosts                   \t\t\n\t/connect\tHostIndex\t\tConnect to selected host               \t\n\t/disconnect\t\t\t\tDisconnect from host    \t\t\t        \n                                                                       \nYou can select any of the five last commands/messages with up/down key.\n                                                                       \nDue to security reasons, /key command is not saved, and command        \nhistory is  automatically cleared after one minute of inactivity.      \n                                                                       \n<strong>It is highly recommended to use incognito mode while chatting, \nto prevent browsers from keeping history or cache.</strong>            \n                                                                       \n----------------------------------------------------------------------\t\n</pre>",
        default_nick: "Anonymous",
        post: {
            motd: '<li id="{id}"><i class="motd">{text}</i></li>',
            info: '<li id="{id}"><i class="timestamp">[{timestamp}] </i>INF&gt; <i class="info">{text}</i></li>',
            server: '<li id="{id}"><i class="timestamp">[{timestamp}] </i>SRV&gt; <i class="server">{text}</i></li>',
            error: '<li id="{id}"><i class="timestamp">[{timestamp}] </i>ERR&gt; <i class="error">{text}</i></li>',
            message: '<li id="{id}"><i class="timestamp">[{timestamp}] </i>MSG&gt; <i class="nick">{nick}&gt;</i> <i class="message">{text}</i></li>'
        },
        messages: {
            key_to_short: "Hmm, that's a weak key, try again...",
            key_to_long: "Man that's a long key. Make it a tad short, 'kay?",
            key_ok: "Key set, you can now start communicating.",
            key_no_host: "You have to connect to a host before setting the key.",
            join_no_host: "You have to connect to a host before joining a room.",
            nick_to_short: "Nickname is too short, it has to be at least {nick_minLen} characters long. Try again.",
            nick_to_long: "Nickname is too long, it can be at most {nick_maxLen} characters long. Try again.",
            nick_set: "From now on, you're referred to as '{nick}'.",
            msg_no_room: "You have to join a room before sending messages. See /help.",
            not_in_room: "You have to be in a room to count participants...",
            msg_no_key: "You have to set an encryption key before sending a message. See /help.",
            leave_from_nowhere: "How are you supposed to leave, while being nowhere?",
            torch_is_now: "Messages are now torched after {ttl} seconds.",
            torch_not_set: "Invalid torch delay entered, nothing changed. See /help.",
            title_set: "The title of this window is now '{title}'.",
            muted: "Notifications and sounds are now muted.",
            unmuted: "Notifications and sounds are now on.",
            unrecognized_command: 'Unrecognized command: "{commandName}"',
            room_name_too_long: "Isn't that a bit long?",
            room_name_too_short: "Nah, too short.",
            joined_room: "Joined room {roomName}.",
            left_room: "Left room {roomName}.",
            already_in_room: "You are already in a room ({room}), stoopid.",
            unable_to_decrypt: "Unabled to decrypt received message, keys does not match.",
            socket_error: "A network error has occurred. A restart may be required to bring back full functionality.<br>Examine the logs for more details.",
            connecting: "Connecting to host {host}...",
            connected: "A connection to the server has been established. Happy chatting!",
            disconnected: "Disconnected from host {host}.",
            already_connected: "You have to disconnect from {host} before joining another.",
            reconnect_no_host: "There is no host to reconnect with.",
            host_available: '<span class="info">{index}</span>\t<span class="good">[AVAILABLE]</span>\t<span class="neutral">{name}</span>\n',
            host_unavailable: '<span class="info">{index}</span>\t<span class="bad">[UNAVAILABLE]</span>\t<span class="neutral">{name}</span>\n'
        },
        server: {
            person_joined: "A person joined this room.",
            person_left: "A person left this room.",
            person_count: "There is {payload} person(s) in this room, including you.",
            command_failed: "Server command failed, you're probably trying to du something bogus.",
            bogus: "Received a bogus message from server."
        },
        client: {
            title: "Chat-App - Offline"
        }
    }), define("hosts", {
        autoconnect: 0,
        hosts: [{
            name: "default",
            host: "",
            path: "/app/js/lib/settings.js"
        }]
    }), define("window", ["castrato"], function(t) {
        var e = {},
            n = function() {
                t.emit("window:focused")
            },
            o = function() {
                t.emit("window:blurred")
            };
        return e.setTitle = function(t) {
            document.title = t
        }, e.getTitle = function() {
            return document.title
        }, window.addEventListener ? (window.addEventListener("focus", n, !0), window.addEventListener("blur", o, !0)) : (window.observe("focusin", n), window.observe("focusout", o)), t.on("window:title", e.setTitle), e
    }), define("host", ["$", "castrato", "settings", "templates", "hosts", "window"], function(t, e, n, o, i) {
        var r, s, c = {},
            a = function(t) {
                r && r.emit(t.data, t.payload)
            },
            u = function() {
                e.emit("info", JSON.stringify(s || {}))
            },
            f = function(n, r) {
                var s, c = 0,
                    a = i.hosts.length,
                    u = "\n",
                    f = function(n, i, s) {
                        return function(c) {
                            n.settings = s ? c : 0, u += t.template(o.messages[s ? "host_available" : "host_unavailable"], {
                                name: n.name,
                                path: n.path,
                                index: i
                            }), 0 === --a && (e.emit("console:info", u), r())
                        }
                    };
                for (n = n && "force" === n.toLowerCase(); s = i.hosts[c];) n || void 0 === s.settings ? require([s.path], f(s, c, 1), f(s, c, 0)) : s.settings ? f(s, c, 1)() : f(s, c, 0)(), c++
            },
            d = function(a, u) {
                e.emit("console:lockInput");
                var f;
                if (a = void 0 === a ? i.autoconnect : a, s && s.connected) return e.emit("console:error", t.template(o.messages.already_connected, {
                    host: s.name || "localhost"
                })), void e.emit("console:unlockInput");
                if (t.isDigits(a)) {
                    if (!(s = i.hosts[+a])) return e.emit("console:error", "Undefined host index: " + a), void e.emit("console:unlockInput");
                    s.settings ? n = s.settings : f = s.path
                } else a ? f = a.settings : n = a.settings;
                return f ? require([f], function(t) {
                    return s.settings = t, d(a, u)
                }, function() {
                    e.emit("console:error", "Could not fetch host settings: " + f), e.emit("console:unlockInput")
                }) : (e.emit("console:info", t.template(o.messages.connecting, {
                    host: s.name || "localhost"
                })), e.emit("console:motd", s.settings.motd), r = t.io(s.host, {
                    forceNew: !0,
                    "force new connection": !0
                }), void r.on("room:joined", function() {
                    e.emit("console:info", t.template(o.messages.joined_room, {
                        roomName: t.escapeHtml(c.room)
                    })), r.emit("room:count")
                }).on("room:left", function() {
                    e.emit("console:info", t.template(o.messages.left_room, {
                        roomName: t.escapeHtml(c.room)
                    })), e.emit("room:changed", !1)
                }).on("message:send", function(n) {
                    var i = t.AES.decrypt(n.msg, t.SHA1(c.room) + c.key),
                        r = t.escapeHtml(i),
                        s = n.nick ? t.escapeHtml(t.AES.decrypt(n.nick, t.SHA1(c.room) + c.key)) : o.default_nick;
                    i ? e.emit("console:message", {
                        message: r,
                        nick: s
                    }) : e.emit("console:error", o.messages.unable_to_decrypt)
                }).on("message:server", function(n) {
                    if (n.msg) {
                        var i = t.escapeHtml(n.msg);
                        if (o.server[i])
                            if (void 0 !== n.payload) {
                                var r = t.escapeHtml(n.payload);
                                e.emit("console:server", t.template(o.server[i], {
                                    payload: r
                                }))
                            } else e.emit("console:server", o.server[i]);
                        else e.emit("console:error", o.server.bogus)
                    } else e.emit("console:error", o.server.bogus)
                }).on("connect", function() {
                    e.emit("console:info", t.template(o.messages.connected, {
                        host: s.name || "localhost"
                    })), e.emit("window:title", s.settings.title), e.emit("console:unlockInput"), u(), s.connected = 1
                }).on("disconnect", function() {
                    s.connected = 0, e.emit("console:info", t.template(o.messages.disconnected, {
                        host: s.name || "localhost"
                    })), e.emit("room:changed", void 0), e.emit("window:title", o.client.title)
                }).on("connect_error", function() {
                    s.connected = 0, e.emit("console:error", o.messages.socket_error), e.emit("console:unlockInput")
                }))
            },
            l = function(t, n) {
                return s ? void(s.connected ? (m(), d(s, n)) : d(s, n)) : (n(), e.emit("console:error", o.messages.reconnect_no_host))
            },
            m = function() {
                r.disconnect()
            },
            p = function(t) {
                c = Object.assign({}, c, t)
            };
        e.on("command:host", u), e.on("command:hosts", f), e.on("command:connect", d), e.on("command:disconnect", m), e.on("command:reconnect", l), e.on("socket:emit", a), e.on("host:param", p)
    }), define("client", ["$", "castrato", "settings", "templates"], function(t, e, n, o) {
        var i, r, s = function(t) {
                return t.length > n.key.maxLen ? e.emit("console:error", o.messages.key_to_long) : t.length < n.key.minLen ? e.emit("console:error", o.messages.key_to_short) : (r = t, e.emit("key:changed", r), e.emit("console:info", o.messages.key_ok))
            },
            c = function() {
                e.emit("console:motd", o.help)
            },
            a = function() {
                e.emit("console:clear")
            },
            u = function(t) {
                e.emit("console:torch", t)
            },
            f = function(r) {
                return r.length > n.nick.maxLen ? e("console:error", t.template(o.messages.nick_to_long, {
                    nick_maxLen: n.nick.maxLen
                })) : r.length < n.nick.minLen ? e("console:error", t.template(o.messages.nick_to_short, {
                    nick_minLen: n.nick.minLen
                })) : (i = r, e.emit("nick:changed", i), void e.emit("console:info", t.template(o.messages.nick_set, {
                    nick: t.escapeHtml(i)
                })))
            },
            d = function(n) {
                e.emit("window:title", n), e.emit("console:info", t.template(o.messages.title_set, {
                    title: t.escapeHtml(n)
                }))
            };
        e.on("command:help", c), e.on("command:clear", a), e.on("command:nick", f), e.on("command:key", s), e.on("command:torch", u),
            e.on("command:title", d)
    }), define("sounds", {
        message: [
            [523.26, 0, 50],
            [784.89, 0, 50],
            [1046.52, 50, 50],
            [1308.15, 50, 50]
        ],
        person_joined: [
            [784.89, 0, 200],
            [261.63, 0, 200],
            [784.89, 200, 500],
            [523.26, 200, 500]
        ],
        person_left: [
            [784.89, 0, 200],
            [523.26, 0, 200],
            [784.89, 200, 500],
            [261.63, 200, 500]
        ]
    }), define("room", ["$", "castrato", "settings", "templates"], function(t, e, n, o) {
        var i = !1,
            r = function(r) {
                i !== !1 ? e.emit("console:error", t.template(o.messages.already_in_room, {
                    room: i
                })) : r.length >= n.room.maxLen ? e.emit("console:error", t.template(o.messages.room_name_too_long)) : r.length < n.room.minLen ? e.emit("console:error", t.template(o.messages.room_name_too_short)) : (i = r, e.emit("room:changed", i).emit("socket:emit", {
                    data: "room:join",
                    payload: t.SHA1(i)
                }))
            },
            s = function() {
                i !== !1 ? (e.emit("socket:emit", {
                    data: "room:leave",
                    payload: t.SHA1(i)
                }), i = !1) : e.emit("console:error", o.messages.leave_from_nowhere)
            },
            c = function() {
                i ? e.emit("socket:emit", {
                    data: "room:count"
                }) : e.emit("console:error", o.messages.not_in_room)
            };
        e.on("command:join", r), e.on("command:leave", s), e.on("command:count", c)
    }), define("notifications", ["castrato", "window", "settings"], function(t, e, n) {
        var o, i, r, s, c, a = !0,
            u = !1,
            f = function() {
                return performance.now() || Date.now()
            },
            d = function() {
                a = !0
            },
            l = function() {
                a = !1
            },
            m = function() {
                clearTimeout(r), void 0 !== i && e.setTitle(i), i = void 0, o = void 0
            },
            p = function() {
                a ? (e.getTitle() === i ? e.setTitle(o) : e.setTitle(i), r = setTimeout(p, s)) : m()
            },
            h = function() {
                u && "denied" !== Notification.permission && Notification.requestPermission(function(t) {
                    Notification.permission = t
                })
            },
            g = function(t, n) {
                s = void 0 === n ? 1e3 : n, a && void 0 === i && (o = t, i = e.getTitle(), p())
            },
            y = function(t, e, o, i) {
                if (a && f() - c > n.notifications.maxOnePerMs)
                    if (void 0 === i && (i = !1), u && "granted" === Notification.permission) {
                        var r = new Notification(t, {
                            body: e,
                            icon: o
                        });
                        r.onshow = function() {
                            setTimeout(function() {
                                r.close()
                            }, 3e3)
                        }, c = f()
                    } else i && g("Attention", 1e3)
            };
        u = void 0 !== window.Notification, t.on("notification:send", function(t) {
            y(t.title, t.body, t.icon, !0)
        }), t.on("notification:on", function() {
            d()
        }), t.on("notification:off", function() {
            l()
        }), h(), l(), c = f(), m()
    }), define("queue", [], function() {
        var t = {},
            e = [],
            n = function() {
                return performance.now() || Date.now()
            };
        return t.add_function_delayed = function(t, o, i) {
            e.push({
                func: o,
                pushed: n(),
                delay: t,
                data: i
            })
        }, t.get = function() {
            return e
        }, t.run = function() {
            for (var o, i, r = 0; o = e[r++];) n() - o.pushed > o.delay && (o.func(), e.splice(r - 1, 1));
            if (e.length) {
                for (i = n(); n() - i < 1;);
                t.run()
            }
        }, t
    }), define("audio", ["queue", "castrato", "templates"], function(t, e, n) {
        var o = !1,
            i = !0,
            r = !1,
            s = function(e, n) {
                if (n = void 0 === n ? 0 : n, o && i && n < Object.keys(e).length && !r) {
                    var c = e[n],
                        a = c[0],
                        u = c[1],
                        f = c[2],
                        d = o.createOscillator(),
                        l = o.createGain();
                    d.frequency.value = a, d.connect(l), l.gain.value = .25, l.connect(o.destination), t.add_function_delayed(u, function() {
                        d.noteOn ? d.noteOn(0) : d.start(0)
                    }), t.add_function_delayed(u + f, function() {
                        d.noteOff ? d.noteOff(0) : d.stop(0)
                    }), n++, n < Object.keys(e).length ? s(e, n) : t.run()
                }
            },
            c = function() {
                i = !0
            },
            a = function() {
                i = !1
            },
            u = function() {
                r = !0, e.emit("console:info", n.messages.muted)
            },
            f = function() {
                r = !1, e.emit("console:info", n.messages.unmuted)
            };
        (window.AudioContext || window.webkitAudioContext) && (o = new(window.AudioContext || window.webkitAudioContext)), e.on("audio:play", function(t) {
            s(t)
        }), e.on("audio:on", c), e.on("audio:off", a), e.on("audio:mute", u), e.on("audio:unmute", f)
    }), define("console", ["$", "castrato", "settings", "templates", "sounds", "room", "notifications", "audio"], function(t, e, n, o, i) {
        var r = {
                chat: t("#chat"),
                input: t("#input"),
                inputWrapper: t("#input_wrapper")
            },
            s = {},
            c = {
                post: function(e, i, s) {
                    var a, u = o.post[e],
                        f = "msg_" + (new Date).getTime() + "_" + Math.round(1e6 * Math.random()),
                        d = Object.assign({}, n, {
                            nick: s,
                            timestamp: (new Date).toLocaleTimeString(),
                            id: f
                        });
                    d.text = t.template(i, d), a = t.template(u, d), c.showNotification(e, s, i), setTimeout(function() {
                        var e = r.chat.first(),
                            n = t("#" + f).first();
                        e.removeChild(n)
                    }, n.ttl), r.chat.append(a)
                },
                torch: function(i) {
                    i = parseInt(i), i > 0 && i < 3600 ? (e.emit("console:info", t.template(o.messages.torch_is_now, {
                        ttl: i
                    })), n.ttl = 1e3 * i) : e.emit("console:error", t.template(o.messages.torch_not_set))
                },
                param: function(t) {
                    s = Object.assign({}, s, t)
                },
                showNotification: function(t, n, o) {
                    var r = "message" !== t ? "Chat-App" : n,
                        s = "message" === t ? "gfx/icon_128x128.png" : "error" === t ? "gfx/icon_128x128_error.png" : "gfx/icon_128x128_info.png";
                    e.emit("notification:send", {
                        title: r.substring(0, 20),
                        body: o.substring(0, 80),
                        icon: s
                    }), "message" === t && e.emit("audio:play", i.message)
                },
                motd: function(t) {
                    c.post("motd", t)
                },
                info: function(t) {
                    c.post("info", t)
                },
                error: function(t) {
                    c.post("error", t)
                },
                server: function(t) {
                    c.post("server", t)
                },
                message: function(t) {
                    c.post("message", t.message, t.nick)
                },
                clearInput: function() {
                    r.input[0].value = ""
                },
                clear: function() {
                    r.chat[0].innerHTML = ""
                },
                lockInput: function() {
                    r.input[0].setAttribute("disabled", "disabled"), r.inputWrapper[0].className = "loading"
                },
                unlockInput: function() {
                    r.input[0].removeAttribute("disabled"), r.inputWrapper[0].className = "", r.input.focus()
                },
                _require: function(t, e) {
                    c.lockInput(), c.post("info", "Requiring " + t + "..."), require([t], function() {
                        c.post("info", "Successfully required " + t + "."), c.unlockInput(), e()
                    }, function(n) {
                        c.post("error", 'An error occurred while trying to load "' + t + '":\n' + n), c.unlockInput(), e()
                    })
                }
            },
            a = function(n) {
                var i, a, u, f;
                if (!n.ctrlKey && !n.altKey && r.input[0] !== t.activeElement()) return r.input.focus();
                if (13 === n.keyCode && (i = r.input[0].value))
                    if ("/" === (i[0] || i.slice(0, 1))) a = t.ssplit(i.slice(1), " "), f = a[0], u = a[1], e.emit("command:" + f, u, function(e, n) {
                        return n ? void c.clearInput() : c.post("error", t.template(o.messages.unrecognized_command, {
                            commandName: f
                        }))
                    });
                    else {
                        if (!s.room || !s.key) return s.room ? c.post("error", o.messages.msg_no_key) : c.post("error", o.messages.msg_no_room);
                        e.emit("socket:emit", {
                            data: "message:send",
                            payload: {
                                room: t.SHA1(s.room),
                                msg: t.AES.encrypt(i, t.SHA1(s.room) + s.key).toString(),
                                nick: !!s.nick && t.AES.encrypt(s.nick, t.SHA1(s.room) + s.key).toString()
                            }
                        }), c.clearInput()
                    }
            };
        t(document).on("keydown", a), r.input.focus();
        for (var u in c) "_require" !== u && "post" !== u && e.on("console:" + u, c[u]);
        e.on("console:require", c._require), e.on("console:post", function(t) {
            c.post(t.type, t.data, t.nick)
        })
    }), define("Chat-App", ["castrato", "host", "client", "console"], function(t) {
        t.on("window:focused", function() {
            t.emit("audio:off"), t.emit("notification:off")
        }).on("window:blurred", function() {
            t.emit("audio:on"), t.emit("notification:on")
        }).on("command:mute", function() {
            t.emit("audio:mute")
        }).on("command:unmute", function() {
            t.emit("audio:unmute")
        }).on("room:changed", function(e) {
            t.emit("console:param", {
                room: e
            }).emit("host:param", {
                room: e
            })
        }).on("nick:changed", function(e) {
            t.emit("console:param", {
                nick: e
            })
        }).on("key:changed", function(e) {
            t.emit("console:param", {
                key: e
            }).emit("host:param", {
                key: e
            })
        }).emit("command:connect", void 0, function() {
            (hash = window.location.hash) && (parts = hash.slice(1).split(":"), parts[0] && t.emit("command:join", parts[0]), parts[1] && t.emit("command:key", parts[1]))
        })
    }), require.config({
        baseUrl: "app/js/lib/",
        paths: {
            websocket: "/socket.io/socket.io"
        },
        packages: [{
            name: "crypto-js",
            location: "../vendor/crypto-js-3.1.9",
            main: "index"
        }, {
            name: "castrato",
            location: "../vendor/castrato",
            main: "castrato"
        }]
    }), require(["Chat-App"]), define("main", function() {});