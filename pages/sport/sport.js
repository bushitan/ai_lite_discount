// pages/sport/sport.js

var News = require('../../db/news.js')
var db_news = new News()
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:"../../images/example/1_ske.jpg",
        node:"    要点：    <p>1、双脚后跟紧挨着，双脚成90度角，这样站立，能让脊柱充分正直；</p>    <p>2、身体正直站立，头顶向上顶，让脖子伸直，下巴与地面保持垂直，不要向前噘，这样让颈椎正直；</p>    <p>3、双手握拳放在身体两侧，自然下垂双臂；</p>    <p>4、闭口，轻咬牙关（很重要），舌尖抵上牙堂门牙位置，这叫“舌抵上腭”；</p>    <p>5、眼睛可以微闭，或者目视斜下方地面，总之，不要东瞧西望；</p>",

        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getArticle()
    },

    getArticle(){
        db_news.getList().then(res => {
            console.log(res)
            GP.setData({
                list:res.data
            })
        })
    },

    preview(e){
        var url = e.currentTarget.dataset.url
        wx.previewImage({
            urls: [url],
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})