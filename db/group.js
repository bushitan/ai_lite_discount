
var base = require('base.js')

class Group extends base {
    constructor() {
        super({ model: "group" })
    }

    check(){

    }
    add(data) {
        return this.query.add({ data: data})
    }

    getSelf(user_id) {
        return this.query.doc(user_id).get()
        // return this.query.doc(user_id).get()

        // return this.query.where({
        //     _openid: 'o7eD40K05ZC2aDSs3Abw28hKW6JM' // 填入当前用户 openid
        // }).get()
           
    }
    
    // 微信登陆
    wxLogin() {
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    console.log('[云函数] [login] user openid: ', res.result.openid)
                    console.log('[云函数] [login] user appid: ', res.result.appid)
                    console.log('[云函数] [login] user unionid: ', res.result.unionid)
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

module.exports = Group