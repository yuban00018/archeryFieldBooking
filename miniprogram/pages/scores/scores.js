// pages/scores/scores.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tmp = []
    db.collection('scores').where({
      _openid: getApp().globalData.openid
    }).get().then(res => {
      console.log(res)
      for (var i = res.data.length-1; i >=0; i--) {
        tmp.push({
          'Groups': res.data[i].Groups,
          'date': res.data[i].date,
          'groupNumber': res.data[i].groupNumber,
          'range': res.data[i].range,
          'totalScore': res.data[i].totalScore,
          'type': res.data[i].type,
          'mode1':res.data[i].mode1,
        })
      }
      this.setData({
        scoreList: tmp
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})