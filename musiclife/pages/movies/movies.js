var util = require("../utils/util.js");

// pages/movies/movies.js
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
    var inTheaters = "http://localhost:8080/testJson/servlet/jsonServlet?fName=inTheaters";
    var coming_soon = "http://localhost:8080/testJson/servlet/jsonServlet?fName=coming_soon";
    var top250 = "http://localhost:8080/testJson/servlet/jsonServlet?fName=top250";

    var datas = [];
    this.http(inTheaters, 'in_theaters', '正在热映', datas);
    this.http(coming_soon, 'coming_soon', '即将上映', datas);
    this.http(top250, 'top250', '排行榜', datas);
  },

  http: function (uUrl, category, categoryTitle, datas) {
    var that = this;

    wx.request({
      url: uUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.callback(res.data, category, categoryTitle, datas);
      }
    })
  },


  callback: function (res, category, categoryTitle, datas) {
    var movies = [];
    var subjects = res.subjects;
    for (var idx in subjects) {
      var subject = subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //处理评星
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    
       
    
    var readyData = {};

    readyData = {
      categorytitle: categoryTitle,
      movies: movies
    };

    datas.push(readyData);

    this.setData({ readyData: datas });

    wx.hideNavigationBarLoading();

    console.log(datas);
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