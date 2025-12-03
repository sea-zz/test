"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // ../../../../../../Users/haiyang.zhao/test/html/haiyan/duo-video/unpackage/dist/dev/.nvue/pages/index/channel-panel.js
  var import_vue = __toESM(require_vue());
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _style_0 = { "channel-panel": { "": { "flex": 1, "position": "absolute", "width": "450rpx", "top": "10rpx", "left": "10rpx", "bottom": "10rpx", "borderRadius": 8, "backgroundColor": "rgba(0,100,200,0.3)", "backdropFilter": "blur(4px)", "borderWidth": 1, "borderStyle": "solid", "borderColor": "rgba(255,255,255,0.2)", "overflow": "hidden" } }, "channel-panel-container": { "": { "flexDirection": "row" } }, "category-list": { "": { "width": "135rpx", "borderRightWidth": 1, "backgroundColor": "rgba(0,80,160,0.4)", "borderRightColor": "rgba(255,255,255,0.8)" } }, "category-item": { "": { "height": "60rpx", "alignItems": "center", "justifyContent": "center", "borderBottomWidth": 1, "borderBottomColor": "rgba(255,255,255,0.05)", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" }, ".active": { "backgroundColor": "rgba(255,255,255,0.2)" } }, "category-item-text": { "": { "color": "rgb(255,255,255)", "fontSize": "24rpx", "fontWeight": "500", "cursor": "pointer" } }, "channel-list": { "": { "width": "315rpx" } }, "channel-item": { "": { "height": "60rpx", "lineHeight": "60rpx", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "flexDirection": "row", "alignItems": "center", "borderBottomWidth": 1, "borderBottomStyle": "solid", "borderBottomColor": "rgba(255,255,255,0.1)" }, ".active": { "backgroundColor": "rgba(255,255,255,0.3)" } }, "channel-number": { "": { "width": "40rpx", "height": "40rpx", "borderRadius": "20rpx", "backgroundColor": "#FF7F00", "justifyContent": "center", "alignItems": "center", "marginRight": "30rpx" } }, "channel-number-text": { "": { "color": "#FFFFFF" } }, "channel-name": { "": { "width": "205rpx", "whiteSpace": "normal", "wordBreak": "break-all", "wordWrap": "break-word" } }, "channel-name-text": { "": { "color": "#ffffff", "fontSize": "22rpx", "flex": 1, "fontWeight": "600", "textShadow": "0 1px 2px rgba(0, 0, 0, 0.5)" } }, "channel_item_info": { "": { "marginLeft": "10rpx" } }, "kefu": { "": { "height": "150rpx", "display": "flex", "flexDirection": "row", "marginTop": "10rpx", "marginBottom": "10rpx" } }, "wx": { "": { "width": "150rpx", "height": "150rpx" } }, "qq": { "": { "width": "150rpx", "height": "150rpx", "marginLeft": "10rpx" } } };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var base = "https://site-tools.netlify.app/";
  var _sfc_main = {
    data() {
      return {
        visible: false,
        cateChannel: [],
        channels: [],
        activeCategory: "",
        currentChannelUrl: "",
        uuid: "",
        vip: false,
        scrollViewHeight: "0rpx"
        // 初始设为0
      };
    },
    computed: {
      filteredChannels() {
        return this.channels.find((channel) => channel.title === this.activeCategory).list;
      },
      heightToRpx() {
        const systemInfo = uni.getSystemInfoSync();
        const heightRpx = Math.floor(systemInfo.windowHeight * 750 / systemInfo.windowWidth);
        return {
          height: `${heightRpx - 20}rpx`
        };
      }
    },
    onLoad() {
      return __async(this, null, function* () {
        yield this.loadChannelData();
        uni.$on("showChannelPanel", this.handleShowPanel);
        uni.$on("hideChannelPanel", this.handleHidePanel);
        this.$nextTick(() => {
          this.calculateScrollHeight();
        });
      });
    },
    onUnload() {
      uni.$off("showChannelPanel", this.handleShowPanel);
      uni.$off("hideChannelPanel", this.handleHidePanel);
    },
    methods: {
      calculateScrollHeight() {
        return new Promise((resolve) => {
          const systemInfo = uni.getSystemInfoSync();
          const heightRpx = Math.floor(systemInfo.windowHeight * 750 / systemInfo.windowWidth);
          this.scrollViewHeight = `${heightRpx - 20}rpx`;
          resolve();
        });
      },
      // 加载频道数据
      loadChannelData() {
        return __async(this, null, function* () {
          try {
            const categoryRes = yield uni.request({
              url: base + "assets/menu.json"
            });
            this.activeCategory = categoryRes.data[0].title;
            this.cateChannel = categoryRes.data;
            const allRequest = categoryRes.data.map((item) => {
              return new Promise((resolve, reject) => {
                uni.request({
                  url: base + `assets/${item.title}.json`,
                  success: (res) => resolve(res.data.list),
                  fail: (err) => reject(err)
                });
              });
            });
            const allData = yield Promise.all(allRequest);
            this.channels = categoryRes.data.map((item, idx) => {
              return __spreadProps(__spreadValues({}, item), {
                list: allData[idx]
              });
            });
            if (this.channels.length > 0 && this.channels[0].list.length > 0) {
              this.currentChannel = this.channels[0].list[0];
              this.currentChannelUrl = this.channels[0].list[0].url;
              uni.$emit("channelSelected", this.currentChannel);
              uni.$emit("hideLoading");
            }
          } catch (error) {
            formatAppLog("error", "at pages/index/channel-panel.nvue:154", "\u52A0\u8F7D\u9891\u9053\u6570\u636E\u5931\u8D25:", error);
          }
        });
      },
      onContainerClick(e) {
        e.stopPropagation();
      },
      handleShowPanel(data) {
        formatAppLog("log", "at pages/index/channel-panel.nvue:163", "nav\u663E\u793A", data.uuid, data.vip);
        this.visible = true;
        this.uuid = data.uuid;
        this.vip = data.vip;
      },
      handleHidePanel(data) {
        formatAppLog("log", "at pages/index/channel-panel.nvue:169", "nav\u4E0D\u5C55\u793A");
        this.visible = false;
      },
      changeCategory(category) {
        this.activeCategory = category;
      },
      switchChannel(channel) {
        this.visible = false;
        this.currentChannelUrl = channel.url;
        uni.$emit("channelSelected", channel);
      },
      getChannelNumber(channel) {
        const index = this.channels.findIndex((c) => c.url === channel.url);
        return index + 1;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue.createElementVNode)("view", {
        class: "channel-panel",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
      }, [
        (0, import_vue.createElementVNode)("view", { class: "channel-panel-container" }, [
          (0, import_vue.createCommentVNode)(" \u5DE6\u4FA7\u5206\u7C7B\u5217\u8868 "),
          (0, import_vue.createElementVNode)(
            "view",
            {
              class: "category-list",
              style: (0, import_vue.normalizeStyle)({ height: $data.scrollViewHeight })
            },
            [
              (0, import_vue.createElementVNode)("scroll-view", {
                class: "category-scroll",
                scrollY: "true"
              }, [
                ((0, import_vue.openBlock)(true), (0, import_vue.createElementBlock)(
                  import_vue.Fragment,
                  null,
                  (0, import_vue.renderList)($data.cateChannel, (cate, index) => {
                    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                      key: index,
                      class: (0, import_vue.normalizeClass)(["category-item", { active: $data.activeCategory === cate.title }]),
                      onClick: ($event) => $options.changeCategory(cate.title)
                    }, [
                      (0, import_vue.createElementVNode)(
                        "u-text",
                        { class: "category-item-text" },
                        (0, import_vue.toDisplayString)(cate.title),
                        1
                        /* TEXT */
                      )
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                (0, import_vue.createElementVNode)(
                  "view",
                  {
                    key: "uuid",
                    class: (0, import_vue.normalizeClass)(["category-item", { active: $data.activeCategory === "\u4E2A\u4EBA\u4FE1\u606F" }]),
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.changeCategory("\u4E2A\u4EBA\u4FE1\u606F"))
                  },
                  [
                    (0, import_vue.createElementVNode)("u-text", { class: "category-item-text" }, "\u4E2A\u4EBA\u4FE1\u606F")
                  ],
                  2
                  /* CLASS */
                )
              ])
            ],
            4
            /* STYLE */
          ),
          (0, import_vue.createCommentVNode)(" \u53F3\u4FA7\u9891\u9053\u5217\u8868 "),
          (0, import_vue.createElementVNode)(
            "view",
            {
              class: "channel-list",
              style: (0, import_vue.normalizeStyle)({ height: $data.scrollViewHeight })
            },
            [
              $data.activeCategory === "\u4E2A\u4EBA\u4FE1\u606F" ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)(
                "view",
                {
                  key: 0,
                  class: (0, import_vue.normalizeClass)({ channel_item_info: $data.activeCategory === "\u4E2A\u4EBA\u4FE1\u606F" })
                },
                [
                  (0, import_vue.createElementVNode)(
                    "u-text",
                    { style: { "color": "#fff", "font-size": "20rpx" } },
                    "uid: " + (0, import_vue.toDisplayString)($data.uuid),
                    1
                    /* TEXT */
                  ),
                  (0, import_vue.createElementVNode)("view", { class: "kefu" }, [
                    (0, import_vue.createElementVNode)("u-image", {
                      class: "wx",
                      src: "https://site-tools.netlify.app/concat/wx.png"
                    }),
                    (0, import_vue.createElementVNode)("u-image", {
                      class: "qq",
                      src: "https://site-tools.netlify.app/concat/qq.png"
                    })
                  ]),
                  !$data.vip ? ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("u-text", {
                    key: 0,
                    style: { "color": "#fff" },
                    class: "info-uid"
                  }, "\u5C0A\u656C\u7684\u7528\u6237\uFF0C\u60A8\u7684\u4F53\u9A8C\u65F6\u95F4\u4E3A\u4E24\u5929\uFF0C\u5982\u60F3\u957F\u4E45\u4F7F\u7528\uFF0C\u626B\u7801\u8054\u7CFB\u652F\u6301\uFF01")) : (0, import_vue.createCommentVNode)("v-if", true),
                  (0, import_vue.createElementVNode)("u-text", {
                    style: { "color": "#fff" },
                    class: "info-uid"
                  }, "\u8B66\u544A\uFF1A\u7CFB\u7EDF\u91CD\u7F6E\u3001\u5237\u673A\u3001\u5E94\u7528\u5378\u8F7D\u5747\u53EF\u81F4\u7528\u6237UID\u53D8\u5316\uFF0C\u5BFC\u81F4APP\u4E0D\u53EF\u7528\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\uFF01\uFF01\uFF01")
                ],
                2
                /* CLASS */
              )) : ((0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("scroll-view", {
                key: 1,
                class: "channel-scroll",
                scrollY: "true"
              }, [
                ((0, import_vue.openBlock)(true), (0, import_vue.createElementBlock)(
                  import_vue.Fragment,
                  null,
                  (0, import_vue.renderList)($options.filteredChannels, (channel, index) => {
                    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("view", {
                      class: (0, import_vue.normalizeClass)(["channel-item", { active: $data.currentChannelUrl === channel.url }]),
                      key: index,
                      onClick: ($event) => $options.switchChannel(channel)
                    }, [
                      (0, import_vue.createElementVNode)("view", { class: "channel-number" }, [
                        (0, import_vue.createElementVNode)(
                          "u-text",
                          { class: "channel-number-text" },
                          (0, import_vue.toDisplayString)(index + 1),
                          1
                          /* TEXT */
                        )
                      ]),
                      (0, import_vue.createElementVNode)("view", { class: "channel-name" }, [
                        (0, import_vue.createElementVNode)(
                          "u-text",
                          { class: "channel-name-text" },
                          (0, import_vue.toDisplayString)(channel.tvg_name || channel.tvg_id || channel.group_title),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ],
            4
            /* STYLE */
          )
        ])
      ])
    ]);
  }
  var channelPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "/Users/haiyang.zhao/test/html/haiyan/duo-video/pages/index/channel-panel.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/index/channel-panel";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    channelPanel.mpType = "page";
    const app = Vue.createPageApp(channelPanel, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...channelPanel.styles || []]));
    app.mount("#root");
  }
})();
