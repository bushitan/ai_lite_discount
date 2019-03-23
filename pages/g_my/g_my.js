// pages/user/user.js
var GP
var APP = getApp()
var MyUtils = require('my_utils.js')
var myUtils


var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var action_user = new ActionUser()

// var gid = "G7eD40I5ZAutn1z65TG7kgiCj9nI"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '../../images/user-unlogin.png',

        groupList:[1,2],
        gid:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this


        var myUtils = new MyUtils(GP) //初始化
        GP.setData({ userID: wx.getStorageSync(API.USER_ID) }) //设置UID
        GP.getUserInfo() //获取用户信息
        // GP.getGroupList() //获取群组列表
    },

    //检测GP
    checkGID(){
        if (APP.globalData.openGID == "") return //没有获取gid
        var gid = APP.globalData.openGID
        APP.globalData.openGID = ""  //修正为空

        action_user.addGroup(gid, GP.data.userID)
        action_user.addRelGroupUser(gid, GP.data.userID)


        GP.toGroup(gid)
    },



    onShow(options) {
        GP.checkGID() //检测GID是否一致


        console.log("show my")
        // console.log('page scene :', options)

        // wx.onAppShow(GP.AppShow)
    },
    
    // 获取用户头像
    getUserInfo(){
        action_user.getUserInfo(GP.data.userID).then(res => {
            console.log(res)
            GP.getUserInfoSuccess(res.data)
        })
    },

    // 获取群组列表
    getGroupList(){
        action_user.getGroupList(GP.data.userID).then(res => {
            
        })
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
        }
    },

    clickGroup(){
        var gid = e.currentTarget.dataset.gid || e
        GP.toGroup(gid)
    },

    // 去到群组
    toGroup(gid){
        console.log(gid)
        wx.navigateTo({
            url: '/pages/g_camera/g_camera?gid=' + gid,
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})