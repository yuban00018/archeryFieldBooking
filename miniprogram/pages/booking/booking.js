// pages/test.js

const computedBehavior = require('../../miniprogram_npm/miniprogram-computed/index.js')
const date = new Date()
const db = wx.cloud.database()

Page({
  behaviors: [computedBehavior],
  data: {
    chosen_date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() < 10 ? '0'.toString() : '') + date.getDate().toString(),
    end_date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() + 7 < 10 ? '0'.toString() : '') + (date.getDate() + 7).toString(),
    isAgree: true,
    formData: {},
    rules: [{
      name: 'date',
      rules: {
        required: true,
        message: '日期是必选项',
      }
    }],
  },
  computed: {},
  onLoad: function () {
    console.log(getApp().globalData.openid)
    this.setData({
      [`formData.date`]: this.data.chosen_date
    })
  },
  bindDateChange: function (e) {
    this.setData({
      chosen_date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
    console.log(this.data.formData)
  },
  bindAgreeChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  submitForm() {
    if (!this.data.isAgree) {
      this.setData({
        error: '请同意条款后继续'
      });
      return;
    }
    this.selectComponent('#form').validate((valid, errors) => {
      //console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      }
    })
    db.collection('booking').where({
      bookingDate: this.data.chosen_date
    }).get().then(res => {

      db.collection('booking').where({
        bookingDate: this.data.chosen_date,
        _openid: getApp().globalData.openid
      }).get().then(res2 => {
        if (res2.data.length > 0) this.setData({
          error: '只能预定一个靶位'
        })
        else if (res.data.length < 5) {
          db.collection('booking').add({
            data: {
              bookingDate: this.data.chosen_date,
              date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() < 10 ? '0'.toString() : '') + date.getDate().toString()
            }
          }).then(
            wx.showToast({
              title: '预定成功'
            })
          )
        } else {
          this.setData({
            error: '当前时段预约已满'
          })
        }
      })
    })
  }
})