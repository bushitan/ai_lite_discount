// components/xx_cover_news/xx_cover_news.js
//1 head	Object	头部
//2 neck	Object	脖子
//3 left_shoulder	Object	左肩
//4 left_elbow	Object	左肘
//5 left_hand	Object	左手
//6 right_shoulder	Object	右肩
//7 right_elbow	Object	右肘
//8 right_hand	Object	右手
//9 left_buttocks	Object	左臀
//10 left_knee	Object	左膝
//11 left_foot	Object	左脚
//12 right_buttocks	Object	右臀
//13 right_knee	Object	右膝
//14 right_foot	Object	右脚

var canvasID = "lineCanvas"
var context
var tempKey = ""
Component({
  /**
   * 组件的属性列表
   */
    properties: {    

        landmark: {
            type: Object,
            value: {},
            observer: '_changeLandmark',
        },



        move: {
            type: Object,
            value: {},
            observer: '_changeMove',
        },

        bg: {
            type: String,
            value: "",
            observer: '_changeBG',
        },
        pointColor: {
            type: String,
            value: "#ffffff",
        },
        lineColor: {
            type: String,
            value: "#ffffff",
            // observer: '_changeColor',
        },
       
  },

  /**
   * 组件的初始数据
   */
    data: {
        list:[],

        isTouchLock:false,
    },

    ready(){




    },

  /**
   * 组件的方法列表
   */
    methods: {
        _changeColor(newVal, oldVal) {
            if (newVal) {
                // context.setStrokeStyle(newVal)
                this.setData({ lineColor: newVal})
                // this.updateLine()
            }
        },

        //增加关节点
        _changeLandmark(newVal, oldVal) {
            // console.log(newVal,213232)
            if (newVal.hasOwnProperty("head")) {
                this.setData({
                    landmark:newVal
                })

                if (context == undefined) {
                    context = wx.createCanvasContext(canvasID, this)
                    context.setStrokeStyle(this.data.lineColor)
                    context.setLineWidth(2)
                }
                this.updateLine()
            }
        },
     

        _changeMove(newVal, oldVal){
            if (newVal) {
                var key = newVal["key"]
                var offsetX = newVal["x"]
                var offsetY = newVal["y"]
                var _landmark = this.data.landmark
                _landmark[key].x = _landmark[key].x + offsetX
                _landmark[key].y = _landmark[key].y + offsetY
                this.setData({
                    landmark: _landmark
                })
                // GP.setData
                this.updateLine()
            }
        },


        /**
         * return: 点击列表的index
         */
        clickLeft(e) {
            // this.setData({
            //     initindex: e.currentTarget.dataset.index
            // })
            console.log(123)
            this.triggerEvent('clickLeft');
        },

        //触摸事件
        touch(e) {
            var key = e.currentTarget.dataset.key
            var _landmark = this.data.landmark
            _landmark[key].x = e.detail.x
            _landmark[key].y = e.detail.y
            this.setData({
                landmark: _landmark
            })

            var touchCallback = {
                key: key,
                landmark: this.data.landmark,
            }
            this.triggerEvent('touchCallback', touchCallback);
            this.updateLine()
                // this.setData({
                //     landmark: _landmark
                // })

                // if (tempKey != key) {
                //     tempKey = key
                //     // this.triggerEvent('currentKey', key);
                //     // console.log(e.currentTarget.dataset.index)
                    
                // }
        },


        // initContext(){

        // },
        //1 head	Object	头部
        //2 neck	Object	脖子
        //3 left_shoulder	Object	左肩
        //4 left_elbow	Object	左肘
        //5 left_hand	Object	左手
        //6 right_shoulder	Object	右肩
        //7 right_elbow	Object	右肘
        //8 right_hand	Object	右手
        //9 left_buttocks	Object	左臀
        //10 left_knee	Object	左膝
        //11 left_foot	Object	左脚
        //12 right_buttocks	Object	右臀
        //13 right_knee	Object	右膝
        //14 right_foot	Object	右脚
        updateLine(){
            var key = this.data.landmark
            // console.log(key)
            this.drawLine(key["head"], key["neck"])
            this.drawLine(key["neck"], key["left_shoulder"])
            this.drawLine(key["neck"], key["right_shoulder"])

            this.drawLine(key["left_shoulder"], key["left_elbow"])
            this.drawLine(key["left_elbow"], key["left_hand"])

            this.drawLine(key["right_shoulder"], key["right_elbow"])
            this.drawLine(key["right_elbow"], key["right_hand"])

            this.drawLine(key["left_shoulder"], key["half"])
            this.drawLine(key["right_shoulder"], key["half"])


            this.drawLine(key["left_buttocks"], key["half"])
            this.drawLine(key["right_buttocks"], key["half"])

            this.drawLine(key["left_buttocks"], key["left_knee"])
            this.drawLine(key["left_knee"], key["left_foot"])

            this.drawLine(key["right_buttocks"], key["right_knee"])
            this.drawLine(key["right_knee"], key["right_foot"])

            context.setStrokeStyle(this.data.lineColor)
            context.stroke()
            context.draw()
        },

        drawLine(point1,point2){
            context.moveTo(
                this.getCenterPos(point1).x,
                this.getCenterPos(point1).y
            )
            context.lineTo(
                this.getCenterPos(point2).x,
                this.getCenterPos(point2).y
            )
        },

        getCenterPos(point) {
            var center_x = point.x + point.width / 2
            var center_y = point.y + point.height / 2            
            return { x: center_x, y: center_y,}
        },
    }
})
