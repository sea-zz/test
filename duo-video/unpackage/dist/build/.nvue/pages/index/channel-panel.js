import { openBlock, createElementBlock, createElementVNode, normalizeStyle, Fragment, renderList, normalizeClass, toDisplayString } from "vue";
function formatAppLog(type, filename, ...args) {
  if (uni.__log__) {
    uni.__log__(type, filename, ...args);
  } else {
    console[type].apply(console, [...args, filename]);
  }
}
const _style_0 = { "channel-panel": { "": { "flex": 1, "position": "absolute", "top": "10rpx", "left": "10rpx", "bottom": "10rpx", "right": "10rpx", "borderRadius": 8, "backgroundColor": "rgba(0,100,200,0.3)", "backdropFilter": "blur(4px)", "borderWidth": 1, "borderStyle": "solid", "borderColor": "rgba(255,255,255,0.2)", "overflow": "hidden" } }, "channel-panel-container": { "": { "flexDirection": "row" } }, "category-list": { "": { "width": "200rpx", "borderRightWidth": 1, "backgroundColor": "rgba(0,80,160,0.4)", "borderRightColor": "rgba(255,255,255,0.8)" } }, "category-item": { "": { "height": "60rpx", "alignItems": "center", "justifyContent": "center", "borderBottomWidth": 1, "borderBottomColor": "rgba(255,255,255,0.05)", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" }, ".active": { "backgroundColor": "rgba(255,255,255,0.2)" } }, "category-item-text": { "": { "color": "rgb(255,255,255)", "fontSize": "24rpx", "fontWeight": "500", "cursor": "pointer" } }, "channel-list": { "": { "flex": 1 } }, "channel-item": { "": { "height": "60rpx", "lineHeight": "60rpx", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "flexDirection": "row", "alignItems": "center", "borderBottomWidth": 1, "borderBottomStyle": "solid", "borderBottomColor": "rgba(255,255,255,0.1)" }, ".active": { "backgroundColor": "rgba(255,255,255,0.3)" } }, "channel-number": { "": { "width": "40rpx", "height": "40rpx", "borderRadius": "20rpx", "backgroundColor": "#FF7F00", "justifyContent": "center", "alignItems": "center", "marginRight": "30rpx" } }, "channel-number-text": { "": { "color": "#FFFFFF" } }, "channel-name-text": { "": { "color": "#ffffff", "fontSize": "22rpx", "flex": 1, "fontWeight": "600", "textShadow": "0 1px 2px rgba(0, 0, 0, 0.5)" } }, "channel_item_info": { "": { "marginLeft": "10rpx" } }, "kefu": { "": { "height": "150rpx", "display": "flex", "flexDirection": "row", "marginTop": "10rpx", "marginBottom": "10rpx" } }, "wx": { "": { "width": "150rpx", "height": "150rpx" } }, "qq": { "": { "width": "150rpx", "height": "150rpx", "marginLeft": "10rpx" } } };
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
let base = "https://site-tools.netlify.app/";
const _sfc_main = {
  data() {
    return {
      visible: false,
      cateChannel: [],
      channels: [],
      activeCategory: "",
      currentChannelUrl: "",
      uuid: "",
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
  async onLoad() {
    await this.loadChannelData();
    uni.$on("showChannelPanel", this.handleShowPanel);
    uni.$on("hideChannelPanel", this.handleHidePanel);
    this.$nextTick(() => {
      this.calculateScrollHeight();
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
    async loadChannelData() {
      try {
        const categoryRes = await uni.request({
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
        const allData = await Promise.all(allRequest);
        this.channels = categoryRes.data.map((item, idx) => {
          return {
            ...item,
            list: allData[idx]
          };
        });
        if (this.channels.length > 0 && this.channels[0].list.length > 0) {
          this.currentChannel = this.channels[0].list[0];
          this.currentChannelUrl = this.channels[0].list[0].url;
          uni.$emit("channelSelected", this.currentChannel);
          uni.$emit("hideLoading");
        }
      } catch (error) {
        formatAppLog("error", "at pages/index/channel-panel.nvue:153", "加载频道数据失败:", error);
      }
    },
    onContainerClick(e) {
      e.stopPropagation();
    },
    handleShowPanel(data) {
      formatAppLog("log", "at pages/index/channel-panel.nvue:162", "nav显示", data.uuid);
      this.visible = true;
      this.uuid = data.uuid;
    },
    handleHidePanel(data) {
      formatAppLog("log", "at pages/index/channel-panel.nvue:167", "nav不展示");
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
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", {
      class: "channel-panel",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
    }, [
      createElementVNode("view", { class: "channel-panel-container" }, [
        createElementVNode("view", {
          class: "category-list",
          style: normalizeStyle({ height: $data.scrollViewHeight })
        }, [
          createElementVNode("scroll-view", {
            class: "category-scroll",
            scrollY: "true"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.cateChannel, (cate, index) => {
              return openBlock(), createElementBlock("view", {
                key: index,
                class: normalizeClass(["category-item", { active: $data.activeCategory === cate.title }]),
                onClick: ($event) => $options.changeCategory(cate.title)
              }, [
                createElementVNode("u-text", { class: "category-item-text" }, toDisplayString(cate.title), 1)
              ], 10, ["onClick"]);
            }), 128)),
            createElementVNode("view", {
              key: "uuid",
              class: normalizeClass(["category-item", { active: $data.activeCategory === "个人信息" }]),
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeCategory("个人信息"))
            }, [
              createElementVNode("u-text", { class: "category-item-text" }, "个人信息")
            ], 2)
          ])
        ], 4),
        createElementVNode("view", {
          class: "channel-list",
          style: normalizeStyle({ height: $data.scrollViewHeight })
        }, [
          $data.activeCategory === "个人信息" ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass({ channel_item_info: $data.activeCategory === "个人信息" })
          }, [
            createElementVNode("u-text", { style: { "color": "#fff", "font-size": "20rpx" } }, "uid: " + toDisplayString($data.uuid), 1),
            createElementVNode("view", { class: "kefu" }, [
              createElementVNode("u-image", {
                class: "wx",
                src: "https://site-tools.netlify.app/concat/wx.png"
              }),
              createElementVNode("u-image", {
                class: "qq",
                src: "https://site-tools.netlify.app/concat/qq.png"
              })
            ]),
            createElementVNode("u-text", {
              style: { "color": "#fff" },
              class: "info-uid"
            }, "尊敬的用户，您的体验时间为两天，如想长久使用，扫码联系支持！"),
            createElementVNode("u-text", {
              style: { "color": "#fff" },
              class: "info-uid"
            }, "警告：系统重置、刷机、应用卸载均可致用户UID变化，导致APP不可用，请谨慎操作！！！")
          ], 2)) : (openBlock(), createElementBlock("scroll-view", {
            key: 1,
            class: "channel-scroll",
            scrollY: "true"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredChannels, (channel, index) => {
              return openBlock(), createElementBlock("view", {
                class: normalizeClass(["channel-item", { active: $data.currentChannelUrl === channel.url }]),
                key: index,
                onClick: ($event) => $options.switchChannel(channel)
              }, [
                createElementVNode("view", { class: "channel-number" }, [
                  createElementVNode("u-text", { class: "channel-number-text" }, toDisplayString(index + 1), 1)
                ]),
                createElementVNode("view", { class: "channel-name" }, [
                  createElementVNode("u-text", { class: "channel-name-text" }, toDisplayString(channel.tvg_name || channel.tvg_id || channel.group_title), 1)
                ])
              ], 10, ["onClick"]);
            }), 128))
          ]))
        ], 4)
      ])
    ])
  ]);
}
const channelPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  channelPanel as default
};
