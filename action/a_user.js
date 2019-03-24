
var DB_User = require('../db/user.js')
var db_user = new DB_User()

var DB_Group = require('../db/group.js')
var db_group = new DB_Group()

var DB_Rel = require('../db/rel_group_user.js')
var db_rel = new DB_Rel()

class ActionUser {
    constructor() {
        // super({ model: "user" })
    }

    // 用户登录，不包含详细信息
    login(successFun) {
        return db_user.wxLogin()
    }

    // 获取用户头像
    getUserInfo(userID ,successFun){
        return db_user.getSelf(userID)
        // .then(res =>{
        //     console.log(res)
        //     successFun(res.data)            
        // })
    }


    // 更新用户详情
    updateUserInfo(userID, userInfo ) {
        return db_user.update(userID, userInfo).then( res => 
            wx.showToast({
                title: '更新头像成功',
            })
        )
    }

    // 获取群组列表
    getGroupList(openid) {
        return wx.cloud.callFunction({
            name: 'group_list',
            data: {
                openid: openid,
            },
        })
    } 
    // 获取群内容
    getGroup(gid) {
        return wx.cloud.callFunction({
            name: 'group',
            data: {
                gid: gid,
            },
        })
    }

    // 增加群
    addGroup(gid,userID) {   
        var groupData = {
            "gid": gid,
        }     
        db_group.count(groupData).then(res => {
            var total = res.total
            if (total == 0) {   //插入                
                //存在，插入信息
                db_group.add(groupData).then(res => {
                    console.log(res)
                })

            }
        })
    }

    //增加群和用户的关系
    addRelGroupUser(gid, userID) {
        var groupData = {
            "gid": gid,
        }
        db_rel.count(groupData).then(res => {
            var total = res.total
            if (total == 0) {   //插入                
                //存在，插入信息
                db_rel.add(groupData).then(res => {
                    console.log(res)
                })

            }
        })
    }

}

module.exports = ActionUser





        // //微信登陆
        // db_user.wxLogin().then(res => {
        //     var openid = res.openid
        //     var appid = res.appid
        //     var unionid = res.unionid
        //     var data = { _openid: openid}
        //     //查询是否存在用户
        //     db_user.count(data).then(res => {
        //         var total = res.total
        //         if (total == 0) {   //插入                
        //             var initInfo = {
        //                 "avatarUrl": '',
        //                 "city": '',
        //                 "country": '',
        //                 "gender": '',
        //                 "language": '',
        //                 "nickName": '',
        //                 "province": '',
        //             }
        //             //存在，插入信息
        //             db_user.add(initInfo).then(res => {
        //                 res.openid = openid
        //                 res.appid = appid
        //                 res.unionid = unionid
        //                 successFun(res)
        //             })
        //         }
        //         else{

        //             successFun(res)
        //         }

        //     })
        // })