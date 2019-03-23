
var base = require('base.js')

class news extends base {
    constructor() {
        super({ model: "rel_group_user" })
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
}

module.exports = news