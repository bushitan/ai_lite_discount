
var base = require('base.js')
// import regeneratorRuntime from 'runtime.js'
// import regeneratorRuntime from '../regenerator-runtime/runtime.js';
// const regeneratorRuntime = require('runtime.js')

class news extends base {
    constructor() {
        super({ model: "score" })
    }

    check(){

    }
    addScore(data) {
        // return this.query.add({ data: data})
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'check_score',
                data: data,
                success: res => {
                    resolve(res.result)
                },
                fail: err => {
                    console.error('[云函数] [check_score] 调用失败', err)
                    reject(err)
                }
            })
        })
    }
    // 获取列表
    getList(data) {
        // var data = {
        //     title: '第3个姿势'
        // }
        // return this.query.where({ data: data }).get()
        return this.db.collection('score').where({
            isUsed: 0 // 填入当前用户 openid
        }).get()
    }

    // 查询积分和兑换杯数
    getScorePrize(data){
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'my_score_prize',
                data: data,
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

    // 兑换礼物
    exchangePrize(data) {
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'exchange_prize',
                data: data,
                success: res => {
                    resolve(res.result)
                },
                fail: err => {
                    console.error('[云函数] [login] 调用失败', err)
                    reject(err)
                }
            })
        })
    }

    //校验分享券ID 
    checkShare(data){
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'check_share',
                data: data,
                success: res => {
                    resolve(res.result)
                },
                fail: err => {
                    console.error('[云函数] [check_share] 调用失败', err)
                    reject(err)
                }
            })
        })
    }


    // 获取核销记录
    getCheckTrace(data){
        return this.db.collection('score').where(data).get()
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


    /**
     * 
     */

    //校验分享券ID 
    getAPI(opt) {
        return new Promise((resolve, reject) => {
            console.log(opt)
            wx.cloud.callFunction({
                name: opt.name,
                data: opt.data,
                success: res => {
                    resolve(res.result)
                },
                fail: err => {
                    console.error('[云函数] [check_share] 调用失败', err)
                    reject(err)
                }
            })
        })
    }

}

module.exports = news