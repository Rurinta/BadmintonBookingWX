const app = getApp()
var Bmob = require('../../utils/bmob.js');
Page({
  data: {
    //场地数组
    spaceList: [
      {
        space: "1号",
        n: 1,
        isShow: true
      },
      {
        space: "2号",
        n: 2,
        isShow: true
      },
      {
        space: "3号",
        n: 3,
        isShow: true
      },
      {
        space: "4号",
        n: 4,
        isShow: true
      },
      {
        space: "5号",
        n: 5,
        isShow: true
      },
      {
        space: "6号",
        n: 6,
        isShow: true
      },
      {
        space: "7号",
        n: 7,
        isShow: true
      },
      {
        space: "8号",
        n: 8,
        isShow: true
      },
      {
        space: "9号",
        n: 9,
        isShow: true
      },
      {
        space: "10号",
        n: 10,
        isShow: true
      },
      {
        space: "11号",
        n: 11,
        isShow: true
      },
      {
        space: "12号",
        n: 12,
        isShow: true
      },
      {
        space: "13号",
        n: 13,
        isShow: true
      },
      {
        space: "14号",
        n: 14,
        isShow: true
      },
      {
        space: "15号",
        n: 15,
        isShow: true
      },
    ],
    //日期数组
    timeList: [],
    //时间数组
    hourList: [
      {
        hour: "09:00-10:00",
        n: 9,
        isShow: true
      },
      {
        hour: "10:00-11:00",
        n: 10,
        isShow: true
      }, {
        hour: "11:00-12:00",
        n: 11,
        isShow: true
      }, {
        hour: "12:00-13:00",
        n: 12,
        isShow: true
      }, {
        hour: "13:00-14:00",
        n: 13,
        isShow: true
      }, {
        hour: "14:00-15:00",
        n: 14,
        isShow: true
      }, {
        hour: "15:00-16:00",
        n: 15,
        isShow: true
      }, {
        hour: "16:00-17:00",
        n: 16,
        isShow: true
      }, {
        hour: "17:00-18:00",
        n: 17,
        isShow: true
      }, {
        hour: "18:00-19:00",
        n: 18,
        isShow: true
      }, {
        hour: "19:00-20:00",
        n: 19,
        isShow: true
      }, {
        hour: "24:00-01:00",
        n: 24,
        isShow: true
      }],
    //是否显示
    timeShow: false,
    spaceShow: false,
    currentTab: 0,
    //选择时间
    chooseHour: "--",
    // 选择日期
    chooseTime: "--",
    chooseSpace: "--",
    hourIndex: -1,
    hourindex: -1,
    spaceindex: -1,

    flag: false,
    flag1: false
  },

  //弹出时间按钮
  showTimeModel: function () {
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
  },

  //弹出场地按钮
  showSpaceModel: function () {
    if (this.data.chooseHour == "--") {
      wx.showModal({
        title: '提示',
        content: "请先选择时间"
      })
    }
    else {
      this.setData({
        spaceShow: !this.data.spaceShow,
      });
    }
  },

  //确认时间
  confirm: function () {
    this.setData({
      flag: true,
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
    var list = this.data.spaceList;
    if (this.data.chooseSpace == "--") {
      var ISEMPTY = Bmob.Object.extend("isEmpty");
      var query = new Bmob.Query(ISEMPTY);
      query.equalTo("time", this.data.chooseHour);
      query.equalTo("status", false);
      query.find({
        success: function (results) {
          console.log('共查询到' + results.length + '条数据');
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var obj = results[i];
            for (var j = 0; j < list.length; j++) {
              if (list[j].space == obj.get('space')) {
                console.log(list[j].space);
                list[j].isShow = false;
              }
            }
          }
        }
      })
      console.log(list);
    }
    for (var k = 0; k < list.length; k++) {
      this.data.spaceList[k].isShow = list[k].isShow;
    }
    var list1 = this.data.spaceList;
    console.log(list1);
  },

  //确认场地
  confirm1: function () {
    this.setData({
      flag: true,
      spaceShow: !this.data.spaceShow,
    });
  },

  //点击外部取消时间弹框
  modelCancel: function () {
    var flag = this.data.flag;
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date
    })
    if (flag == false) {
      this.setData({
        chooseHour: '--'
      })
    }
  },

  //点击外部取消场地弹框
  modelCancel1: function () {
    var flag = this.data.flag;
    this.setData({
      spaceShow: !this.data.spaceShow,
    });
    if (flag == false) {
      this.setData({
        chooseSpace: '--'
      })
    }
  },

  //日期选择
  timeClick: function (e) {
    //非今天-过时不判断
    if (e.currentTarget.dataset.index != 0) {
      var list = this.data.hourList;
      for (var i = 0; i < list.length; i++) {
        list[i].isShow = true;
      }
      this.setData({
        hourList: list
      })
    } else {
      //过时不可预约
      var hour = new Date().getHours();
      for (var i = 0; i < this.data.hourList.length; i++) {
        var list = this.data.hourList;
        if (this.data.hourList[i].n <= hour) {
          list[i].isShow = false;
          this.setData({
            hourList: list
          })
        }
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      chooseHour: "",
      hourIndex: -1
    });
    console.log(this.data.chooseTime)
  },

  // 时间选择
  hourClick: function (e) {
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour
    });
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    console.log(chooseTime)
  },

  //场地选择
  spaceClick: function (e) {
    var that = this;
    console.log(this.data.spaceList)
    console.log(e.currentTarget.dataset.isshow)
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      chooseSpace: this.data.spaceList[e.currentTarget.dataset.index].space
    });
    var choosespace = this.data.chooseSpace;
    console.log(choosespace)
  },

  default: function (param) {
    wx.switchTab({
      url: '../order/order',
    })
  },

  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      //
      switch (interval) {
        case "y": date.setFullYear(this.getFullYear() + number); break;
        case "m": date.setMonth(this.getMonth() + number); break;
        case "d": date.setDate(this.getDate() + number); break;
        case "w": date.setDate(this.getDate() + 7 * number); break;
        case "h": date.setHours(this.getHours() + number); break;
        case "n": date.setMinutes(this.getMinutes() + number); break;
        case "s": date.setSeconds(this.getSeconds() + number); break;
        case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
      }
      return date;
    }
    var dateList = [];
    //7天
    var now = new Date();
    var day = now.getDay();
    //
    for (var i = 0; i < 7; i++) {
      var d = {};
      if (i == 0) { var w = "今天" }
      if (i == 1) { var w = "明天" }
      if (i == 2) { var w = "后天" }
      if (i == 3) {
        if (day == 1) { var w = "周四" }
        if (day == 2) { var w = "周五" }
        if (day == 3) { var w = "周六" }
        if (day == 4) { var w = "周日" }
        if (day == 5) { var w = "周一" }
        if (day == 6) { var w = "周二" }
        if (day == 7) { var w = "周三" }
      }
      if (i == 4) {
        if (day == 1) { var w = "周五" }
        if (day == 2) { var w = "周六" }
        if (day == 3) { var w = "周日" }
        if (day == 4) { var w = "周一" }
        if (day == 5) { var w = "周二" }
        if (day == 6) { var w = "周三" }
        if (day == 7) { var w = "周四" }
      }
      if (i == 5) {
        if (day == 1) { var w = "周六" }
        if (day == 2) { var w = "周日" }
        if (day == 3) { var w = "周一" }
        if (day == 4) { var w = "周二" }
        if (day == 5) { var w = "周三" }
        if (day == 6) { var w = "周四" }
        if (day == 7) { var w = "周五" }
      }
      if (i == 6) {
        if (day == 1) { var w = "周日" }
        if (day == 2) { var w = "周一" }
        if (day == 3) { var w = "周二" }
        if (day == 4) { var w = "周三" }
        if (day == 5) { var w = "周四" }
        if (day == 6) { var w = "周五" }
        if (day == 7) { var w = "周六" }
      }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM-dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    //初始化判断
    //当前时间
    var hour = new Date().getHours();
    for (var i = 0; i < this.data.hourList.length; i++) {
      var list = this.data.hourList;
      //过时不可选
      if (this.data.hourList[i].n <= hour) {
        list[i].isShow = false;
        this.setData({
          hourList: list
        })
      }
    }
    
    for(var k=0;k<list.length;k++)
    {
    var s=list[k].hour;
    var  ISEMPTY = Bmob.Object.extend("isEmpty");
    var query = new Bmob.Query(ISEMPTY);
    query.equalTo("time",s);
    query.equalTo("status", true);
    query.find({
      success: (results) => {
        console.log(s+"还有空场")

      },
      error: function (error) {
        list[k].isShow=false;
      }
    });
    }
    var that=this;
    that.setData({
      hourList:list
    })
    console.log(this.data.hourList)

    
    //每日更新一次isEmpty数据库
    var todaydate = Bmob.Object.extend("TodayDate");
    var query = new Bmob.Query(todaydate);
    var today = this.data.timeList[0].date;
    query.find({
      success: function(results)  {
        var obj;
        for(var i=0;i<results.length;i++)
        {
          obj=results[i];
        if (obj.get('Date') != today)
        {
          results[i].set('Date',today);
          results[i].save();
          var ISEMPTY = Bmob.Object.extend("isEmpty");
          var query = new Bmob.Query(ISEMPTY);
          query.equalTo("status", false);
          query.find({
            success: function (res) {
              console.log('共查询到' + res.length + '条数据为false');
              console.log(results);
              for (var j = 0; j < res.length; j++) {
                res[j].set('status', true);
                res[j].save();
              }
            }
          })
        }
        }
        }})




  },

  /**生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /** 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /** 生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /** 生命周期函数--监听页面卸载*/
  onUnload: function () {

  },

  /** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },

  /**页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /**用户点击右上角分享*/
  onShareAppMessage: function () {

  },
  formSubmit: function () {
    var warn = "";
    var flag = true;
    if (this.data.chooseHour == '--') {
      warn = "请选择预约时间";
    } else if (this.data.chooseSpace == '--') {
      warn = "请选择预约场地";
    } else {
      wx.setStorage({
        key: "chooseTime",
        data: this.data.chooseTime,
      })
      console.log("chooseTime缓存成功",this.data.chooseTime),
      wx.setStorage({
        key: "chooseHour",
        data: this.data.chooseHour,
      })
      console.log("chooseHour缓存成功", this.data.chooseHour),
      wx.setStorage({
        key: "chooseSpace",
        data: this.data.chooseSpace,
      })
      console.log("chooseSpace缓存成功", this.data.chooseSpace),
      flag = false;
      var that = this;
      var ISEMPTY = Bmob.Object.extend("isEmpty");
      var query = new Bmob.Query(ISEMPTY);
      query.equalTo("time", this.data.chooseHour);
      query.equalTo("space", this.data.chooseSpace);
      query.find({
        success: function (results) {
        
          for(var i=0;i<results.length;i++)
          {
            var obj=results[i];
            if(obj.get('status')==false)
            {
              wx.showModal({
                title: '提示',
                content: "很遗憾晚了一步，该场被订"
            })
            }
            else{
              results[i].set('status',false);
              results[i].save();
              wx.redirectTo({
                url: '../pay/pay'
              })
            }
          }
        }
      })
      console.log('form发生了submit事件，携带数据为：', this.data.chooseTime, this.data.chooseHour, this.data.chooseSpace);
    }

    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})