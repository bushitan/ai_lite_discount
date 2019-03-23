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
        bgImage:"../../images/body1.jpg",
        qrImage:"../../images/qr.jpg",
        avatarList:[1,2],

        makeLandmark:{},
        temBG: [1, 2, 3, 1, 2, 3,],

        gid:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // console.log(action_user.login( GP.loginSuccess ))
        var gid = options.gid
        GP.onInit(gid)
        console.log(options)
    },

    onInit(gid){
        // if (gid == GP.data.gid){
        //     console.log("相同的")
        //     return 
        // }
        GP.setData({
            gid: gid
        })
    },

    // 点击模板背景图片
    clickBG(e){
        var src = e.currentTarget.dataset.src || 1
        console.log(src)
        GP.setData({
            bgImage:src
        })
    },

    // 合成图片
    clickMix(){
        GP.setData({
            makeLandmark: offsetLandmark
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})