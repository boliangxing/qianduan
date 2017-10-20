Page({

  onLoad: function (options) {
    var title = options.title
    console.log(options)
    var that = this
    console.log(title)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    var Util = require('../../util/util.js');
    wx.request({
      url: 'https://www.lengfanretui.cn:1212/getAnimal',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      data: Util.json2Form({ title: title }), 
      method:"POST",
      success: function (res) {
     
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          s: res.data,
          src:res.data[0].src
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          
        })
      }
    })
  }
})    