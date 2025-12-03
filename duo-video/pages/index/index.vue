<template>
	<view v-if="loading" style="background-color: black;width: 100vw;height: 100vh;"></view>
	<view v-else>
		<view v-if="!vip" class="app-container-vip">
			<view class="kefu-info">
				<view class="kefu">
					<image class="wx" src="https://site-tools.netlify.app/concat/wx.png"></image>
					<image class="qq" src="https://site-tools.netlify.app/concat/qq.png"></image>
				</view>
				<view class="info-uid">尊敬的用户(<text class="uid">UID: {{this.uuid}}</text>)，体验已到期，如需继续使用，扫码联系支持！</view>
				<view class="info-uid">警告：系统重置、刷机、应用卸载均可致用户<text class="error">UID</text>变化，导致APP不可用，请谨慎操作！！！</view>
			</view>
			<view class="uid-info">
				<canvas canvas-id="qrcode" style="width: 200px; height: 200px;"></canvas>
				<view class="info-tips">(扫码可快捷复制uid)</view>
			</view>
		</view>
	  <view v-else class="app-container">
		<!-- 视频播放区域 -->
		<video
		id="video-player"
		class="video-player"
		:src="currentChannel.url"
		:controls="false"
		:fullscreen="true"
		autoplay
		@error="videoErrorCallback"
		/>

		<!-- 视频点击覆盖层 -->
		<cover-view class="video-overlay" @tap="toggleChannelPanel" :style="overlayStyle"></cover-view>
	  </view>
	</view>
</template>

<script>
import UQRCode from 'uqrcodejs';

let base = 'https://site-tools.netlify.app/'
// if(process.env.NODE_ENV === 'development') {
//   base = '/api/'
// }

export default {
  data() {
    return {
      currentChannel: {},
      currentTime: '',
      channelPanel: null,
	  isPanelVisible: false,
	  vip: false,
	  overlayStyle: {},
	  loading: true,
    }
  },
  beforeCreate() {
	  uni.showLoading({
	  	tilte: '加载中',
		mask: true
	  })
  },
  computed: {
	  uuid() {
		let uuid = '';
		const systemInfo = uni.getSystemInfoSync();
		// #ifdef APP-PLUS
		uuid = plus.device.uuid;
		// #endif
		return uuid || systemInfo.deviceId || systemInfo.oaid;
	  },
  },
  mounted() {
	  // #ifdef APP-PLUS
	  // 全屏
	  plus.navigator.setFullscreen(true)
	  // 隐藏手机底部虚拟按钮
	  plus.navigator.hideSystemNavigation()
	  // #endif
	  this.createQrCode();
	},
  onReady() {
    // #ifdef APP-PLUS
    // 获取subNVue实例
    this.channelPanel = uni.getSubNVueById('channelPanel')
	this.channelPanel?.hide();
    // #endif
  },
  onLoad() {
	this.checkVip();
    // 强制横屏
    this.setLandscape()
	
	// #ifdef APP-PLUS
	uni.$on('channelSelected', this.handleChannelSelected);
	uni.$on('hideLoading', this.handleHideLoading);
	// #endif
	
	this.$nextTick(() => {
		this.calculateScrollHeight();
	});
  },
  onUnload() {
    // #ifdef APP-PLUS
    // 移除事件监听
    uni.$off('channelSelected', this.handleChannelSelected)
	uni.$off('hideLoading', this.handleHideLoading);
    // #endif
  },
  watch: {
    async currentChannel(value) {
      const videoContext = uni.createVideoContext('video-player')
      videoContext.play()
    }
  },
  methods: {
	videoErrorCallback: function(e) {
		uni.showToast({
			title: e.target.errMsg || '播放失败',
			duration: 2000,
			icon: 'error'
		})
	},
	handleHideLoading() {
		uni.hideLoading();
		this.loading = false;
	},
	createQrCode() {
		// 创建实例并生成二维码
		const qr = new UQRCode();
		qr.data = this.uuid; // 二维码内容
		qr.size = 200; // 大小，需与canvas宽高一致
		qr.make();
		
		// 绘制到Canvas
		const canvasContext = uni.createCanvasContext('qrcode', this);
		qr.canvasContext = canvasContext;
		qr.drawCanvas();
	},
	calculateScrollHeight() {
		return new Promise((resolve) => {
			const systemInfo = uni.getSystemInfoSync();
			const heightRpx = Math.floor(systemInfo.windowHeight * 750 / systemInfo.windowWidth);
			this.overlayStyle = {
				height: `${heightRpx}rpx`,
				width: `${Math.floor(systemInfo.windowWidth * 750 / systemInfo.windowWidth)}rpx`
			};
			resolve()
		});
	},
	handleCopy() {
		// #ifdef APP-PLUS
		uni.setClipboardData({
			data: this.uuid
		});
		// #endif
	},
	checkVip() {
		const registerDate = uni.getStorageSync(this.uuid);
		if (!registerDate) {
			  // 首次登陆
			  uni.setStorageSync(this.uuid, `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
			  this.vip = true;
		} else {
			 const currentTime = Date.now();
			 const registerExpireTime = new Date(registerDate).getTime() + 86400000 * 2; // 两天试用期
			 if (currentTime < registerExpireTime) {
				 // 试用期内
				this.vip = true;
			 } else {
				 // 试用期外校验
				 uni.request({
				 	url: base + 'user/vip.json',
					success:(res) => {
						if (res?.data?.length) {
							const user = res.data.find(item => item.uid === this.uuid);
							if (user) {
								const expireDateTime = new Date(`${user.expire_date} 23:59:59`).getTime();
								const currentTime = Date.now();
								this.vip = expireDateTime > currentTime ? true : false;
							}
						}
					},
				 });
			 }
		}
	},
	  // 处理频道选择
	handleChannelSelected(channel) {
	    this.currentChannel = channel
		this.isPanelVisible = false;
	    // #ifdef APP-PLUS
	    // 隐藏频道面板
	    if (this.channelPanel) {
	      this.channelPanel.hide('fade-out', 150)
	    }
	    // #endif
	},
    // 强制横屏显示
    setLandscape() {
      // #ifdef APP-PLUS
      plus.screen.lockOrientation('landscape-primary')
      // #endif
    },
	// 视频点击处理
	toggleChannelPanel() {
	  console.log('toggleChannelPanel被调用')
	  
	  // #ifdef APP-PLUS
	  if (!this.channelPanel) {
	    console.log('重新获取SubNVue实例')
	    this.channelPanel = uni.getSubNVueById('channelPanel')
	  }
	  
	  if (this.channelPanel) {
	    if (this.isPanelVisible) {
	      // 隐藏面板
	      this.channelPanel.hide('fade-out', 150)
		  uni.$emit('hideChannelPanel', {})
	      this.isPanelVisible = false
	    } else {
	      // 显示面板
	      try {
	        uni.$emit('showChannelPanel', {uuid: this.uuid, vip: this.vip})
	        
	        this.channelPanel.show('fade-in', 150)
	        this.isPanelVisible = true
	        console.log('SubNVue显示成功')
	      } catch (error) {
	        console.error('SubNVue显示失败:', error)
	      }
	    }
	  } else {
	    console.error('SubNVue实例未找到')
	  }
	  // #endif
	},
  }
}
</script>

<style scoped>
.app-container-vip {
	width: 100vw;
	height: 100vh;
	padding: 10rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-sizing: border-box;
}
.kefu {
	display: flex;
	gap: 20rpx;
	margin-bottom: 10rpx;
	justify-content: space-around;
	box-sizing: border-box;
}
.wx,.qq {
	width: 150rpx;
	height: 150rpx;
}
.info-uid {
	margin-bottom: 10rpx;
	font-size: 18rpx;
}
.uid {
	color: rgba(0, 100, 200);
	font-weight: 600;
}
.error {
	font-weight: 600;
}
.app-container {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: relative;
  overflow: hidden;
}
.kefu-info {
	flex: 1;
}
.uid-info {
	width: 250rpx;
	margin-left: 20rpx;
	border-left: 1px solid rgba(0, 0, 0, .07);
	align-items: center;
	justify-items: center;
	align-content: center;
	box-sizing: border-box;
}
.info-tips {
	font-size: 18rpx;
	margin-top: 10rpx;
}
/* 视频播放区域 */
.video-player {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  /* 调试时可临时开启背景色查看点击区域 */
/* background-color: rgba(255, 0, 0, 0.5); */
}
</style>