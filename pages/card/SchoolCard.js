// pages/card/IDCard.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formSubmit: function (e) {
    var StudentNumber = Bmob.Object.extend("schoolCard");
    var query = new Bmob.Query(StudentNumber);
    query.equalTo("AAA", e.detail.value.StudentID);
    query.equalTo("CardPassword", e.detail.value.CardPassword);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        var object = results[0];
        if (results.length) {
          var pp = object.id;
          console.log(pp);
          wx.setStorageSync('Login', pp);
          common.showTip("登录成功", "success", function () {
            wx.redirectTo({
              url: '../card/IDCsucc',
            })
          });
        }
        else {
          common.showTip("对不起，您输入的用户名或密码错误", "loading");
        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
        common.showTip("信息绑定失败，请重试", "loading");
      }
    });
    var user = wx.getStorageSync('Login');
    var connect = Bmob.Object.extend("Bind");
    var C = new connect();
    C.set("user", user);
    C.save(null, {
      success: function (results) {
        console.log("添加成功", user);
      },
      error: function (results, error) {
        console.log("添加失败");
      }
  })
  },
})