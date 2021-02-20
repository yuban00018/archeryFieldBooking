// pages/mainPage/mainPage.js
const date = new Date()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    mode1: true,
    isAdmin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo().then(
            res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              wx.cloud.callFunction({
                name: 'login',
                data: {}
              }).then(res => {
                console.log('[login] user openid: ', res.result.openid)
                getApp().globalData.openid = res.result.openid
                db.collection('Admin').where({
                  _openid: getApp().globalData.openid,
                  isAdmin: true
                }).get().then(res => {
                  console.log(res)
                  if (res.data.length != 0) {this.setData({
                    isAdmin: true
                  });}
                  else {
                    this.setData({
                      isAdmin: false
                    });
                    console.log('非管理员登陆')
                  }
                })
              }).catch(err => {
                console.error('[login] 调用失败', err)
              })
            }
          ).catch(err => {
            console.log(err)
          })
        }
      }
    })
    this.setData({
      multiArray: [
        ['传统弓', '复合弓'],
        ['5米', '10米', '15米', '20米', '25米', '30米', '35米', '40米', '45米', '50米'],
        ['4组/每组4支', '2组/每组4支']
      ],
      [`formData.group1`]: 0,
      [`formData.group2`]: 0,
      [`formData.group3`]: 0,
      [`formData.group4`]: 0,
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    if (this.data.multiIndex[2] == 1) this.setData({
      mode1: false
    });
    else {
      this.setData({
        mode1: true
      })
    }
  },
  uploadScore() {
    if (this.data.mode1) {
      db.collection('scores').add({
        data: {
          date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() < 10 ? '0'.toString() : '') + date.getDate().toString(),
          Groups: [parseInt(this.data.formData.group1), parseInt(this.data.formData.group2), parseInt(this.data.formData.group3), parseInt(this.data.formData.group4)],
          totalScore: parseInt(this.data.formData.group1) + parseInt(this.data.formData.group2) + parseInt(this.data.formData.group3) + parseInt(this.data.formData.group4),
          type: this.data.multiArray[0][this.data.multiIndex[0]],
          range: this.data.multiArray[1][this.data.multiIndex[1]],
          groupNumber: this.data.multiArray[2][this.data.multiIndex[2]],
          mode1: true
        }
      }).then(res => {
        wx.showToast({
          title: '成绩上传成功',
        })
      }).catch(err => {
        this.setData({
          error: '成绩上传失败，请检查网络'
        })
      })
    } else {
      db.collection('scores').add({
        data: {
          date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() < 10 ? '0'.toString() : '') + date.getDate().toString(),
          Groups: [parseInt(this.data.formData.group1), parseInt(this.data.formData.group2)],
          totalScore: parseInt(this.data.formData.group1) + parseInt(this.data.formData.group2),
          type: this.data.multiArray[0][this.data.multiIndex[0]],
          range: this.data.multiArray[1][this.data.multiIndex[1]],
          groupNumber: this.data.multiArray[2][this.data.multiIndex[2]],
          mode1: false
        }
      }).then(res => {
        wx.showToast({
          title: '成绩上传成功',
        })
      }).catch(err => {
        this.setData({
          error: '成绩上传失败，请检查网络'
        })
      })
    }
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
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