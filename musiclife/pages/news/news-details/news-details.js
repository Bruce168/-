var newsData = require("../../data/newsdata.js");

// pages/news/news-details/news-details.js
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
    //console.log(options.newsid);
    console.log(newsData.newsData[options.newsid]);
    this.setData({
      newsdetails:newsData.newsData[options.newsid]
    });
    this.setData({
      newsid : options.newsid
    });


    var newsCollect = wx.getStorageSync('newsCollect');
    if (newsCollect!=null){
      this.setData({
        condition:newsCollect[this.data.newsid]
      });
    }else{
      newsCollect = {};
      newsCollect[this.data.newsid] = false;
      wx.setStorageSync('newsCollect', newsCollect);
      this.setData({
        condition: false
      });
    }
  },

  collectTap: function(event){
    var newsCollect = wx.getStorageSync('newsCollect');
    var newCollect = newsCollect[this.data.newsid];
    newCollect = !newCollect;
    newsCollect[this.data.newsid] = newCollect;

    wx.setStorageSync('newsCollect', newsCollect);

    this.setData({
      condition: newCollect
    });
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