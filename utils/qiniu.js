

var API = require('api.js');

var APP = getApp()
var IMAGE = 0, AUDIO = 1,VIDEO = 2
/**
 * 获取token
 */
function UploadFile(tag_id, tempFilePaths, uploadSuccess, uploadFail){
   
    API.Request({
        "url": API.PPT_SELF_UPLOAD_TOKEN,
        "data":{
            "tag_id": tag_id,
            "suffix": tempFilePaths.split(".").pop(),
        },
        "success":function(res){
            var data = res.data
            console.log(data)
            UpStream(data.key, data.token, tempFilePaths, uploadSuccess, uploadFail)
        },
        "fail":function(res){
        },
        complete: function (res) {
            // GP.setData({ isUpload: false })
        },
    })


}

/**上传流 */
function UpStream(key, token, tempFilePaths, uploadSuccess, uploadFail){
    wx.uploadFile({
        url: 'https://up.qbox.me',
        filePath: tempFilePaths,//小视频
        name: 'file',
        formData: {
            'key': key,
            'token': token,
        },
        success: function (res) {
            if (uploadSuccess)
                uploadSuccess(res)
        },
        fail(error) {
            if (uploadFail)
                uploadFail(error)
        },
    })
}




/**
 * 上传图片
 */
function UploadImage(GP) {
    wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function (res) {
            console.log(res.tempFilePaths[0] )
            var path = res.tempFilePaths[0]

            var data = {
                "style": IMAGE,
                "suffix": path.split(".").pop()
            }
            
            UploadFile(GP, data, path )
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

/**
 * 上传音频
 */
function UploadAudio(GP, path) {
    console.log(path)
    // UploadFile(GP, tempFilePath)
    var data = {
        "style": AUDIO,
        "suffix": path.split(".").pop()
    }

    UploadFile(GP, data, path)
}


/**
 * 上传视频
 */
function UploadVideo(GP) {

    wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: function (res) {
            var path = res.tempFilePath
            var data = {
                "style": VIDEO,
                "suffix": path.split(".").pop()
            }
            UploadFile(GP, data, path)
        },
        fail: function (res) {
            console.log(res)
        }
    })
}



module.exports = {
    UploadFile: UploadFile,
    UploadImage: UploadImage,
    UploadAudio: UploadAudio,
    UploadVideo: UploadVideo,
    UpStream:UpStream,
}





