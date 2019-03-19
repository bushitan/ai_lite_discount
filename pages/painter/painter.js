// pages/resualt/resualt.js
var GP
var API = require('../../utils/api.js')
var xx = require('../../utils/ai_xx.js')

//原始的
var orgBodyRectangle = {}
var orgLandmark = {}

var offsetBodyRectangle = {}
var offsetLandmark = {}

var movePixle = 3 //移动像素

Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneImage:"../../images/info_unselect.png", 
        tagName:"",   

        tempImage:"",


        // AI识别结果
        // bg: "../../images/body.jpg",
        
        landmark: {},
        // touchKey:"",
        // move:{},
        
        // 选择器
        key: "head", //默认触摸点
        keyIndex:0,
        keyArray: [
            { name: "1--头部", key: "head" },
            { name: "2--脖子", key: "neck" },
            { name: "3.1--左肩", key: "left_shoulder" },
            { name: "3.2--左肘", key: "left_elbow" },
            { name: "3.3--左手", key: "left_hand" },
            { name: "4.1--右肩", key: "right_shoulder" },
            { name: "4.2--右肘", key: "right_elbow" },
            { name: "4.3--右手", key: "right_hand" },
            { name: "5.1--左臀", key: "left_buttocks" },
            { name: "5.2--左膝", key: "left_knee" },
            { name: "5.3--左脚", key: "left_foot" },
            { name: "6.1--右臀", key: "right_buttocks" },
            { name: "6.2--右膝", key: "right_knee" },
            { name: "6.3--右脚", key: "right_foot" },
        ],

        //颜色
        pointColor: "#6596ed",
        lineColor:"#6596ed",
        //获取图片
        makeLandmark:{},
    },


    onLoad: function (options) {
        GP = this
        // GP.onInit(GP.data.tempImage)

        GP.onInit()

    },

    onInit(){


        // wx.showToast({
        //     title: '识别中...',
        //     duration:500,
        // })
        GP.setData({
            //初始化
            tempImage: xx.initImage,
            // landmark: xx.initLandmark,
            // imageWidth:355,
            // imageHeight:355


            //绘图测试
            // makeLandmark: wx.getStorageSync("landmark"),
            // imageWidth:355,
            // imageHeight:355
        })

        GP.resolveImage(GP.offsetPoint)

        // GP.offsetPoint(
        //     wx.getStorageSync("body_rectangle"),
        //     wx.getStorageSync("landmark")
        // )


    },


    //转换点坐标
    offsetPoint(org_body_rectangle, org_landmark){

        var orgBodyRectangle = org_body_rectangle || xx.initBodyRectangle
        var orgLandmark = org_landmark || xx.initLandmark

        offsetBodyRectangle = {}
        offsetLandmark = {}

        offsetLandmark = xx.offset(orgBodyRectangle, orgLandmark, GP.data.ratio)//标杆数据
        GP.setData({
            landmark: offsetLandmark
        })      
    },

    //获取当前的关节数值
    touchCallback(e) {
        // var key = e.detail.key
        // var landmark = e.detail.landmark
        // offsetLandmark = landmark
        // GP.setData({
        //     keyIndex: xx.landmarkName.indexOf(key)||0, //默认为第一个'head'
        //     key: key,
        // })
    },
    // 主动选择
    pickKey(e) {
        var index = e.detail.value
        GP.setData({
            keyIndex: index, //设置pick的显示值
            key: GP.data.keyArray[index].key //设置当前要操作的key
        })
    },

    //移动
    moveTop() {
        offsetLandmark[GP.data.key].y = offsetLandmark[GP.data.key].y - movePixle
        GP.setData({ landmark: offsetLandmark })
    },
    moveLeft() {
        offsetLandmark[GP.data.key].x = offsetLandmark[GP.data.key].x - movePixle
        GP.setData({ landmark: offsetLandmark })
    },
    moveRight() {
        offsetLandmark[GP.data.key].x = offsetLandmark[GP.data.key].x + movePixle
        GP.setData({ landmark: offsetLandmark })
    },
    moveBottom() {
        offsetLandmark[GP.data.key].y = offsetLandmark[GP.data.key].y + movePixle
        GP.setData({ landmark: offsetLandmark })
    },





    // 更换图片
    clickChoice() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths[0]
                GP.setData({
                    tempImage: tempFilePaths
                })
                wx.showLoading({
                    title: '识别中...',
                })
                GP.resolveImage(GP.uploadBodyAI)
                
            },

            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                console.log(res)

            },
        })
    },

    //初始化屏幕
    resolveImage( callback ) {
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                GP.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,

                })
                wx.getImageInfo({
                    src: GP.data.tempImage,
                    success(res) {
                        var _width = GP.data.windowWidth - 20
                        var _ratio = _width / res.width
                        GP.setData({
                            imageWidth: _width,
                            imageHeight: _width * res.height / res.width,
                            ratio: _ratio,
                        })
                        if (callback)
                            callback()
                    }
                })
            }
        })
    },

    uploadBodyAI() {
        wx.uploadFile({
            // url: 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface',
            url: 'https://api-cn.faceplusplus.com/humanbodypp/v1/skeleton', //人体姿势链接
            filePath: GP.data.tempImage,
            name: 'image_file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                // 'user': 'test'
                api_key: "y-IDakOn3S3kW0vPX2kzg8sLrZtNLyb5",
                api_secret: "dSNBrCEpLcEA0gemfPHetg8G26UEIBkh",
            },
            success(res) {
                // const data = res.data
                // console.log(data)
                var data = JSON.parse(res.data)
                if (data.hasOwnProperty('skeletons')) {


                    wx.setStorageSync("body_rectangle", data.skeletons[0].body_rectangle),
                        wx.setStorageSync("landmark", data.skeletons[0].landmark)

                    if (data.skeletons.length == 0) {
                        wx.showModal({
                            title: '没有检测到姿势',
                            content: '上传的图片没有任何姿势',
                        })
                        return
                    }
                    console.log("in skeletons")
                    GP.offsetPoint(
                        data.skeletons[0].body_rectangle,
                        data.skeletons[0].landmark
                    )
                    wx.showToast({
                        title: '姿势检测成功',
                    })
                }
                else {
                    wx.showModal({
                        title: '网络错误',
                        content: '网络连接失败，请重新上传',
                    })
                }
            },
            complete(){
                wx.hideLoading()
            },
        })
    },

    //图片导出
    clickDown() {
        GP.setData({
            makeLandmark: offsetLandmark
        })
    },


    clip(){
        wx.setClipboardData({
            data:"bushitan",
            success:function(){
                wx.showModal({
                    title: '已经复制管理员微信号:bushitan',
                    showCancel:false,
                    // content: '已经',
                })
            }
        })
    },













    // // 输入颜色
    // inputPointColor(e) {
    //     var value = e.detail.value
    //     value = value.substring(0, 6)
    //     // var color = ("#" + value).substring(1, 7)
    //     GP.setData({ pointColor: "#" + value })
    // }, 
    // inputLineColor(e) {
    //     var value = e.detail.value
    //     value = value.substring(0, 6)
    //     GP.setData({ lineColor: "#" + value })
    // }, 



    // save(){
    //     wx.showModal({
    //         title: '保存失败',
    //         content: '这功能还没开发完啦',
    //     })
    // },


    // toAI(){
    //     wx.navigateBack({ })
    // },
    // getBase64getBase64(e){
    //     console.log(e.detail)
    //     // GP.bodyAI(e.detail)
    // },

    // currentIndex(e){
    //     var index = e.detail
    //     GP.setData({
    //         keyIndex: index,
    //         touchKey: GP.data.keyArray[index].value,
    //     })
    // },

    // currentKey(e){
    //     var key = e.detail
    //     GP.setData({
    //         touchKey:key
    //     })
    // },

    //移动
    // moveTop() {
    //     var _move = { key: GP.data.touchKey, x: 0, y: -1, }
    //     GP.setData({ move: _move })
    // },
    // moveLeft() {
    //     var _move = { key: GP.data.touchKey, x: -1, y:0 }
    //     GP.setData({ move: _move })
    // },
    // moveRight() {
    //     var _move = { key: GP.data.touchKey, x: 1, y: 0}
    //     GP.setData({ move: _move })
    // },
    // moveBottom() {
    //     var _move = { key: GP.data.touchKey, x: 0, y: 1, }
    //     GP.setData({ move: _move })
    // },





    // bodyAI() {
    //     console.log("in face AI")
    //     wx.request({
    //         // url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
    //         url: "https://api-cn.faceplusplus.com/humanbodypp/v1/skeleton",
    //         method: "POST",
    //         header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         data: {
    //             api_key: "y-IDakOn3S3kW0vPX2kzg8sLrZtNLyb5",
    //             api_secret: "dSNBrCEpLcEA0gemfPHetg8G26UEIBkh",

    //             image_url:"https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg",   
    //             // return_attributes: 'emotion',
    //         },
    //         success: (res) => {
    //             console.log(res)

    //             if (res.data.hasOwnProperty('skeletons')){
    //                 console.log("in skeletons")
    //                 GP.offsetPoint(
    //                     res.data.skeletons[0].body_rectangle,
    //                     res.data.skeletons[0].landmark
    //                 )
    //             }
    //             else{
    //                 wx.showModal({
    //                     title: '姿势检测失败',
    //                     content: '无法检测姿势，请重新上传',
    //                 })
    //             }
    //         },
    //         fail: (res) => {
    //             console.log(res)
    //         },
    //         complete: (res) => {
    //             wx.hideLoading()

    //         },
    //     })
    // },

    onShareAppMessage(){},
})