// pages/qrcode/qrcode.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var mode = options.mode

        this.setMode(mode)
 
    },

    setMode(mode){
        var title, userQR
        if (mode == "score") {
            title = "向商家集点"
            userQR = "score," + wx.getStorageSync("user_id")
        }
        else{
            title = "兑换咖啡"
            userQR = "prize," + wx.getStorageSync("user_id")
        }
        this.setData({
            title:title,
            mode:mode,
            userQR: userQR
        })
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})