// pages/user/user.js
var GP

var DB_User = require('../../db/user.js')
var db_user = new DB_User()


var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var action_user = new ActionUser()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '../../images/user-unlogin.png',


        limit:6,

        score:5,
        prize:"2杯咖啡",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // console.log(action_user.login( GP.loginSuccess ))
        wx.showLoading({
            title: '加载中...',
        }) 

        // wx.switchTab({
        //     url: '/pages/seller/seller'
        // })
        // wx.redirectTo({
        //     url: '/pages/seller/seller',
        // })
        // ({
        //     url: '/pages/seller/seller',
        // })
        GP.loginCheck()
    },

    

    // 检查是否登录
    loginCheck(){
        if (wx.getStorageSync(API.USER_ID) == "")
            action_user.login(GP.loginSuccess)
        else {
            wx.redirectTo({
                url: '/pages/g_my/g_my',
            })
        }
            // action_user.updateUserInfo(id, data)
    },

    // 登陆成功
    loginSuccess(res) {
        wx.setStorageSync(API.USER_ID, res._id)
        wx.setStorageSync(API.OPEIN_ID, res.openid)
        wx.setStorageSync(API.APP_ID, res.appid)
        wx.setStorageSync(API.UNION_ID, res.unionid)
        // wx.showToast({
        //     title: '登录成功',
        // })
        console.log(res)

        wx.navigateTo({
            url: '/pages/user/user',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})