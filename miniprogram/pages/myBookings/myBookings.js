// pages/myBookings/myBookings.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookingDates: [],
    show: false,
    deleteDate: '',
    deleteId: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从数据库获得预约记录
    let tmp = []
    db.collection('booking').where({
      _openid: getApp().globalData.openid
    }).get().then(res => {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        tmp.push({
          'date': res.data[i].bookingDate,
          'bookingId': res.data[i]._id,
          'state': res.data[i].state
        })
      }
      this.setData({
        bookingDates: tmp
      })
      console.log(this.data.bookingDates)
    })
  },
  showDetail(e) {
    wx.navigateTo({
      url: '../BookingDetails/BookingDetails?bookingId=' + e
    })
  },
  deleteBooking(e) {
    if (e.detail.item.value == 0) {
      console.log('取消删除')
      this.setData({
        show: false
      });
      return;
    }
    console.log('确认删除')
    db.collection('booking').where({
      _id: this.data.deleteId
    }).remove().then(res => {
      this.onLoad()
      this.setData({
        show: false
      });
      wx.showToast({
        title: '取消成功'
      })
    }).catch(err => {})
  },
  showConfirm(deleteDate, bookingId) {
    this.setData({
      show: true,
      deleteDate: deleteDate,
      deleteId: bookingId
    })
  },
  slideButtonTap(e) {
    console.log('slide button tap', e)
    if (e.detail.index == 0) this.showDetail(e.detail.data.bookingId);
    else this.showConfirm(e.detail.data.date, e.detail.data.bookingId); //this.deleteBooking(e.detail.data.bookingId);
  },
})