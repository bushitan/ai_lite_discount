
var DB_User = require('../db/user.js')
var db_user = new DB_User()
var DB_Score = require('../db/score.js')
var db_score = new DB_Score()

var Utils = require('../utils/util.js')

class ActionScore {
    constructor() {
        // super({ model: "user" })
    }

    // 增加集点
    /**
     * 用户id，
     * 销售员id
     * type 模式，普通模式、分享模式
     */
    checkScore(userID, sellID, scanMode){

        // var data = {
        //     type: 1,//1积分,2奖品
        //     userID: userID,
        //     sellID: sellID,
        //     isUsed: 0,//0 未使用，1已使用
        //     createTime: Utils.formatTime(new Date()),
        //     checkTime: Utils.formatTime(new Date()), //核销时间
        // }.
        var data = {
            userID: userID,
            sellID: sellID,
            scanMode: scanMode,
        }
        return db_score.addScore(data)
    }

    // 查询 分数、奖品
    getScorePrize(userID) {
        var data = {
            userID: userID, // 用户id
        }
        return db_score.getScorePrize(data)
    }


    exchangePrize(userID, sellID){
        var data = {
            userID: userID, // 用户id
            sellID: sellID
        }
        return db_score.exchangePrize(data)
    }

    // // 查询积分
    // getScore(userID){
    //     var data = {
    //         userID: userID, // 用户id
    //         isUsed:0, //未使用
    //     }
    //     return db_score.getList(data)
    // }



}

module.exports = ActionScore
