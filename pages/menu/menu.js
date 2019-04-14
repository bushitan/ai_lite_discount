// pages/menu/menu.js
var API = require('../../utils/api.js')
var ActionScore = require('../../action/action_score.js')
var action_score = new ActionScore()
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu:{}, //菜单内容
        menuList:[], //菜单列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this 
        GP.getMenu()
    },
    getMenu(){
        var db = wx.cloud.database()
        db.collection("menu").doc('4').get()
        .then(res =>{
            console.log(res.data[0])
            GP.setData({
                menu: res.data
            })

            db.collection("menu").doc(res.data.listMode).get().then( res =>{
                GP.setData({
                    menuList: res.data.list
                })
            })

        })
        
        // return this.query.doc(user_id).get()
    },
    toUser(){
        wx.navigateTo({ url: '/pages/user/user', })
    },
    toSeller() {
        wx.navigateTo({ url: '/pages/seller/seller', })
    },
    // 去到定位页面
    toAddress() {
        console.log(123)
        wx.openLocation({
            name: "2013coffee",
            address: "新竹路南一里4号(区图书馆旁边的巷子，地铁民族广场站D出口左转巷子)",
            latitude: 22.8150871051,
            longitude: 108.3377963305,
            scale: 18,
        })
    },

    onShow(){
        GP.checkGetShare() // 检测自己是否获得优惠券
    },

    // 检测自己是否获得优惠券
    checkGetShare() {
        var scoreID = wx.getStorageSync(API.SHARE_SCORE_ID)
        console.log("scoreID:", scoreID)
        if (scoreID) {
            action_score.checkShare(wx.getStorageSync(API.USER_ID), scoreID).then(res => {
                if (res.status == true) {
                    wx.showModal({
                        title: '领取分享点成功',
                        content: '获得朋友分享的1点积分',
                        confirmText:"查看",
                        success(res){
                            if(res.confirm)
                                GP.toUser()
                        },
                    })
                    // GP.getScorePrize()
                }
                console.log('share success', res)
            }).catch(res => {
                console.log('share error', res)
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})