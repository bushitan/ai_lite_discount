
var base = require('base.js')

class news extends base {
    constructor() {
        super({ model: "user" })
    }

    add(userinfo) {
        var data = {
            title: '第3个姿势'
        }
        return this.query.add({ data: userinfo})
    }

    getSelf() {
        // return this.query.doc("XJDVe8DR1TiN_5Se").get()
        return this.query.where({
            _openid: "o7eD40K05ZC2aDSs3Abw28hKW6JM"
        }).get()

        // return this.query.where({
        //     _openid: 'o7eD40K05ZC2aDSs3Abw28hKW6JM' // 填入当前用户 openid
        // }).get()
           
    }
}

module.exports = news