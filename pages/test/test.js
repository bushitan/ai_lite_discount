// pages/test/test.js
var Article = require('../../db/article.js')
var db_art = new Article()

var News = require('../../db/news.js')
var db_news = new News()

var APP = getApp()
// var db_art = new require('../../db/article.js')
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cover:"",
        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        console.log(
            db_news.getSelf().then(res => {
                console.log(res)
            })
        )
 
        // db_art.getList().then(function (data){
        //     console.log(data)
        //     GP.setData({
        //         list:data
        //     })
        // })

        console.log(
            // article.downloadCover("cloud://sjtest-a25a0c.736a-sjtest-a25a0c/cover/example.png")
            
        )

        // wx.chooseImage({
        //     success: function (res) {
        //         var path = res.tempFilePaths[0]
        //         article.uploadCover(path)
        //     },
        // })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                console.log('[云函数] [login] user appid: ', res.result.appid)
                console.log('[云函数] [login] user unionid: ', res.result.unionid)
                // app.globalData.openid = res.result.openid
                // wx.navigateTo({
                //     url: '../userConsole/userConsole',
                // })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                // wx.navigateTo({
                //     url: '../deployFunctions/deployFunctions',
                // })
            }
        })
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