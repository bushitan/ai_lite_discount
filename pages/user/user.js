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

        score:{
            //普通版本
            _id:"",
            type: 1,//1积分,2奖品
            userID: "",
            sellID: "",
            isUsed: 0,//0 未使用，1已使用
            createTime:"",
            checkTime:"",
            //分享模块
            shareID:"",
            shareSellerID:"",
            shareTime:"",
            shareCheckTimg:"",
            isShare: 0,//0 已分享，1未分享
            shareUserNum: 1,//
            shareUserUnit: 1,//
            shareFriendNum: 1,//
            shareFriendUnit: 1,//


        },
        user:{},


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // console.log(action_user.login( GP.loginSuccess ))
        GP.loginCheck()
    },

    // 检查是否登录
    loginCheck(){
        if (wx.getStorageSync(API.USER_ID) == "")
            action_user.login(GP.loginSuccess)
        else {
            var userID = wx.getStorageSync(API.USER_ID)
            action_user.getUserInfo(userID, GP.getUserInfoSuccess)
        }
            // action_user.updateUserInfo(id, data)
    },

    // 登陆成功
    loginSuccess(res) {
        wx.setStorageSync(API.USER_ID, res._id)
        wx.setStorageSync(API.OPEIN_ID, res.openid)
        wx.setStorageSync(API.APP_ID, res.appid)
        wx.setStorageSync(API.UNION_ID, res.unionid)
        wx.showToast({
            title: '登录成功',
        })
        console.log(res)
    },

    //获取用户头像
    getUserInfoSuccess(userInfo){
        GP.setData({
            logged: true,
            avatarUrl: userInfo.avatarUrl || '../../images/user-unlogin.png',
            userInfo: userInfo
        })
    },

    //获取用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            GP.getUserInfoSuccess(e.detail.userInfo)

            var userID = wx.getStorageSync(API.USER_ID)
            action_user.updateUserInfo( userID,e.detail.userInfo)

            // db_user.getSelf().then(res => {
            //     console.log(res)
            // }).catch(console.error)
            // var u = e.detail.userInfo
            // u.city = "123"
            // db_user.add(u).then(res => {
            //     console.log(res)
            // }).catch(console.error)
        }


    },








    login(){
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

        wx.cloud.callFunction({
            name: 'sum',
            data: {
                a:1,
                b:2,
            },
            success: res => {
                console.log(res)

                // console.log('[云函数] [login] user openid: ', res.result.openid)
                // console.log('[云函数] [login] user appid: ', res.result.appid)
                // console.log('[云函数] [login] user unionid: ', res.result.unionid)
                // app.globalData.openid = res.result.openid
                // wx.navigateTo({
                //     url: '../userConsole/userConsole',
                // })
            },
            fail: err => {
                // console.error('[云函数] [login] 调用失败', err)
                // wx.navigateTo({
                //     url: '../deployFunctions/deployFunctions',
                // })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})