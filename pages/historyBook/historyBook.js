// pages/user/historyBook.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
var count;
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
    var Studentnumber = Bmob.Object.extend("Connect");
    var query = new Bmob.Query(Studentnumber);
    var value = wx.getStorageSync('Login');
    console.log(value);

    that = this;
    if (value) {
      query.equalTo("user", value);
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          count = results.length;
          if (results.length) {
            that.setData({
              results: results
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: "暂时还没有订单信息",
            })
          }
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
          查询失败
          wx.showModal({
            title: '提示',
            content: "查询失败",
          })
        }
      });
    }
    else {
      wx.showModal({
        title: '提示',
        content: "请先绑定学生证信息",
      })
    }
  
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