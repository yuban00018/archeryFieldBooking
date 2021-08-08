// miniprogram/pages/createContests/createContests.js

const computedBehavior = require('../../miniprogram_npm/miniprogram-computed/index.js')
const date = new Date()
const db = wx.cloud.database()

// export function delay(milSec) {
//   return new Promise(resolve => {
//     setTimeout(resolve, milSec)
//   })
// }


Page({
  multiIndex: [0, 0, 0],
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
    }, {
      name: 'name',
      rules: {
        required: true,
        message: '比赛名称是必选项',
      }
    }, ],
  },
  computed: {},
  formInputChange(e) {
    console.log(e)
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  onLoad: function () {
    console.log(getApp().globalData.openid)
    this.setData({
      [`formData.date`]: this.data.chosen_date
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
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        console.log(errors)
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
          console.log(this.data.multiIndex)
        }
      } else {
        db.collection("contests_info").add({
          data: {
            bookingDate: this.data.formData.date,
            date: date.getFullYear().toString() + '-' + (date.getMonth() < 9 ? '0'.toString() : '') + (date.getMonth() + 1).toString() + '-' + (date.getDate() < 10 ? '0'.toString() : '') + date.getDate().toString(),
            name: this.data.formData.name,
            state: '已发起',
            type: this.data.multiArray[0][this.data.multiIndex[0]],
            range: this.data.multiArray[1][this.data.multiIndex[1]],
            groupNumber: this.data.multiArray[2][this.data.multiIndex[2]],
          }
        }).then(
          wx.showToast({
            title: '发起成功',
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../mainPage/mainPage',
                })
              }, 2000);
            }
          }),
        )
      }
    })
  },


  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

})