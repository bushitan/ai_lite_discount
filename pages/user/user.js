// pages/user/user.js
// "navigationStyle": "custom",
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

        MAX:10,
        // score: [0, 1, 2, 3, 4, 5, 6, 7, 8,9],
        scoreList:"",
        prizeList: [],
        shareList: [],
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
            shareTime:"",
            shareUserNum: 1,//
            shareUserUnit: 1,//
        },
        user:{},

        // 菜单
        menu:[
            {title:"兑换记录",summary:"",page:""},
        ],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getUserInfoSuccess()
        // GP.getShareCard()
    },
    // getShareCard(){
    //     action_score
    // },


    //获取用户头像
    getUserInfoSuccess(){
        var userID = wx.getStorageSync(API.USER_ID)
        action_user.getUserInfo(userID, GP.getUserInfoSuccess).then(res=>{
            var userInfo = res.data
            GP.setData({
                logged: true,
                avatarUrl: userInfo.avatarUrl || '../../images/user-unlogin.png',
                userInfo: userInfo
            })
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

        GP.checkGetShare() // 检测自己是否获得优惠券
        GP.getScorePrize() // 查询积分、奖品


        wx.cloud.callFunction({
            name: 'score',
            data: {
                $url: 'getDetail',
                // name: 'tcb',
                // password: '09876'
            }
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        });
    },
    
    // 检测自己是否获得优惠券
    checkGetShare(){
        var scoreID = wx.getStorageSync(API.SHARE_SCORE_ID)
        console.log("scoreID:", scoreID)
        if(scoreID){
            action_score.checkShare(wx.getStorageSync(API.USER_ID) ,scoreID).then(res=>{
                if(res.status == true){
                    wx.showModal({
                        title: '领取分享点成功',
                        content: '获得朋友分享的1点积分',
                    })
                    GP.getScorePrize() 
                }
                console.log('share success',res)
            }).catch(res => {
                console.log('share error',res)
            })
        }
    },

    // 查询点数和已经兑换的咖啡数
    getScorePrize(){
        action_score.getScorePrize(wx.getStorageSync(API.USER_ID)).then(res => {
            console.log(res)
            if (GP.data.scoreList != "") 
                if (res.score.data.length  > GP.data.scoreList.length ) {
                    wx.showModal({
                        title: '积分+1',
                        showCancel:false,
                    })
                }
            GP.setData({
                scoreList: res.score.data,
                prizeList: res.prize.data,
                shareList:res.share.data
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


    // 去到兑换记录页面
    toExchange(){
        wx.navigateTo({
            url: '/pages/exchange/exchange',
        })
    },
    // 去到分享页面
    toShare(){
        wx.navigateTo({
            url: '/pages/share/share',
        })
    },
    // 去到定位页面
    toAddress(){
        wx.getLocation({
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                wx.openLocation({
                    name:"察也手作&乐知咖啡",
                    address:"南宁市青秀区民族大道155号荣和山水美地六组团21号楼A座602室",
                    latitude: 22.81534,
                    longitude: 108.4026,
                    scale: 18
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        var scoreID = e.target.dataset.score_id
        var path = e.target.dataset.path
        console.log(path)
        return {
            path: path
        }
    }
})