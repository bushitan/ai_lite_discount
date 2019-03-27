
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
    checkScore(userID, sellID){

        var data = {
            type: 1,//1积分,2奖品
            userID: userID,
            sellID: sellID,
            isUsed: 0,//0 未使用，1已使用
            createTime: Utils.formatTime(new Date()),
            checkTime: Utils.formatTime(new Date()), //核销时间
        }
        return db_score.add(data)
    }

    getScore(userID){
        var data = {
            userID: userID, // 用户id
            isUsed:0, //未使用
        }
        return db_score.getList(data)
    }
}

module.exports = ActionScore
