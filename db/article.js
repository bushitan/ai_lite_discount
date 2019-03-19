


class article {
    constructor() {
        this.db = wx.cloud.database({
            env: 'sjtest-a25a0c'
        })
        this.query = this.db.collection('article')
    }
    //获取数据库对象
    getDB (){
        return this.db
    }

    getQuery(){
        return this.db.collection('article')
    }

    add(){

        
        this.query.add({
            // data 字段表示需新增的 JSON 数据
            data: {
                title: '第2个姿势',
                summary: "描述",
                cover: "cloud://sjtest-a25a0c.736a-sjtest-a25a0c/cover/example.png",
                content: "要点2",
            }
        })
            .then(res => {
                console.log(res)
            })
    }

    getID(){
        return new Promise((resolve, reject) =>{
            this.query.doc("XIyGo8DR1TiN7d1X").get().then(
                res => {
                    // res.data 包含该记录的数据
                    console.log(res.data)
                }
            )
        })
    }

    getList(){
        return new Promise((resolve, reject) => {
            this.query.get().then(
                res => {
                    resolve(res.data)
                    // console.log(res.data)
                }
            )
        })
    }
    
    uploadCover(path){
        wx.cloud.uploadFile({
            cloudPath: 'cover/example.png', // 上传至云端的路径
            filePath: path, // 小程序临时文件路径
            success: res => {
                // 返回文件 ID
                console.log(res.fileID)
            },
            fail: console.error
        })
    }

    downloadCover(file_id){
        wx.cloud.downloadFile({
            fileID: file_id, // 文件 ID
            success: res => {
                // 返回临时文件路径
                console.log(res.tempFilePath)
            },
            fail: console.error
        })
    }
}

module.exports = article