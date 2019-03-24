
var base = require('base.js')

class news extends base {
    constructor() {
        super({ model: "user" })
    }

    check(){

    }
    add(userinfo) {
        // var data = {
        //     title: '第3个姿势'
        // }
        return this.query.add({ data: userinfo})
    }

    getSelf(user_id) {
        return this.query.doc(user_id).get()
        // return this.query.doc(user_id).get()

        // return this.query.where({
        //     _openid: 'o7eD40K05ZC2aDSs3Abw28hKW6JM' // 填入当前用户 openid
        // }).get()
           
    }

    // 更新用户信息
    update(userID,data) {
        // return this.query.where({ 
        //     openid: openID
        // })
        // .update({
        //     data:data
        // })
        return this.db.collection('user').doc(userID).update({
            data: data
        })
        // .where({
        //     _openid: openID
        // })
            
        // return this.db.collection('user').where({
        //     _openid: openID
        // })
        //     .update({
        //         data: data
        //     })
    }

    // 微信登陆
    wxLogin() {
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    // console.log('[云函数] [login] user openid: ', res.result.openid)
                    // console.log('[云函数] [login] user appid: ', res.result.appid)
                    // console.log('[云函数] [login] user unionid: ', res.result.unionid)
                    resolve(res.result)
                },
                fail: err => {
                    console.error('[云函数] [login] 调用失败', err)
                    reject(err)
                }
            })
        })

    }
}

module.exports = news