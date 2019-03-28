// components/xx_cover_news/xx_cover_news.js
var QR = require("qrcode_utils.js");
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        placeholder: {
            type: String,
            value: "标记",
            observer:"formSubmit",
        },
  },

  /**
   * 组件的初始数据
   */
  data: {
      canvasHidden: false,
      maskHidden: true,
      imagePath: '',
    //   placeholder: 'http://wxapp-union.com'//默认二维码生成文本
  },

  ready(){
    //   var size = this.setCanvasSize();//动态设置画布大小
    //   var initUrl = this.data.placeholder;
    //   this.createQrCode("47382943829", "mycanvas", size.w, size.h);
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },

      formSubmit: function (newVal, oldVal) {

          if (!newVal ) return 

          var that = this;
          var url = newVal;
          that.setData({
              maskHidden: false,
          });
          wx.showToast({
              title: '生成中...',
              icon: 'loading',
              duration: 1000
          });
        //   var st = setTimeout(function () {
              wx.hideToast()
              var size = that.setCanvasSize();
              //绘制二维码
              that.createQrCode(url, "mycanvas", size.w, size.h);
              that.setData({
                  maskHidden: true
              });
            //   clearTimeout(st);
        //   }, 1000)

      },

      //适配不同屏幕大小的canvas
      setCanvasSize: function () {
          var size = {};
          try {
              var res = wx.getSystemInfoSync();
              //不同屏幕下canvas的适配比例；设计稿是750宽
              var scale = 750 / 686; 
              var width = res.windowWidth / scale;
              var height = width;//canvas画布为正方形
              size.w = width;
              size.h = height;
          } catch (e) {
              // Do something when catch error
              console.log("获取设备信息失败" + e);
          }
          return size;
      },
      createQrCode: function (url, canvasId, cavW, cavH) {
          //调用插件中的draw方法，绘制二维码图片
          QR.api.draw(url, canvasId, cavW, cavH,this);
          setTimeout(() => { this.canvasToTempImage(); }, 1000);

      },
      //获取临时缓存照片路径，存入data中
      canvasToTempImage: function () {
          var that = this;
          wx.canvasToTempFilePath({
              canvasId: 'mycanvas',
              success: function (res) {
                  var tempFilePath = res.tempFilePath;
                  console.log(tempFilePath);
                  that.setData({
                      imagePath: tempFilePath,
                      // canvasHidden:true
                  });
              },
              fail: function (res) {
                  console.log(res);
              }
          },this);
      },
      //点击图片进行预览，长按保存分享图片
      previewImg: function (e) {
          var img = this.data.imagePath;
          console.log(img);
          wx.previewImage({
              current: img, // 当前显示图片的http链接
              urls: [img] // 需要预览的图片http链接列表
          })
      },
      

  }
})
