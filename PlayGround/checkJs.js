!(function (e) {
  var r = {};
  function t(s) {
    if (r[s]) return r[s].exports;
    var n = (r[s] = { i: s, l: !1, exports: {} });
    return e[s].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
  }
  (t.m = e),
    (t.c = r),
    (t.d = function (e, r, s) {
      t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: s });
    }),
    (t.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.t = function (e, r) {
      if ((1 & r && (e = t(e)), 8 & r)) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var s = Object.create(null);
      if (
        (t.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & r && "string" != typeof e)
      )
        for (var n in e)
          t.d(
            s,
            n,
            function (r) {
              return e[r];
            }.bind(null, n)
          );
      return s;
    }),
    (t.n = function (e) {
      var r =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(r, "a", r), r;
    }),
    (t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (t.p = ""),
    t((t.s = 6));
})([
  function (e, r, t) {
    (function (t) {
      var s, n, a;
      (n = [e]),
        void 0 ===
          (a =
            "function" ==
            typeof (s = function (e) {
              "use strict";
              if (
                void 0 === window.browser ||
                Object.getPrototypeOf(window.browser) !== Object.prototype ||
                Object.getPrototypeOf(t) !== Object.prototype
              ) {
                const r =
                    "The message port closed before a response was received.",
                  t =
                    "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",
                  s = () => {
                    const e = {
                      alarms: {
                        clear: { minArgs: 0, maxArgs: 1 },
                        clearAll: { minArgs: 0, maxArgs: 0 },
                        get: { minArgs: 0, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                      },
                      bookmarks: {
                        create: { minArgs: 1, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 1 },
                        getChildren: { minArgs: 1, maxArgs: 1 },
                        getRecent: { minArgs: 1, maxArgs: 1 },
                        getSubTree: { minArgs: 1, maxArgs: 1 },
                        getTree: { minArgs: 0, maxArgs: 0 },
                        move: { minArgs: 2, maxArgs: 2 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeTree: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      browserAction: {
                        disable: {
                          minArgs: 0,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        enable: {
                          minArgs: 0,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 },
                        getBadgeText: { minArgs: 1, maxArgs: 1 },
                        getPopup: { minArgs: 1, maxArgs: 1 },
                        getTitle: { minArgs: 1, maxArgs: 1 },
                        openPopup: { minArgs: 0, maxArgs: 0 },
                        setBadgeBackgroundColor: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setBadgeText: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setIcon: { minArgs: 1, maxArgs: 1 },
                        setPopup: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setTitle: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      browsingData: {
                        remove: { minArgs: 2, maxArgs: 2 },
                        removeCache: { minArgs: 1, maxArgs: 1 },
                        removeCookies: { minArgs: 1, maxArgs: 1 },
                        removeDownloads: { minArgs: 1, maxArgs: 1 },
                        removeFormData: { minArgs: 1, maxArgs: 1 },
                        removeHistory: { minArgs: 1, maxArgs: 1 },
                        removeLocalStorage: { minArgs: 1, maxArgs: 1 },
                        removePasswords: { minArgs: 1, maxArgs: 1 },
                        removePluginData: { minArgs: 1, maxArgs: 1 },
                        settings: { minArgs: 0, maxArgs: 0 },
                      },
                      commands: { getAll: { minArgs: 0, maxArgs: 0 } },
                      contextMenus: {
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeAll: { minArgs: 0, maxArgs: 0 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      cookies: {
                        get: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 1, maxArgs: 1 },
                        getAllCookieStores: { minArgs: 0, maxArgs: 0 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      },
                      devtools: {
                        inspectedWindow: { eval: { minArgs: 1, maxArgs: 2 } },
                        panels: {
                          create: {
                            minArgs: 3,
                            maxArgs: 3,
                            singleCallbackArg: !0,
                          },
                        },
                      },
                      downloads: {
                        cancel: { minArgs: 1, maxArgs: 1 },
                        download: { minArgs: 1, maxArgs: 1 },
                        erase: { minArgs: 1, maxArgs: 1 },
                        getFileIcon: { minArgs: 1, maxArgs: 2 },
                        open: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        pause: { minArgs: 1, maxArgs: 1 },
                        removeFile: { minArgs: 1, maxArgs: 1 },
                        resume: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                        show: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      extension: {
                        isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 },
                        isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 },
                      },
                      history: {
                        addUrl: { minArgs: 1, maxArgs: 1 },
                        deleteAll: { minArgs: 0, maxArgs: 0 },
                        deleteRange: { minArgs: 1, maxArgs: 1 },
                        deleteUrl: { minArgs: 1, maxArgs: 1 },
                        getVisits: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                      },
                      i18n: {
                        detectLanguage: { minArgs: 1, maxArgs: 1 },
                        getAcceptLanguages: { minArgs: 0, maxArgs: 0 },
                      },
                      identity: {
                        launchWebAuthFlow: { minArgs: 1, maxArgs: 1 },
                      },
                      idle: { queryState: { minArgs: 1, maxArgs: 1 } },
                      management: {
                        get: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        getSelf: { minArgs: 0, maxArgs: 0 },
                        setEnabled: { minArgs: 2, maxArgs: 2 },
                        uninstallSelf: { minArgs: 0, maxArgs: 1 },
                      },
                      notifications: {
                        clear: { minArgs: 1, maxArgs: 1 },
                        create: { minArgs: 1, maxArgs: 2 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        getPermissionLevel: { minArgs: 0, maxArgs: 0 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      pageAction: {
                        getPopup: { minArgs: 1, maxArgs: 1 },
                        getTitle: { minArgs: 1, maxArgs: 1 },
                        hide: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setIcon: { minArgs: 1, maxArgs: 1 },
                        setPopup: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setTitle: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        show: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      permissions: {
                        contains: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        request: { minArgs: 1, maxArgs: 1 },
                      },
                      runtime: {
                        getBackgroundPage: { minArgs: 0, maxArgs: 0 },
                        getBrowserInfo: { minArgs: 0, maxArgs: 0 },
                        getPlatformInfo: { minArgs: 0, maxArgs: 0 },
                        openOptionsPage: { minArgs: 0, maxArgs: 0 },
                        requestUpdateCheck: { minArgs: 0, maxArgs: 0 },
                        sendMessage: { minArgs: 1, maxArgs: 3 },
                        sendNativeMessage: { minArgs: 2, maxArgs: 2 },
                        setUninstallURL: { minArgs: 1, maxArgs: 1 },
                      },
                      sessions: {
                        getDevices: { minArgs: 0, maxArgs: 1 },
                        getRecentlyClosed: { minArgs: 0, maxArgs: 1 },
                        restore: { minArgs: 0, maxArgs: 1 },
                      },
                      storage: {
                        local: {
                          clear: { minArgs: 0, maxArgs: 0 },
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                          remove: { minArgs: 1, maxArgs: 1 },
                          set: { minArgs: 1, maxArgs: 1 },
                        },
                        managed: {
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                        },
                        sync: {
                          clear: { minArgs: 0, maxArgs: 0 },
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                          remove: { minArgs: 1, maxArgs: 1 },
                          set: { minArgs: 1, maxArgs: 1 },
                        },
                      },
                      tabs: {
                        captureVisibleTab: { minArgs: 0, maxArgs: 2 },
                        create: { minArgs: 1, maxArgs: 1 },
                        detectLanguage: { minArgs: 0, maxArgs: 1 },
                        discard: { minArgs: 0, maxArgs: 1 },
                        duplicate: { minArgs: 1, maxArgs: 1 },
                        executeScript: { minArgs: 1, maxArgs: 2 },
                        get: { minArgs: 1, maxArgs: 1 },
                        getCurrent: { minArgs: 0, maxArgs: 0 },
                        getZoom: { minArgs: 0, maxArgs: 1 },
                        getZoomSettings: { minArgs: 0, maxArgs: 1 },
                        highlight: { minArgs: 1, maxArgs: 1 },
                        insertCSS: { minArgs: 1, maxArgs: 2 },
                        move: { minArgs: 2, maxArgs: 2 },
                        query: { minArgs: 1, maxArgs: 1 },
                        reload: { minArgs: 0, maxArgs: 2 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeCSS: { minArgs: 1, maxArgs: 2 },
                        sendMessage: { minArgs: 2, maxArgs: 3 },
                        setZoom: { minArgs: 1, maxArgs: 2 },
                        setZoomSettings: { minArgs: 1, maxArgs: 2 },
                        update: { minArgs: 1, maxArgs: 2 },
                      },
                      topSites: { get: { minArgs: 0, maxArgs: 0 } },
                      webNavigation: {
                        getAllFrames: { minArgs: 1, maxArgs: 1 },
                        getFrame: { minArgs: 1, maxArgs: 1 },
                      },
                      webRequest: {
                        handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 },
                      },
                      windows: {
                        create: { minArgs: 0, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 2 },
                        getAll: { minArgs: 0, maxArgs: 1 },
                        getCurrent: { minArgs: 0, maxArgs: 1 },
                        getLastFocused: { minArgs: 0, maxArgs: 1 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                    };
                    if (0 === Object.keys(e).length)
                      throw new Error(
                        "api-metadata.json has not been included in browser-polyfill"
                      );
                    class s extends WeakMap {
                      constructor(e, r) {
                        super(r), (this.createItem = e);
                      }
                      get(e) {
                        return (
                          this.has(e) || this.set(e, this.createItem(e)),
                          super.get(e)
                        );
                      }
                    }
                    const n =
                        (e, r) =>
                        (...t) => {
                          chrome.runtime.lastError
                            ? e.reject(chrome.runtime.lastError)
                            : r.singleCallbackArg || t.length <= 1
                            ? e.resolve(t[0])
                            : e.resolve(t);
                        },
                      a = (e) => (1 == e ? "argument" : "arguments"),
                      i = (e, r, t) =>
                        new Proxy(r, {
                          apply: (r, s, n) => t.call(s, e, ...n),
                        });
                    let o = Function.call.bind(Object.prototype.hasOwnProperty);
                    const g = (e, r = {}, t = {}) => {
                        let s = Object.create(null),
                          m = {
                            has: (r, t) => t in e || t in s,
                            get(m, l, c) {
                              if (l in s) return s[l];
                              if (!(l in e)) return;
                              let A = e[l];
                              if ("function" == typeof A)
                                if ("function" == typeof r[l])
                                  A = i(e, e[l], r[l]);
                                else if (o(t, l)) {
                                  let r = ((e, r) =>
                                    function (t, ...s) {
                                      if (s.length < r.minArgs)
                                        throw new Error(
                                          `Expected at least ${r.minArgs} ${a(
                                            r.minArgs
                                          )} for ${e}(), got ${s.length}`
                                        );
                                      if (s.length > r.maxArgs)
                                        throw new Error(
                                          `Expected at most ${r.maxArgs} ${a(
                                            r.maxArgs
                                          )} for ${e}(), got ${s.length}`
                                        );
                                      return new Promise((a, i) => {
                                        if (r.fallbackToNoCallback)
                                          try {
                                            t[e](
                                              ...s,
                                              n({ resolve: a, reject: i }, r)
                                            );
                                          } catch (n) {
                                            console.warn(
                                              e +
                                                " API method doesn't seem to support the callback parameter, falling back to call it without a callback: ",
                                              n
                                            ),
                                              t[e](...s),
                                              (r.fallbackToNoCallback = !1),
                                              (r.noCallback = !0),
                                              a();
                                          }
                                        else
                                          r.noCallback
                                            ? (t[e](...s), a())
                                            : t[e](
                                                ...s,
                                                n({ resolve: a, reject: i }, r)
                                              );
                                      });
                                    })(l, t[l]);
                                  A = i(e, e[l], r);
                                } else A = A.bind(e);
                              else {
                                if (
                                  "object" != typeof A ||
                                  null === A ||
                                  (!o(r, l) && !o(t, l))
                                )
                                  return (
                                    Object.defineProperty(s, l, {
                                      configurable: !0,
                                      enumerable: !0,
                                      get: () => e[l],
                                      set(r) {
                                        e[l] = r;
                                      },
                                    }),
                                    A
                                  );
                                A = g(A, r[l], t[l]);
                              }
                              return (s[l] = A), A;
                            },
                            set: (r, t, n, a) => (
                              t in s ? (s[t] = n) : (e[t] = n), !0
                            ),
                            defineProperty: (e, r, t) =>
                              Reflect.defineProperty(s, r, t),
                            deleteProperty: (e, r) =>
                              Reflect.deleteProperty(s, r),
                          },
                          l = Object.create(e);
                        return new Proxy(l, m);
                      },
                      m = (e) => ({
                        addListener(r, t, ...s) {
                          r.addListener(e.get(t), ...s);
                        },
                        hasListener: (r, t) => r.hasListener(e.get(t)),
                        removeListener(r, t) {
                          r.removeListener(e.get(t));
                        },
                      });
                    let l = !1;
                    const c = new s((e) =>
                        "function" != typeof e
                          ? e
                          : function (r, s, n) {
                              let a,
                                i,
                                o = !1,
                                g = new Promise((e) => {
                                  a = function (r) {
                                    l ||
                                      (console.warn(t, new Error().stack),
                                      (l = !0)),
                                      (o = !0),
                                      e(r);
                                  };
                                });
                              try {
                                i = e(r, s, a);
                              } catch (e) {
                                i = Promise.reject(e);
                              }
                              const m =
                                !0 !== i &&
                                (c = i) &&
                                "object" == typeof c &&
                                "function" == typeof c.then;
                              var c;
                              if (!0 !== i && !m && !o) return !1;
                              const A = (e) => {
                                e.then(
                                  (e) => {
                                    n(e);
                                  },
                                  (e) => {
                                    let r;
                                    (r =
                                      e &&
                                      (e instanceof Error ||
                                        "string" == typeof e.message)
                                        ? e.message
                                        : "An unexpected error occurred"),
                                      n({
                                        __mozWebExtensionPolyfillReject__: !0,
                                        message: r,
                                      });
                                  }
                                ).catch((e) => {
                                  console.error(
                                    "Failed to send onMessage rejected reply",
                                    e
                                  );
                                });
                              };
                              return A(m ? i : g), !0;
                            }
                      ),
                      A = ({ reject: e, resolve: t }, s) => {
                        chrome.runtime.lastError
                          ? chrome.runtime.lastError.message === r
                            ? t()
                            : e(chrome.runtime.lastError)
                          : s && s.__mozWebExtensionPolyfillReject__
                          ? e(new Error(s.message))
                          : t(s);
                      },
                      u = (e, r, t, ...s) => {
                        if (s.length < r.minArgs)
                          throw new Error(
                            `Expected at least ${r.minArgs} ${a(
                              r.minArgs
                            )} for ${e}(), got ${s.length}`
                          );
                        if (s.length > r.maxArgs)
                          throw new Error(
                            `Expected at most ${r.maxArgs} ${a(
                              r.maxArgs
                            )} for ${e}(), got ${s.length}`
                          );
                        return new Promise((e, r) => {
                          const n = A.bind(null, { resolve: e, reject: r });
                          s.push(n), t.sendMessage(...s);
                        });
                      },
                      f = {
                        runtime: {
                          onMessage: m(c),
                          onMessageExternal: m(c),
                          sendMessage: u.bind(null, "sendMessage", {
                            minArgs: 1,
                            maxArgs: 3,
                          }),
                        },
                        tabs: {
                          sendMessage: u.bind(null, "sendMessage", {
                            minArgs: 2,
                            maxArgs: 3,
                          }),
                        },
                      },
                      p = {
                        clear: { minArgs: 1, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      };
                    return (
                      (e.privacy = {
                        network: {
                          networkPredictionEnabled: p,
                          webRTCIPHandlingPolicy: p,
                        },
                        services: { passwordSavingEnabled: p },
                        websites: {
                          hyperlinkAuditingEnabled: p,
                          referrersEnabled: p,
                        },
                      }),
                      g(chrome, f, e)
                    );
                  };
                e.exports = s();
              } else e.exports = t;
            })
              ? s.apply(r, n)
              : s) || (e.exports = a);
    }.call(this, t(0)));
  },
  ,
  function (e, r, t) {
    var s;
    !(function (n, a, i) {
      if (n) {
        for (
          var o,
            g = {
              8: "backspace",
              9: "tab",
              13: "enter",
              16: "shift",
              17: "ctrl",
              18: "alt",
              20: "capslock",
              27: "esc",
              32: "space",
              33: "pageup",
              34: "pagedown",
              35: "end",
              36: "home",
              37: "left",
              38: "up",
              39: "right",
              40: "down",
              45: "ins",
              46: "del",
              91: "meta",
              93: "meta",
              224: "meta",
            },
            m = {
              106: "*",
              107: "+",
              109: "-",
              110: ".",
              111: "/",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
            },
            l = {
              "~": "`",
              "!": "1",
              "@": "2",
              "#": "3",
              $: "4",
              "%": "5",
              "^": "6",
              "&": "7",
              "*": "8",
              "(": "9",
              ")": "0",
              _: "-",
              "+": "=",
              ":": ";",
              '"': "'",
              "<": ",",
              ">": ".",
              "?": "/",
              "|": "\\",
            },
            c = {
              option: "alt",
              command: "meta",
              return: "enter",
              escape: "esc",
              plus: "+",
              mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform)
                ? "meta"
                : "ctrl",
            },
            A = 1;
          A < 20;
          ++A
        )
          g[111 + A] = "f" + A;
        for (A = 0; A <= 9; ++A) g[A + 96] = A.toString();
        (h.prototype.bind = function (e, r, t) {
          return (
            (e = e instanceof Array ? e : [e]),
            this._bindMultiple.call(this, e, r, t),
            this
          );
        }),
          (h.prototype.unbind = function (e, r) {
            return this.bind.call(this, e, function () {}, r);
          }),
          (h.prototype.trigger = function (e, r) {
            return (
              this._directMap[e + ":" + r] &&
                this._directMap[e + ":" + r]({}, e),
              this
            );
          }),
          (h.prototype.reset = function () {
            return (this._callbacks = {}), (this._directMap = {}), this;
          }),
          (h.prototype.stopCallback = function (e, r) {
            if ((" " + r.className + " ").indexOf(" mousetrap ") > -1)
              return !1;
            if (
              (function e(r, t) {
                return null !== r && r !== a && (r === t || e(r.parentNode, t));
              })(r, this.target)
            )
              return !1;
            if ("composedPath" in e && "function" == typeof e.composedPath) {
              var t = e.composedPath()[0];
              t !== e.target && (r = t);
            }
            return (
              "INPUT" == r.tagName ||
              "SELECT" == r.tagName ||
              "TEXTAREA" == r.tagName ||
              r.isContentEditable
            );
          }),
          (h.prototype.handleKey = function () {
            var e = this;
            return e._handleKey.apply(e, arguments);
          }),
          (h.addKeycodes = function (e) {
            for (var r in e) e.hasOwnProperty(r) && (g[r] = e[r]);
            o = null;
          }),
          (h.init = function () {
            var e = h(a);
            for (var r in e)
              "_" !== r.charAt(0) &&
                (h[r] = (function (r) {
                  return function () {
                    return e[r].apply(e, arguments);
                  };
                })(r));
          }),
          h.init(),
          (n.Mousetrap = h),
          e.exports && (e.exports = h),
          void 0 ===
            (s = function () {
              return h;
            }.call(r, t, r, e)) || (e.exports = s);
      }
      function u(e, r, t) {
        e.addEventListener
          ? e.addEventListener(r, t, !1)
          : e.attachEvent("on" + r, t);
      }
      function f(e) {
        if ("keypress" == e.type) {
          var r = String.fromCharCode(e.which);
          return e.shiftKey || (r = r.toLowerCase()), r;
        }
        return g[e.which]
          ? g[e.which]
          : m[e.which]
          ? m[e.which]
          : String.fromCharCode(e.which).toLowerCase();
      }
      function p(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
      }
      function d(e, r, t) {
        return (
          t ||
            (t = (function () {
              if (!o)
                for (var e in ((o = {}), g))
                  (e > 95 && e < 112) || (g.hasOwnProperty(e) && (o[g[e]] = e));
              return o;
            })()[e]
              ? "keydown"
              : "keypress"),
          "keypress" == t && r.length && (t = "keydown"),
          t
        );
      }
      function x(e, r) {
        var t,
          s,
          n,
          a = [];
        for (
          t = (function (e) {
            return "+" === e
              ? ["+"]
              : (e = e.replace(/\+{2}/g, "+plus")).split("+");
          })(e),
            n = 0;
          n < t.length;
          ++n
        )
          (s = t[n]),
            c[s] && (s = c[s]),
            r && "keypress" != r && l[s] && ((s = l[s]), a.push("shift")),
            p(s) && a.push(s);
        return { key: s, modifiers: a, action: (r = d(s, a, r)) };
      }
      function h(e) {
        var r = this;
        if (((e = e || a), !(r instanceof h))) return new h(e);
        (r.target = e), (r._callbacks = {}), (r._directMap = {});
        var t,
          s = {},
          n = !1,
          i = !1,
          o = !1;
        function g(e) {
          e = e || {};
          var r,
            t = !1;
          for (r in s) e[r] ? (t = !0) : (s[r] = 0);
          t || (o = !1);
        }
        function m(e, t, n, a, i, o) {
          var g,
            m,
            l,
            c,
            A = [],
            u = n.type;
          if (!r._callbacks[e]) return [];
          for (
            "keyup" == u && p(e) && (t = [e]), g = 0;
            g < r._callbacks[e].length;
            ++g
          )
            if (
              ((m = r._callbacks[e][g]),
              (a || !m.seq || s[m.seq] == m.level) &&
                u == m.action &&
                (("keypress" == u && !n.metaKey && !n.ctrlKey) ||
                  ((l = t),
                  (c = m.modifiers),
                  l.sort().join(",") === c.sort().join(","))))
            ) {
              var f = !a && m.combo == i,
                d = a && m.seq == a && m.level == o;
              (f || d) && r._callbacks[e].splice(g, 1), A.push(m);
            }
          return A;
        }
        function l(e, t, s, n) {
          r.stopCallback(t, t.target || t.srcElement, s, n) ||
            (!1 === e(t, s) &&
              ((function (e) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
              })(t),
              (function (e) {
                e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
              })(t)));
        }
        function c(e) {
          "number" != typeof e.which && (e.which = e.keyCode);
          var t = f(e);
          t &&
            ("keyup" != e.type || n !== t
              ? r.handleKey(
                  t,
                  (function (e) {
                    var r = [];
                    return (
                      e.shiftKey && r.push("shift"),
                      e.altKey && r.push("alt"),
                      e.ctrlKey && r.push("ctrl"),
                      e.metaKey && r.push("meta"),
                      r
                    );
                  })(e),
                  e
                )
              : (n = !1));
        }
        function A(e, r, a, i) {
          function m(r) {
            return function () {
              (o = r), ++s[e], clearTimeout(t), (t = setTimeout(g, 1e3));
            };
          }
          function c(r) {
            l(a, r, e), "keyup" !== i && (n = f(r)), setTimeout(g, 10);
          }
          s[e] = 0;
          for (var A = 0; A < r.length; ++A) {
            var u = A + 1 === r.length ? c : m(i || x(r[A + 1]).action);
            d(r[A], u, i, e, A);
          }
        }
        function d(e, t, s, n, a) {
          r._directMap[e + ":" + s] = t;
          var i,
            o = (e = e.replace(/\s+/g, " ")).split(" ");
          o.length > 1
            ? A(e, o, t, s)
            : ((i = x(e, s)),
              (r._callbacks[i.key] = r._callbacks[i.key] || []),
              m(i.key, i.modifiers, { type: i.action }, n, e, a),
              r._callbacks[i.key][n ? "unshift" : "push"]({
                callback: t,
                modifiers: i.modifiers,
                action: i.action,
                seq: n,
                level: a,
                combo: e,
              }));
        }
        (r._handleKey = function (e, r, t) {
          var s,
            n = m(e, r, t),
            a = {},
            c = 0,
            A = !1;
          for (s = 0; s < n.length; ++s)
            n[s].seq && (c = Math.max(c, n[s].level));
          for (s = 0; s < n.length; ++s)
            if (n[s].seq) {
              if (n[s].level != c) continue;
              (A = !0),
                (a[n[s].seq] = 1),
                l(n[s].callback, t, n[s].combo, n[s].seq);
            } else A || l(n[s].callback, t, n[s].combo);
          var u = "keypress" == t.type && i;
          t.type != o || p(e) || u || g(a), (i = A && "keydown" == t.type);
        }),
          (r._bindMultiple = function (e, r, t) {
            for (var s = 0; s < e.length; ++s) d(e[s], r, t);
          }),
          u(e, "keypress", c),
          u(e, "keydown", c),
          u(e, "keyup", c);
      }
    })(
      "undefined" != typeof window ? window : null,
      "undefined" != typeof window ? document : null
    );
  },
  ,
  ,
  ,
  function (e, r, t) {
    "use strict";
    t.r(r),
      function (e) {
        var r = t(2),
          s = t.n(r);
        let n = {
          keys: [],
          fetchConfig: (e) => {
            let r = !1;
            return (
              n.keys.length > 0 &&
                n.keys.forEach((t) => {
                  t.key === e && (r = t);
                }),
              r
            );
          },
          doAction: (r) => {
            let t = r.action,
              n = {};
            for (let e in r) n[e] = r[e];
            if ("javascript" === t) {
              let e = document.createElement("script");
              return (
                (e.textContent = r.code),
                document.body.appendChild(e),
                void document.body.removeChild(e)
              );
            }
            "trigger" === t && s.a.trigger(r.trigger),
              "buttonnexttab" === t &&
                (r.button && document.querySelector(r.button).click(),
                (n.action = "nexttab")),
              e.runtime.sendMessage(n);
          },
          activateKey: (e) => {
            s.a.bind(e.key.toLowerCase(), function () {
              return n.doAction(e), !1;
            });
          },
        };
        (s.a.prototype.stopCallback = function (e, r, t) {
          let s = n.fetchConfig(t);
          return (
            !!r.classList.contains("mousetrap") ||
            (!s.activeInInputs &&
              ("INPUT" === r.tagName ||
                "SELECT" === r.tagName ||
                "TEXTAREA" === r.tagName ||
                r.isContentEditable))
          );
        }),
          e.runtime
            .sendMessage({ action: "getKeys", url: document.URL })
            .then(function (e) {
              e &&
                ((n.keys = e),
                n.keys.length > 0 &&
                  n.keys.forEach((e) => {
                    n.activateKey(e);
                  }));
            });
      }.call(this, t(0));
  },
]);
