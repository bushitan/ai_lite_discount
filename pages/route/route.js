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

        GP.checkShare(options)
            
        GP.loginCheck()
    },    
    checkShare(options){
        if (options.hasOwnProperty("is_share"))
            wx.setStorageSync(API.SHARE_SCORE_ID, options.score_id)
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
        action_user.login().then( userInfo => {
            wx.setStorageSync(API.USER_ID, userInfo._id)
            wx.setStorageSync(API.OPEN_ID, userInfo._openid)
            wx.setStorageSync(API.USER_INFO, userInfo)
            GP.toScore()  //集点卡
            // GP.toMy()  //群相册
        })
    },


    // 跳到我的页面
    toScore() {
        GP.checkUserInfo().then(res => {
            if (res)
                wx.redirectTo({ url: '/pages/menu/menu', })
            else
                wx.redirectTo({ url: '/pages/g_info/g_info', })
        })
        // return
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