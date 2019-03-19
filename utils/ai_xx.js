




module.exports = {
    initImage: "../../images/body1.jpg",
    initBodyRectangle: { "width": 151, "top": 153, "left": 203, "height": 262 },
    initLandmark: { "right_hand": { "y": 129, "x": 21, "score": 0.55224526 }, "head": { "y": 14, "x": 40, "score": 0.60974866 }, "neck": { "y": 58, "x": 55, "score": 0.54529846 }, "left_shoulder": { "y": 58, "x": 74, "score": 0.5507863 }, "right_buttocks": { "y": 134, "x": 55, "score": 0.6342306 }, "left_knee": { "y": 195, "x": 97, "score": 0.57572395 }, "right_elbow": { "y": 101, "x": 21, "score": 0.58263665 }, "right_shoulder": { "y": 68, "x": 31, "score": 0.56304777 }, "left_buttocks": { "y": 140, "x": 83, "score": 0.6076769 }, "left_foot": { "y": 260, "x": 131, "score": 0.6903978 }, "left_elbow": { "y": 96, "x": 107, "score": 0.59646153 }, "left_hand": { "y": 134, "x": 102, "score": 0.54482025 }, "right_knee": { "y": 178, "x": 26, "score": 0.5712829 }, "right_foot": { "y": 233, "x": 31, "score": 0.56464756 } },

    landmarkName: ["head", "neck", "left_shoulder", "left_elbow", "left_hand", "right_shoulder", "right_elbow", "right_hand", "left_buttocks", "left_knee", "left_foot", "right_buttocks", "right_knee", "right_foot"],


    offset:offset,
}

function offset(orgBodyRectangle, orgLandmark, ratio){
    // 原点宽度
    var pointWidth = 10
    var pointHeight = 10
    var offsetLandmark = {}
    //14个点坐标转换
    for (var i in orgLandmark) {
        var _obj = orgLandmark[i]
        _obj.key = i
        _obj.width = pointWidth
        _obj.height = pointHeight
        _obj.x = (orgBodyRectangle.left + _obj.x) * ratio - pointWidth / 2
        _obj.y = (orgBodyRectangle.top + _obj.y) * ratio - pointHeight / 2
        offsetLandmark[i] = _obj
    }
    //跨步坐标生成
    var _half = {
        id: 14,
        x: (offsetLandmark["left_buttocks"].x + offsetLandmark["right_buttocks"].x) / 2,
        y: (offsetLandmark["left_buttocks"].y + offsetLandmark["right_buttocks"].y) / 2,
        width: 10,
        height: 10,
    }
    offsetLandmark["half"] = _half
    return offsetLandmark
}