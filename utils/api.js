


var APP_ID = "wxeb9623bdc85a64f4"
// var host_url = 'https://xcx.308308.com/huaxun_2/api/';
// var API_308_URL = 'https://api.308308.com/';
var XCX_308_URL = 'http://127.0.0.1:8000/live/';
// var XCX_308_URL = 'http://192.168.199.203:8000/live/';
// var XCX_308_URL = 'https://www.12xiong.top/live/';
var KEY_OPENID = "openid"
var KEY_SESSION = "session"
var KEY_TOKEN = "token"
var KEY_INDUSTRYID = "industryid"
var KEY_USER = "user"
var KEY_USER_DICT = "user_dict"
var request = new Request()
request.init(XCX_308_URL + 'lite/login/', APP_ID)
 
module.exports = {
    Request: request.Request,
    LITE_REGISTER: XCX_308_URL + 'lite/register/',

    COVER_GET_TAG_LIST: XCX_308_URL + 'cover/tag/get_list/',
    COVER_GET_COVER_LIST: XCX_308_URL + 'cover/news/get_list/',
    COVER_GET_ARTICLE: XCX_308_URL + 'cover/article/get/',

    SPEAK_GET_THEME_LIST: XCX_308_URL + 'speak/get/theme_list/',
    SPEAK_GET_THEME: XCX_308_URL + 'speak/get/theme/',
    SPEAK_GET_TOKEN: XCX_308_URL + 'speak/get/token/',
    SPEAK_ADD_VOICE: XCX_308_URL + 'speak/add/voice/',
    SPEAK_DELETE_VOICE: XCX_308_URL + 'speak/delete/voice/',

    BONUS_SHARE: XCX_308_URL + 'speak/bonus/share/',


    KEY_SESSION: KEY_SESSION,
    KEY_USER_INFO: "user_info",
    KEY_SELF_CARD: "self_card",
    KEY_SELF_SCORE: "self_score",
    KEY_SELF_TALK: "self_talk",
    KEY_TEMP_IMAGE_PATH: "temp_image_path",
    KEY_CURRENT_AREA: "currentArea",
}







function Request() {
    var self = this
    var loginUrl = null
    var APP_ID = null
    this.init = function (_loginUrl, _APP_ID) {

        loginUrl = _loginUrl
        APP_ID = _APP_ID
    }


    var APP
    var GlobalData
    var API_TIME = 5000               //检查进程时间间隔
    var API_LOGIN_NONE = 0       //未登录
    var API_LOGIN_ING = 1           //登陆中
    var API_LOGIN_SUCCESS = 2   //已登录
    var API_LIVE = 3
    //重连次数
    this.Request = function (options) {
        Init() //请求初始化
        InitRequest(options)
    }

    // 初始化
    function Init() {
        APP = getApp()
        // console.log(APP)
        GlobalData = APP.globalData
        //初始化 全局变量
        if (GlobalData.apiIsLogin == undefined) {
            GlobalData.apiIsLogin = 0 //是否经登陆
            GlobalData.apiPreList = [] //未登录前的请求队列 
            GlobalData.apiFailList = [] //请求失败的队列
            GlobalData.apiThread = false
        }

        if (GlobalData.apiThread == false) {
            setInterval(
                function () {
                    var opt = GlobalData.apiFailList.pop()
                    // console.log(opt)
                    if (opt != undefined) {
                        opt['live']--
                        _Request(opt)
                    }
                }, API_TIME)
            GlobalData.apiThread = true
        }
    }

    function InitRequest(options) {

        options['live'] = API_LIVE //请求重连生命周期
        if (GlobalData.apiIsLogin == API_LOGIN_NONE) {     //未登录
            GlobalData.apiPreList.push(options)
            _RequestLogin()
            GlobalData.apiIsLogin = API_LOGIN_ING
        }
        else if (GlobalData.apiIsLogin == API_LOGIN_ING) {  //登陆中
            GlobalData.apiPreList.push(options)
        }
        else {                                                                             //登陆成功
            _Request(options)
        }
    }

    function _RequestLogin() {
        wx.login({
            success: function (res) {
                var _session = wx.getStorageSync(KEY_SESSION)
                _Request({
                    'live': API_LIVE,
                    'url': loginUrl,
                    'data': {
                        js_code: res.code,
                        session: _session,
                    },
                    'success': function (res) {
                        var object = res.data
                        // wx.setStorageSync(KEY_OPENID, res.data.openid)
                        // wx.setStorageSync(KEY_SESSION, res.data.session)
                        // wx.setStorageSync(KEY_TOKEN, res.data.token)
                        wx.setStorageSync(KEY_USER_DICT, res.data.dict_user)

                        GlobalData.apiIsLogin = API_LOGIN_SUCCESS //登陆成功
                        // 执行login == false时的请求
                        for (var i in GlobalData.apiPreList) {
                            _Request(GlobalData.apiPreList[i])
                        }
                        GlobalData.apiPreList = []
                    },
                })
            },
            fail: function (res) {
                console.log("fail", res)
            },
        });
    }

    // 普通登陆
    function _Request(options) {
        // console.log(options)

        var data = options.data
        if (data == undefined)
            data = {}
        //session 不存在，设置为false
        var _session = wx.getStorageSync(KEY_USER_DICT)["session"]
        if (!_session) //检查session,不存在，为false
            _session = "false"
        data['session'] = _session  //每个请求都加session
        data['app_id'] = APP_ID  //每个请求都加session
        wx.request
            ({
                url: options.url,
                method: options.method || "GET",
                header: options.header || {'content-type': 'application/json'},
                data: data,
                success: function (res) {
                    if (options.success != undefined)
                        options.success(res)
                },
                fail: function (res) {
                    if (options.fail != undefined)
                        options.fail(res)
                    if (options['live'] > 0)
                        GlobalData.apiFailList.push(options) //将请求加入失败队列
                },
                complete: function (res) {
                    if (options.complete != undefined)
                        options.complete(res)
                },
            })
    }

}