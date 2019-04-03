// pages/brush/brush.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        grids: [
            // "../../images/menu_laugth.png",
            "../../images/send.png",
            // "../../images/menu_share.png",
        ],
        tempImage:"../../images/brush_bg.jpg",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    download(){
        wx.previewImage({
            urls: ["cloud://dtest-053ee4.6474-dtest-053ee4/brush2.jpg"],
        })
    },
    //
    choosePhoto(){
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
                // wx.showLoading({
                //     title: '识别中...',
                // })
                // GP.resolveImage(GP.uploadBodyAI)

            },

            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                console.log(res)

            },
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})