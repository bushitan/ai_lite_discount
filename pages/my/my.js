// pages/my/my.js

var API = require('../../utils/api.js')
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        isLogin:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.checkUserInfo()
    },
    checkUserInfo() {
        var user_info = wx.getStorageSync(API.KEY_USER_INFO)
        if (user_info != ""){
            GP.setData({
                userInfo: user_info,
                isLogin:true,
            })
        }
    },

    getUserInfo(e){
        console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        console.log(e.detail.rawData)
        if (e.detail.errMsg == "getUserInfo:ok"){
            wx.setStorageSync(API.KEY_USER_INFO, e.detail.userInfo)
            GP.checkUserInfo()
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    clickCard(){
        wx.previewImage({
            urls: ["../../images/swiper.jpg"],
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})