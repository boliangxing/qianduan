//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    selectHide:false,
    inputValue:'',
    getSearch:[],
    modalHidden:true
  },
  bindInput:function(e){
     this.setData({
       inputValue:e.detail.value
     })
     console.log('bindInput'+this.data.inputValue)
  },
  setSearchStorage:function(){
    let data;
    let localStorageValue = [];
    if(this.data.inputValue != ''){
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      console.log(this.data.inputValue)
      wx.navigateTo({
        url: '/page/Select/result?title=' + this.data.inputValue
      })
      // console.log('马上就要跳转了！')
    }else{
      console.log('空白的你搜个jb')
    }
    // this.onLoad();
  },
  modalChangeConfirm:function(){
      wx.setStorageSync('searchData',[])
      this.setData({
        modalHidden:true
      })
      var page = getCurrentPages().pop();
      if (page == undefined || page == null) return;
      page.onShow(); 
     
      
  },
  modalChangeCancel:function(){
     
      this.setData({
        modalHidden: true
      })
    
      //this.onLoad();
  },
  clearSearchStorage:function(){
     this.setData({
        modalHidden:false
    })
    // this.onLoad();
  },
  onLoad: function() {
    console.log('select is onLoad');
  },
  onShow:function(){
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch:getSearch,
      inputValue:''
    })
    console.log('select is onshow')
  },
  onHide:function(){
    console.log('select is onHide')
    wx.redirectTo({
      url: '/page/Select/indexs'
    })
  },
  bindchange:function(e){
    console.log('bindchange')
  },
  clearInput:function(){
    this.setData({
       inputValue:''
     })
  }
})