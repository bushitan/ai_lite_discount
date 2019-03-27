// pages/seller/seller.js

var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var action_user = new ActionUser()


var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[
            {name:"魏老师",type:1,num:1},
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
    },

    // 扫码核销
    scan(e){
        var type = e.currentTarget.dataset.type
        wx.scanCode({
            onlyFromCamera: true,
            scanType:['qrCode'],
            success(res) {
                console.log(res)
                var userID = res.daa.result
                if (type == "addScore")
                    GP.addScore(userID)
            }
        })
    },

    // 集点
    addScore(userID){
        // todo 云函数，为用户增加点数
    },
    // 删除集点
    deleteScore(userID) {
        // todo 云函数，删除集点数
    },

    // 兑换咖啡
    checkPrize(userID){
        // todo 云函数，兑换点数
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})