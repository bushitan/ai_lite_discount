// pages/pdf/pdf.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[1,2,3,4,5,6],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var GP = this
        wx.downloadFile({
            url: "http://img.12xiong.top/1.docx",
            success: function (res) {
                console.log(res)
                var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
                GP.setData({
                    Path:Path
                })
            },
            fail: function (res) {
                console.log('下载失败', res)
            },
        })         
    },


    click(){
        wx.openDocument({
            filePath: GP.data.Path,
            success: function (res) {
                console.log('打开文档成功')
            },
            fail: function (res) {
                console.log('打开文档失败', res)
            },
        })
    },

    clickPDF() {
        wx.downloadFile({
            url: "http://img.12xiong.top/1.pdf",
            success: function (res) {
                console.log(res)
                var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
                wx.openDocument({
                    filePath: Path,
                    success: function (res) {
                        console.log('打开文档成功')
                    },
                    fail: function (res) {
                        console.log('打开文档失败', res)
                    },
                })
            },
            fail: function (res) {
                console.log('下载失败', res)
            },
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