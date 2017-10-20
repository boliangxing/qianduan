Page({
    data: {
      // text:"这是一个页面"
      source: ''
    },
    tiJiao: function () {

      wx.navigateTo({
        url: '/page/Call/indexs'
      })

    },
    /**
     * 选择相册或者相机 配合上传图片接口用
     */
    listenerButtonChooseImage: function() {
      var that = this;
      wx.chooseImage({
        count: 1,
        //original原图，compressed压缩图
        sizeType: ['original'],
        //album来源相册 camera相机 
        sourceType: ['album', 'camera'],
        //成功时会回调
        success: function (res) {
          //重绘视图
          that.setData({
            source: res.tempFilePaths
          })
        }
      })
    },
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value)
    },
    reg: function (e) {
      console.log(e.detail.value);

  
    },
    tiJiao: function () {
  
      wx.switchTab ({
          url: '../Call/indexs'
        })
    },
})
