// components/xx_cover_news/xx_cover_news.js


var downCanvasID = "downCanvas"
var canvas
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        makeLandmark: {
            type: Object,
            value: {},
            observer: '_makeLandmark',
        },
        bg: {
            type: String,
            value: 0,
        },
        width: {
            type: Number,
            value: 0,
        },
        height: {
            type: Number,
            value: 0,
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
        borderSize:20,
        logoHeight:90,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _makeLandmark(newVal, oldVal) {

            console.log(newVal)
            if (newVal.hasOwnProperty("head")) {
                var _width = this.data.width
                var _height = this.data.height
                var downCanvasID = "downCanvas"
                // GP.setData({ getImage: true })
                canvas = wx.createCanvasContext(downCanvasID,this)
                // 1. 绘制图片至canvas
                canvas.setFillStyle('white')
                canvas.fillRect(0, 0, _width + this.data.borderSize, _height + this.data.logoHeight)
                canvas.drawImage(
                    this.data.bg, 
                    this.data.borderSize / 2, //画图要预留边框空白
                    this.data.borderSize/2,  //画图要预留边框空白
                    _width, //图片实际宽度
                    _height //图片实际高度
                )
                this.updateLine()
                canvas.draw(false, () => {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        // width: this.data.bgWidth,
                        // height: this.data.bgHeight,
                        width: _width + + this.data.borderSize,
                        height: _height + this.data.logoHeight,
                        // destWidth: 100,
                        // destHeight: 100,
                        canvasId: downCanvasID,
                        success(res) {
                            console.log(res.tempFilePath)
                            wx.previewImage({
                                urls: [res.tempFilePath],
                            })
                        }
                    },this)
                })
               
            }
        },

        updateLine() {
            var key = this.data.makeLandmark
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
            this.drawPoint(key)
            this.drawLogo()
        },

        drawLogo(){

            var _width = this.data.width
            var _height = this.data.height
            var _border = this.data.borderSize

            canvas.setFillStyle("#000000")
            canvas.setFontSize(11)
            // canvas.fillText('2018.10.17', (_width + _border) / 2 - 30, _height + 30)
            // canvas.drawImage('../../images/qr.jpg', (_width + _border) - 70, _height + 40, 60, 60)
            canvas.fillText('2018.10.17:18:09  |  艺术姿势研究中心', 10, _height + 30)
            canvas.drawImage('../../images/qr.jpg', (_width + _border) - 70, _height +20, 60, 60)
            // ctx.fillText('MINA', 100, 100)
        },

        drawPoint(key){
            canvas.setFillStyle(this.data.pointColor)
            for (var i in key) {
                canvas.beginPath()
                canvas.arc(
                    this.getCenterPos(key[i]).x,
                    this.getCenterPos(key[i]).y,
                    key[i].width / 2,
                    0,
                    2 * Math.PI
                )
                canvas.fill()
            }

        },

        drawLine(point1, point2) {
            canvas.setLineWidth(2)
            canvas.setStrokeStyle(this.data.lineColor)
            canvas.beginPath()
            canvas.moveTo(
                this.getCenterPos(point1).x,
                this.getCenterPos(point1).y
            )
            canvas.lineTo(
                this.getCenterPos(point2).x,
                this.getCenterPos(point2).y
            )
            canvas.stroke()
        },

        getCenterPos(point) {
            var center_x = point.x + (point.width + this.data.borderSize ) / 2
            var center_y = point.y + (point.height + this.data.borderSize) / 2
            return { x: center_x, y: center_y, }
        },





    }
})
