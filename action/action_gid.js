


class ActionGID {
    constructor(GP) {
        this.GP = GP
    }
    
    getOpenGID(shareTicket) {
        var that = this
        return new Promise((resovle, reject) => {
            that.getShareInfo(shareTicket).then(p1 =>{
                that.login(p1).then(p2 => {
                    that.getCloudOpenGID(p2).then( res =>{
                        resovle(res.result.openGId)
                    })
                })
            })
        })
    }


    getShareInfo(shareTicket){
        return new Promise( (resovle,reject)=>{
            wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (res) {
                    var params = {}
                    params["iv"] = res.iv
                    params["encryptedData"] = res.encryptedData
                    resovle(params)
                }
            })
        })
    }

    // 获取jscode
    login(params){
        return new Promise((resovle, reject) => {
            wx.login({
                success: function (res) {
                    params["js_code"] = res.code
                    resovle(params)
                }
            })
        })
    }

    getCloudOpenGID(params){
        return wx.cloud.callFunction({
            name: 'opengid',
            data: {
                js_code: params.js_code,
                encryptedData: params.encryptedData,
                iv: params.iv
            },
        })
    }

}
module.exports = ActionGID

// success: function (res) {
//     console.log('打印opengid' + res.result.openGId);
//     console.log('res' + JSON.stringify(res));
//     // that.globalData.openGid = res.result.openGId
//     // wx.setStorageSync(openGID, res.result.openGId)

//     // wx.setClipboardData({
//     //     data: res.result.openGId,
//     //     success(res) {
//     //         wx.getClipboardData({
//     //             success(res) {
//     //                 console.log(res.data) // data
//     //             }
//     //         })
//     //     }
//     // })

//     console.log('getShareTiket---openGid' + that.globalData.openGid)
//     typeof cb == "function" && cb(that.globalData)
// },
// fail: function (err) {
//     console.log('getShareTiket---err' + JSON.stringify(err))
// }