var newsData = require("../../data/newsdata.js");

// pages/news/news-details/news-details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isplayer:false
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

    wx.showToast({
      title: newCollect?'收藏成功':'取消收藏',
      icon: 'success',
      duration: 1000,
      mask:true
    })
  },

  onshowTap: function(event){
    /*
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/

    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  onShareAppMessage: function (res) {
    
    return {
      title: '分享',
      path: '/pages/news/news-details/news-details',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  playermusicTap:function(event){
    console.log('playmusic');
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (backgroundAudioManager.paused==false){
      wx.pauseBackgroundAudio();
      this.setData({
        isplayer:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: newsData.newsData[this.data.newsid].music.url,
        title: newsData.newsData[this.data.newsid].music.title,
        coverImgUrl: newsData.newsData[this.data.newsid].music.coverImg
      })
      this.setData({
        isplayer: true
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