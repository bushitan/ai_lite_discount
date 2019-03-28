// pages/user/user.js
var GP

var DB_User = require('../../db/user.js')
var db_user = new DB_User()


var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var action_user = new ActionUser()
var ActionScore = require('../../action/action_score.js')
var action_score = new ActionScore()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '../../images/user-unlogin.png',

        limit:6,
        // score: [0, 1, 2, 3, 4, 5, 6, 7, 8,9],
        scoreList:[],
        prizeList: [],
        // prize:"2杯咖啡",

        scoreDict:{
            //普通版本
            _id:"",
            type: 1,//1积分,2奖品,
            userID: "",
            sellID: "",
            isUsed: 0,//0 未使用，1已使用
            createTime:"",
            checkTime:"", //核销时间
            //分享模块
            shareType: 1,//, 1分享模块
            shareUserID:"",
            shareSellerID: "",
            shareTime:"",
            shareCheckTimg:"",
            shareUserNum: 1,//
            shareUserUnit: 1,//
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

        }


    },


    // 到集点二维码
    toQR(){
        wx.navigateTo({
            url: '/pages/qrcode/qrcode?mode=score',
        })
    },


    // 每次显示首页，刷新点数
    // getScore(){
    //     action_score.getScore(wx.getStorageSync(API.USER_ID)).then( res =>{
    //         console.log(res)
    //         // 设置我的杯数
    //         var result = res.data
    //         var myScore = []
    //         for (var i = 0; i < result.length; i++)
    //             myScore.push(result[i])
    //         GP.setData({
    //             myScore: myScore
    //         })           

    //         // 展示的效果
    //         var scoreList = res.data
    //         var MAX_SCORE  = 10
    //         var num = 0
    //         if (scoreList.length < MAX_SCORE)
    //             var num = MAX_SCORE - scoreList.length
    //         for( var i = 0 ; i<num ; i++)
    //             scoreList.push({
    //                 type: 3,//1积分,2奖品
    //                 userID: "",
    //                 sellID: "",
    //                 isUsed: 0,//0 未使用，1已使用
    //                 createTime: "",
    //                 checkTime: "", //核销时间
    //             })
    //         GP.setData({
    //             scoreList: scoreList,
    //         })
            
    //     })
    // },

    onShow(){
        GP.getScorePrize()
    },

    // 查询点数和已经兑换的咖啡数
    getScorePrize(){
        action_score.getScorePrize(wx.getStorageSync(API.USER_ID)).then(res => {
            console.log(res)
            GP.setData({
                scoreList: res.score.data,
                prizeList: res.prize.data,
            })
            
        })
    },
    
    // 兑换礼物
    exchangePrize(){
        wx.navigateTo({
            url: '/pages/qrcode/qrcode?mode=prize',
        })
    },


    copyID(){
        wx.setClipboardData({
            data: wx.getStorageSync(API.USER_ID),
            success: function(res) { console.log("copy right")},
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            path:"/pages/route/route"
        }
    }
})