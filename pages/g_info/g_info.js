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
            action_user.updateUserInfo(userID, e.detail.userInfo).then(res => {
                wx.redirectTo({ url: '/pages/user/user', })  //集点卡
                wx.redirectTo({ url: '/pages/g_my/g_my', }) //群合照
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})