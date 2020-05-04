const app = getApp()
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   time:"--",
   hour:"--",
   space:"--" 
  },

  primary:function()
  {
   var User=wx.getStorageSync('Login');
   console.log(User)
   var choosetime=this.data.time;
   var choosehour= this.data.hour;
   var choosespace = this.data.space;
    var Dairy = Bmob.Object.extend("Connect");
    var dairy = new Dairy();
    dairy.set("user",User);
    dairy.set("date", choosetime);
    dairy.set("time", choosehour);
    dairy.set("space", choosespace);
    dairy.save(null, {
      success: function (results) {
        console.log("添加成功", choosetime,choosehour,choosespace);
        wx.showModal({
          title: '提示',
          content: "已添加完成，可在“我的”查看"
        })


      },
      error: function (results, error) {
        console.log("添加失败");
        wx.showModal({
          title: '提示',
          content: "添加失败，请重试"
        })
      }
    })


  },
  default:function()
  {
    wx.switchTab({
  
      url: '../order/order'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var chooseTime = wx.getStorageSync('chooseTime');
    var chooseHour = wx.getStorageSync('chooseHour');
    var chooseSpace = wx.getStorageSync('chooseSpace');
    console.log(chooseTime,chooseHour,chooseSpace);
    var that = this;
    that.setData({
      time:chooseTime,
      hour: chooseHour,
      space: chooseSpace,
    })
    console.log(this.data.time,this.data.hour, that.data.space);
    
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