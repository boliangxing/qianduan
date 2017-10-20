Page({
  onLoad:function(){
    wx.connectSocket({
      url: 'wss://www.lengfanretui.cn:8080',
    })
    wx.onSocketOpen(function(res){
      wx.setStorageSync('msg','')
      console.log('open');
      wx.getStorage({

        key: 'storage2',
        success: function (res) {
          // console.log(res.data.openid)
          wx.sendSocketMessage({
            data: '{"name":"' + res.data.nickName + '"' + ',"msg":' + '"我来自：' + res.data.province+'"' + '}'
          })
         // page.setData({ userinfo: res.data })
        }
      })
    
      
    })
      
    wx.onSocketMessage(function(msg){
        
      // console.log(msg.data)
       console.log()
       wx.setStorageSync('msg', wx.getStorageSync('msg')+'\n'+msg.data)
       page.setData({ test: wx.getStorageSync('msg')})
    })
    // wx.onSocketClose(function(res){

    //   console.log('close')
    // })
    var page = this 
    wx.getStorage({
      
      key: 'storage2',
      success: function (res) {
        console.log(res.data.nickName)
       
      }
     
    })
  }, 
    usermsgInput: function (e) {
    this.setData({
      usermsg: e.detail.value
    })
  },
  btn_warn: function (e) {
    var msg = this.data.usermsg;
 
    wx.getStorage({

      key: 'storage2',
      success: function (res) {
      
        wx.sendSocketMessage({
          data: '{"name":"' + res.data.nickName + '"' + ',"msg":' + '"' + msg + '"' + '}'
        })
      }

    })

  
   
    
    
    }

  
 

 


})
