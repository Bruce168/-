var util = require("../../utils/util.js");
//获取全局APP里的URL
var app = getApp();

// pages/movies/movies-more/movies-more.js
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
    //console.log(options);

    //设置标题
    var title = options.categoryName;
    wx.setNavigationBarTitle({
      title: title
    })

    var in_theaters = app.globalData.baseUrl + "in_theaters";
    var coming_soon = app.globalData.baseUrl + "coming_soon";
    var top250 = app.globalData.baseUrl + "top250";

    wx.showNavigationBarLoading();
    var datas = [];
    switch (title) {
      case '正在热映':
        this.http(in_theaters, 'in_theaters', '正在热映', datas);
        break;
      case '即将上映':
        this.http(coming_soon, 'coming_soon', '即将上映', datas);
        break;
      case '排行榜':
        this.http(top250, 'top250', '排行榜', datas);
        break;
    }
  },

  http: function (uUrl, category, categoryTitle, datas) {
    var that = this;

    wx.request({
      url: uUrl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
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
   * 页面加载到底部
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 页面到顶部后向下拉加载刷新
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  onMovieDetailTap: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movies-details/movies-details?movieid=' + movieid,
    })
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