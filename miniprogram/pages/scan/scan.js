// pages/scan/scan.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    scanCodeMsg: "",
    currentdate: "",
    userList: [],
    //next: false,
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],
    show: false,
    id: ''
  },
  setState(e) {
    console.log(e)
    if (e.detail.index == 1) {
      db.collection('booking').where({
        _openid: this.data.id,
        bookingDate:this.data.currentdate
      }).update({
        data: {
          state: '已签到'
        }
      }).then(res => {
        wx.showToast({
          title: '设置签到成功',
        })
        this.onLoad();
      }).catch(err => {
        this.setData({
          error: '设置失败，请检查网络'
        })
      })
    } else {
      db.collection('booking').where({
        _openid: this.data.id,
        bookingDate:this.data.currentdate
      }).update({
        data: {
          state: '未出席'
        }
      }).then(res => {
        wx.showToast({
          title: '设置未出席成功',
        })
        this.onLoad();
      }).catch(err => {
        this.setData({
          error: '设置失败，请检查网络'
        })
      })
    }
  },
  changeState(e) {
    this.setData({
      show: true,
      id: e.detail.data._openid
    })
  },
  changeState2(e) {
    this.setData({
      show: true,
      id: e.currentTarget.dataset.gid._openid
    })
  },
  ButtonTap(e){
    console.log(e)
    this.setData({
      name: e.currentTarget.dataset.gid.name
    })
    this.changeState2(e);
  },
  slideButtonTap(e) {
    console.log('slide button tap', e)
    this.setData({
      name: e.detail.data.name
    })
    if (e.detail.index == 0) this.changeState(e);
  },
  getQRCode: function () {
    wx.scanCode({ //扫描API
      onlyFromCamera: true,
    }).then(res => {
      console.log(res); //输出回调信息
      this.setData({
        scanCodeMsg: res.result,
      });
      db.collection('booking').where({
        _id: this.data.scanCodeMsg,
        bookingDate: this.data.currentdate
      }).get().then(res => {
        if (res.data.length != 0) {
          wx.showToast({
            title: '成功签到',
            duration: 2000
          })
          db.collection('booking').where({
            _id: this.data.scanCodeMsg,
          }).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              state: '已签到'
            },
            success: function (res) {
              console.log(res.data)
              this.onLoad();
            }
          })
        } else this.setData({
          error: '当天无预约信息'
        })
      }).catch(err => {
        this.setData({
          error: '获取信息失败，请检查网络'
        })
      })
    }).catch(err => {
      this.setData({
        error: '发生未知错误'
      })
    })
  },
  getdate() {
    var date = new Date();
    //获取年  
    var Y = date.getFullYear();
    //获取月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取日 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var nowdate = Y + "-" + M + "-" + D;
    this.setData({
      currentdate: nowdate
    })
  },
  scanconfirm(a, b) {
    if (a == b) {
      this.setData({
        showOneButtonDialog: true
      })
    }
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdate();
    //从数据库获得预约记录
    let tmp = []
    console.log(this.data.currentdate)
    db.collection('booking').where({
      bookingDate: this.data.currentdate
    }).get().then(res => {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        tmp.push({
          '_openid': res.data[i]._openid,
          'name': res.data[i].name,
          'state': res.data[i].state
        })
      }
      this.setData({
        userList: tmp,
        show:false
      })

    });

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