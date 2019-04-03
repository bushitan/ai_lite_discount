// pages/seller/seller.js

var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var action_user = new ActionUser()
var ActionScore = require('../../action/action_score.js')
var action_score = new ActionScore()


var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[
            {name:"魏老师",type:1,num:1},
        ],

        checkList:[], // 核销记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
    },

    onShow(){
        var sellerID = wx.getStorageSync(API.USER_ID)
        action_score.getCheckTrace(sellerID).then(res=>{
            console.log("获取核销成功：",res)
            GP.setData({
                checkList:res.data
            })
        }).catch(res => {
            console.log("获取核销记录失败：", res)

        })
    },

    // 扫码核销
    scan(e){
        var scanMode = e.currentTarget.dataset.mode
        console.log("scanMode：", scanMode)
        wx.scanCode({
            // onlyFromCamera: true,
            scanType:['qrCode'],
            success(res) {
                console.log(res)
                var list = res.result.split(",")
                var mode = list[0]
                var userID = list[1]

                if (mode == "score")
                    GP.addScore(userID, scanMode)
                else if (mode == "prize")
                    GP.exchangePrize(userID)
                else
                    wx.showModal({
                        title: '这不是集点卡二维码',
                        content: '',
                    })
            }
        })
    },

    // 集点
    addScore(userID, scanMode){
        // todo 云函数，为用户增加点数
        // var userID  = "user_id"
        
        action_score.checkScore(
            userID, // 用户id
            wx.getStorageSync(API.USER_ID), // 核销员id
            scanMode
        ).then(res =>{
            console.log(res)
            wx.showModal({
                title: '核销成功',
                content: res.msg,
            })
        })
    },

    // 兑换咖啡
    exchangePrize(userID) {
        action_score.exchangePrize(
            userID, // 用户id
            wx.getStorageSync(API.USER_ID), // 核销员id
        ).then(res => {
            console.log(res)
            wx.showModal({
                title: '兑换成功',
                content: res.msg,
                showCancel: false,
            })
            if (res.status == false)
                wx.showModal({
                    title: '兑换失败',
                    content: res.msg,
                    showCancel:false,
                })
        })
    },

    // 删除集点
    deleteScore(userID) {
        // todo 云函数，删除集点数
    },

    


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            path: "/pages/route/route"
        }
    }
})