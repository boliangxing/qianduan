var app = getApp()  
Page({
  data: {
    imgUrls: [
      {
        link: '',
        url: '/image/001.jpg'
      }, {
        link: '',
        url: '/image/002.jpg'
      }, {
        link: '',
        url: '/image/003.jpg'
      }
    ], 
    navbar: ['one', 'two', 'three'],
    currentTab: 0 ,
    // text:"这是一个页面"
    imageSrc: '/image/test.jpg',
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '这只是测试',
      author: '测试',
      src: '',
    
    },
    audioAction: {
      method: 'pause'
    },
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500
   },
  imgchange: function (event) {

    var id = event.currentTarget.id;
    console.log(id);
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },
  toAnimal: function () {
    let data;
    let localStorageValue = [];
    console.log(this.data.inputValue);
    // if (this.data.inputValue != '') {
    //   //调用API从本地缓存中获取数据
    //   var searchData = wx.getStorageSync('searchData') || []
    //   searchData.push(this.data.inputValue)
    //   wx.setStorageSync('searchData', searchData)
    //   wx.navigateTo({
    //     url: '/page/Select/result'
    //   })
    //   // console.log('马上就要跳转了！')
    // } else {
    //   console.log('空白的你搜个jb')
    // }
    // this.onLoad();
  },
  // onLoad: function (options) {

  //   //建立连接
  //   wx.connectSocket({
  //     url: "wss://www.lengfanretui.cn:4431",
  //   })

  //   //连接成功
  //   wx.onSocketOpen(function () {
  //     wx.sendSocketMessage({
  //       data: 'stock',
  //     })
  //   })

  //   //接收数据
  //   wx.onSocketMessage(function (data) {
  //     //var objData = data.data;
  //     console.log(data);
      
  //   })

  //   //连接失败
  //   wx.onSocketError(function () {
  //     console.log('websocket连接失败！');
  //   })
  //  },
  onLoad: function (params) {

    var request = require('../../util/request.js');
    wx.getUserInfo({
      success: function (res) {
        var simpleUser = res.userInfo;
        wx.setStorageSync('storage2', simpleUser)
        console.log(simpleUser);
      }
    });
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res_user) {
              var requestUrl = "https://www.lengfanretui.cn:1212/getSession";
              var jsonData = {
                code: res_login.code,
                encryptedData: res_user.encryptedData,
                iv: res_user.iv
              };
            
              request.httpsPostRequest(requestUrl, jsonData, function (res) {
                that.setData({
                  userinfo: res,
                  //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

                })
                wx.setStorageSync('storage', res)
                console.log(res);
                console.log(res.openid);
              });
            }
          })
        }
      }
    })

 
    
    wx.request({
      url: 'https://www.lengfanretui.cn:1212/Api_Animal',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          videomsg: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories

        })
      }
    }),
    //页面加载完成提示
    this.data.styles = {};
    this.data.styles.curtainViewWidth = 590;
    this.data.styles.curtainViewRight = -(this.data.styles.curtainViewWidth + 100);
    this.data.tabIndex = 0;
    this.data.list = new Array(4);
   
    this.changeTab(0);
    //获取系统信息
    var that = this;
    wx.getSystemInfo({
      success: function (info) {
        that.data.windowHeight = info.windowHeight;
        that.setData(that.data);
        console.log(that.data.windowHeight);
      }
    });
  },
  tabItemClick: function (event) {
    this.changeTab(parseInt(event.currentTarget.id.split("_")[1]));
    console.log(event.currentTarget.id.split("_")[1]);
  },
  swiperChange: function (event) {
    this.changeTab(event.detail.current);
  },
  changeTab: function (index) {
    this.data.tabIndex = index;
    this.setData(this.data);
  }
  ,
  
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },


  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
  ,
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  } ,
  get3rdSession: function () {
    let that = this
    wx.request({
      url: 'https://www.lengfanretui.cn:1212/getSession',
      data: {
        code: this.data.code
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var sessionId = res.data.session;
        that.setData({ sessionId: sessionId })
        wx.setStorageSync('sessionId', sessionId)
        that.decodeUserInfo()
      }
    })
  }
 
})