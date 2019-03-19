
class base {
    constructor(options) {
        console.log("base" , options)
        this.db = wx.cloud.database()
        if (options)
            Error("未填入指定表")
        this.query = this.db.collection(options.model)
        // this.query = this.db.collection('article')
    }

    // 增加
    add() {
        return this.query.add({
            // data 字段表示需新增的 JSON 数据
            data: {
                title: '12',
                summary: "描述",
                cover: "cloud://sjtest-a25a0c.736a-sjtest-a25a0c/cover/example.png",
                content: "要点2",
            }
        })
    }


}


module.exports = base