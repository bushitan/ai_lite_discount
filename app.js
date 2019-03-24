//app.js

const utils = require('./utils/util.js')
var API = require('./utils/api.js')

var ActionGID = require('./action/action_gid.js')
var actionGID = new ActionGID()
App({
    onLaunch: function (options) {
        wx.cloud.init({
            // env: 'drelease',
            env:'dtest-053ee4'
        })

        wx.showShareMenu({
            withShareTicket: true,
        })
    },

    onShow(options){
        console.log()
        var that = this
        if (options.scene == 1044) {
            actionGID.getOpenGID(options.shareTicket).then( gid =>{
                that.globalData.openGID = gid

                // 当前有栏目
                if (getCurrentPages.length > 0){
                    var currentPage = getCurrentPages()[0]
                    //当前 g_my 页面，跳转到详情页
                    console.log(currentPage)
                    if (currentPage.route == "pages/g_my/g_my") {
                        currentPage.toGroup(gid)
                    }
                }
            })
        }
    },


    globalData: {
        // openGID: "",
        openGID: "G7eD40I5ZAutn1z65TG7kgiCj9nI",
    }



})