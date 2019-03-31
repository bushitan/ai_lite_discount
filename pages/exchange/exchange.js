// pages/exchange/exchange.js
var API = require('../../utils/api.js')
var ActionScore = require('../../action/action_score.js')
var action_score = new ActionScore()
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading:true,
        prizeList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        action_score.getScorePrize(wx.getStorageSync(API.USER_ID)).then(res => {
            console.log(res)
            GP.setData({
                isLoading:false,
                scoreList: res.score.data,
                prizeList: res.prize.data,
                shareList: res.share.data
            })
        })
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