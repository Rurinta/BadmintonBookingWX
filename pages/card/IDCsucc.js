// pages/card/IDCsucc.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
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
    var Studentnumber = Bmob.Object.extend("schoolCard");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(Studentnumber);
    //查询单条数据，第一个参数是这条数据的objectId值
    var value = wx.getStorageSync('Login');
    console.log(value);

    that = this;
    query.equalTo("objectId", value);
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('StedentName'));
        }
        if(results.length){
          that.setData({
            results: results
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: "请先绑定学生证信息",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../card/SchoolCard',
                })
              }
            }
          })
        }
        
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
        wx.showModal({
          title: '提示',
          content: '查询失败',
        }) 
      }
    });
    // query.get(value, {
    //   success: function (result) {
    //     // console.log("共查询到 " + result.length + " 条记录");
    //     // 查询成功，调用get方法获取对应属性的值
    //     StudentID = result.get("AAA");
    //     console.log(StudentID);
    //     stedentName = result.get("StedentName");
    //     // console.log(stedentName);
    //   },
    //   error: function (object, error) {
    //     // 查询失败
    //       wx.showModal({
    //         title: '提示',
    //         content: "请先绑定学生证信息",
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx.navigateTo({
    //               url: '../card/SchoolCard',
    //             })
    //           }
    //         }
    //       }) 
    //   }

    // });
    

  },

 
})