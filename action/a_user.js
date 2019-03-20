
var DB_User = require('../db/user.js')
var db_user = new DB_User()

class ActionUser {
    constructor() {
        // super({ model: "user" })
    }

    // 用户登录，不包含详细信息
    login( successFun ) {
        //微信登陆
        db_user.wxLogin().then(res => {
            var openid = res.openid
            var appid = res.appid
            var unionid = res.unionid
            var data = { openid: openid}
            //查询是否存在用户
            db_user.count(data).then(res => {
                var total = res.total
                if (total == 0) {   //插入                
                    var initInfo = {
                        "avatarUrl": '',
                        "city": '',
                        "country": '',
                        "gender": '',
                        "language": '',
                        "nickName": '',
                        "province": '',
                    }
                    //存在，插入信息
                    db_user.add(initInfo).then(res => {
                        res.openid = openid
                        res.appid = appid
                        res.unionid = unionid
                        successFun(res)
                    })
                }
            })
        })
    }

    getUserInfo(userID ,successFun){
        db_user.getSelf(userID).then(res =>{
            console.log(res)
            successFun(res.data)            
        })
    }


    // 更新用户详情
    updateUserInfo( userID, userInfo ) {
        db_user.update(userID, userInfo).then( res => 
            wx.showToast({
                title: '更新头像成功',
            })
        )
    }

}

module.exports = ActionUser