const app = getApp()
var Bmob = require('../../utils/bmob.js');
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
    
  },
  default:function(param){
    var time=wx.getStorageSync('chooseTime');
    var hour = wx.getStorageSync('chooseHour');
    var space = wx.getStorageSync('chooseSpace');

    wx.removeStorage({
      key: "chooseTime",
      success: function(res) {
        console.log("成功清理")
      },
    })
    wx.removeStorage({
      key: "chooseHour",
      success: function (res) {
        console.log("成功清理")
      },
    })
    wx.removeStorage({
      key: "chooseSpace",
      success: function (res) {
        console.log("成功清理")
      },
    })
    var ISEMPTY = Bmob.Object.extend("isEmpty");
    var query = new Bmob.Query(ISEMPTY);
    query.equalTo("time", hour);
    query.equalTo("space", space);
    query.find({
      success: function (results) {

        for (var i = 0; i < results.length; i++) {
            results[i].set('status', true);
            results[i].save();
          }
        }
  
    })
    wx.switchTab({
      url: '../order/order',
    })
  },
  primary:function(){
    wx.redirectTo({
      url: '../finish/finish',
    })
  }})