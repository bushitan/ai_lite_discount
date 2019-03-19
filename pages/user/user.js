// pages/user/user.js
var GP

var DB_User = require('../../db/user.js')
var db_user = new DB_User()

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
        GP.login()

        var db  = wx.cloud.database()
        db.collection('user').where({
            _openid: 'o7eD40K05ZC2aDSs3Abw28hKW6JM' // 填入当前用户 openid
        }).get({
            success(res) {
                console.log(res.data)
            }
        })
    },










    //获取用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
            db_user.getSelf().then(res => {
                console.log(res)
            }).catch(console.error)
            // db_user.add(e.detail.userInfo).then(res => {
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