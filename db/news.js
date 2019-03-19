
var base = require('base.js')

class news extends base{
    constructor() {
        super({model: "article"})
    }

    createSelf(){
        var data =  {
            title: '第3个姿势',
            summary: "描述",
            cover: "cloud://sjtest-a25a0c.736a-sjtest-a25a0c/cover/example.png",
            content: "要点321",
        }
        return this.query.add(data)
        // this.add(data).then(res => {
        //     console.log(res)
        // })
    }

    getList(){
        return this.query.get()
    }
}

module.exports = news