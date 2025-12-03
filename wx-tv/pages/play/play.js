// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('play', options)
    wx.showLoading({
        title: '加载中',
    })
    this.setData({
        url: options.url,
        title: options.title,
    });
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },

  playError: function() {
    wx.showToast({
        title: '播放链接错误，请返回🙅！',
        icon: 'error',
        duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})