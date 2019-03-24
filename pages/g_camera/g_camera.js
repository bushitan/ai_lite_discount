// pages/user/user.js
var GP

var DB_User = require('../../db/user.js')
var db_user = new DB_User()


var API = require('../../utils/api.js')
var ActionUser = require('../../action/a_user.js')
var actionUser = new ActionUser()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        bgImage:"../../images/body1.jpg",
        qrImage:"../../images/qr.jpg",
        // avatarList:[1,2],
        userList:[],

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

        // wx.downloadFile({
        //         url:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLC5Ka1eZwPm0FpXA6L9EevSzZ3G9r0XsjN8hH3E34R80lmBssGrwQHMibvOzKRHiaDb1PmjlmGVCIA/132',
        //     success:function(res){
        //         console.log(res)
        //         wx.previewImage({
        //             urls: [res.tempFilePath],
        //         })
        //     }
        // })
        const ctx = wx.createCanvasContext('myCanvas')

        wx.downloadFile({
            url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLC5Ka1eZwPm0FpXA6L9EevSzZ3G9r0XsjN8hH3E34R80lmBssGrwQHMibvOzKRHiaDb1PmjlmGVCIA/132',
            success(res) {
                ctx.save()
                ctx.beginPath()
                ctx.arc(50, 50, 25, 0, 2 * Math.PI)
                ctx.clip()
                ctx.drawImage(res.tempFilePath, 25,25,50,50)
                ctx.restore()
                ctx.draw()
            }
        })

    },

    onInit(gid){
        // if (gid == GP.data.gid){
        //     console.log("相同的")
        //     return 
        // }
        GP.setData({
            gid: gid
        })
        actionUser.getGroup(gid).then( res =>{
            console.log("success:",res.result.data)
            GP.setData({ userList: res.result.data})
        }).catch(res =>{
            console.log("error:",res)
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