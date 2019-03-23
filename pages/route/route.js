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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.showLoading({
            title: '加载中...',
        }) 
        console.log("route:",options)

        GP.loginCheck()
        // GP.checkUserInfo()
    },    

    // 检测是否用户授权
    checkUserInfo(){
        return new Promise( (resolve,reject)=>{
            wx.getSetting({
                success(res) {
                    console.log(res.authSetting)
                    resolve(res.authSetting.hasOwnProperty("scope.userInfo"))
                }
            })
        })
        
    },



    // 检查是否登录
    loginCheck(){
        if (wx.getStorageSync(API.USER_ID) == "")
            action_user.login(GP.loginSuccess)
        else {
            GP.toMy()
        }
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
        GP.toMy()
    },

    // 跳到我的页面
    toMy(){
        GP.checkUserInfo().then( res=>{
            if (res) 
                wx.redirectTo({url: '/pages/g_my/g_my',})
            else
                wx.redirectTo({ url: '/pages/g_info/g_info', })
        })
        // return
       
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})