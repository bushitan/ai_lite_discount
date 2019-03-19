//app.js

const utils = require('./utils/util.js')
var API = require('./utils/api.js')


App({
    onLaunch: function () {
        wx.cloud.init({
            // env: 'drelease',
            env:'dtest-053ee4'
        })


        // var News = require('db/news.js')
        // var db_news = new News()
        // this.globalData.dbNews = db_news
        // db_news.getSelf()


    },
    // 权限询问
    getRecordAuth: function() {
        wx.getSetting({
        success(res) {
            console.log("succ")
            console.log(res)
            if (!res.authSetting['scope.record']) {
            wx.authorize({
                scope: 'scope.record',
                success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    console.log("succ auth")
                }, fail() {
                    console.log("fail auth")
                }
            })
            } else {
            console.log("record has been authed")
            }
        }, fail(res) {
            console.log("fail")
            console.log(res)
        }
        })
    },

    onHide: function () {
        wx.stopBackgroundAudio()
    },
    globalData: {

        history: [],

        danmu: [
            { name: "平凡人生", content: "国庆六十周年长安街沿线花卉布置工作已全面展开", logo: "https://wx.qlogo.cn/mmopen/vi_32/JHHq5CW0mrzeguxXmtIgMGCC7GK90CRwKo6K5TugmmlZscDBfnib5Lu5GQMHzQLam2788iaem0MibTBJBngaB9pzg/132" },
            { name: "黯然幽光", content: "广西你好", logo: "https://wx.qlogo.cn/mmopen/vi_32/LLxTzO3nlbraY2s2msyLdHaMicfyxdk1ys3pnfTnWA2a1seTgQdqmUZwYsDWib8AKq7o535VvzFmUom0xicUyHHdA/132" },
            { name: "明天会更好", content: "庆祝广西60大寿", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKD6bl87Ug3etzm5vKKrb3pps0pqibLw9ukpMyYR233W5aHDuriaMKh8wQUAlYNcIsgepxNL6eFBQ7A/132" },
            {
                name: "一生顺利", content: "碧空如洗，明月如盘，叹无数襟怀，古来唯有中秋月；佳梦相期，华年相就，怅几多聚散，别后何堪小饼圆。", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIGr2xkq4gpialUaOhiaaTky5zocjRG8ZiaYuoibnpgOrKsr7icrPOSmqxpwAoqsCSXld9rYZJTptNyaEQ/132" },
            { name: "活性炭公司", content: "十一国庆祝福你;轻轻的风快乐的你", logo: "https://wx.qlogo.cn/mmopen/vi_32/TZrU1jLFYl7dO7q46ZmNmWia7xiaQoZmHp0DwtOGOWqgAdkuJ3Sa84DATibJjDm8IJhFkN1MA2Yp9bU3ibibXEQl7ibQ/132" },
            {
                name: "起点", content: "风递故园情，丹桂花香潜入梦；雁传游子意，中天月朗倍思亲。", logo: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erXQHJjeFk5njaiaaUBWlrN9IcpItLQ2sBtFs2fNGodrgeFFvZgHPvgR0hlYlicaZMHJXnuyFpKHGWA/132" },
            { name: "如火如荼", content: "路漫漫，情长长，牵挂的日子真漫长;", logo: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83equSAmx4uXposuUtibib8hiaYQibpiaP2fn3BicL8ou0jOxNFrHloBTY3x08MBRwRDDgTmlXDepiaicrPLohg/132" },
            { name: "刘之", content: "在这个酷暑挣扎的最后时间里，希望你的心情像夏日一样的洒脱，炙热。不过对于工作了一周的你来说，当下要祝你周末愉快！", logo: "https://wx.qlogo.cn/mmopen/vi_32/5HZb9aUd3YIaX4F3ccagwfgPKsgd73a2FAQDWcqCWNj33y3GDHwK407JzFIcmJpESFsxGeDg7Dia36wOZD6rvLQ/132" },
            {
                name: "你曾是少年", content: "风递故园情，丹桂花香潜入梦；雁传游子意，中天月朗倍思亲。", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q7yX2f6FnPjC1Fd82GB3j2KkicrQ3KZp1JSPzlVibR3cOSwjEkIZTXCuaVJxFyV6X94YgERgxqQKAZOmzbWq0CzA/132" },
            { name: "董平", content: "思念是永恒的主题，祝福是不变的牵挂；想念朋友的感觉，就像享用一杯清茶；又是周末来到，愿您放松身心笑一笑，窗外的风景很美妙。", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLqwgw0xxEOlQaUDFxIdR2n7MsgrwyVfRcpibWIicozGDibSQKmvicfo0haHSRgS1BDCdo9ibO2nq1825A/132" },
            { name: "随适而安", content: "谢谢你的来访。把如诗的缘分装进，把美丽的牵挂装进记忆， 把温暖的话语留在心底， 让真挚的情谊地久天长……", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKcUfTy71uBZQrDxwsbBvTOVH0h2gyuej5vxxlYVLZPFE8VYKdv4aHrCiaZjkyab6Nyba8bicrcsiccA/132" },
            { name: "南去", content: "一千朵玫瑰给你，要你好好爱自己；一千只仙鹤给你，让烦恼远离你；一千颗幸运星给你，让好运围绕着你；一千枚开心果给你，让你天天好心情。", logo: "https://wx.qlogo.cn/mmopen/vi_32/keU5cU0ib36znzicnOVgiaGrjHibI5K46tPsaXuxQiaHXyHQXVVxphRf7hia1JoDdzZ3eKv77xmBJGPhIFPwpFYolvSw/132" },
            { name: "徐徐徐呀徐徐徐", content: "广西我爱你", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIib068bXZpyNP9KJMzSXgYicwr2PTfqeyAkCTvbTKfWMsOuu85eI1ZicH9f0ArZLia6NEvdhsBLIXNpQ/132" },
            { name: "鲨鱼VIE", content: "人生路漫漫，不一定要惊天动地，快乐就好", logo: "https://wx.qlogo.cn/mmopen/vi_32/ZlHP8gic7hAvJZQ8bTjD5b3gLt60s7ia0jm9iaNWwd6eMEYRMIb9o5Iyky4sMKLyicNDwRgS4ZZqaycYicWyia8IEMNw/132" },
            { name: "劉++", content: "一丝真诚，胜过千两黄金", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzbNzpU8TlVn922vlcT4gy2PREkCxzkicYgicKTeXElK1uYgN4plQN02paiclNXMYk81v1XaUicFowhg/132" },
            { name: "左右", content: "一夜在南宁，带走我的爱", logo: "https://wx.qlogo.cn/mmopen/vi_32/HeA9cPaDrEvq179McnZxBtlGm4xqZOicicNGk1js3GmYKZECI59V5gibib2LH2kOnj2rUrgjDDDH5OVfHnkHwoowrg/132" },
            { name: "长风破浪", content: "不要把我扔下河", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL6mssaYcTWkxJL82oBAkywEgm8gib64xxdic3w0Y56aNribtjIYHR5iaFRtZUwEZBRDsIOmXia0qBxMNg/132" },
            { name: "吴建华", content: "人生最美好的东西，就是在南宁遇见了你 ", logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbBM15OTvkSCS31y4RyaGE9Z5eyVsCiblY2SibTT1sib2k4vsoicPQ8x9vQSKcC8Ibh4SJ47RO3N3W4A/132" },
        ],
    }
})