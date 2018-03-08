/**
 * Created by Kinnon.Zhang on 2017/9/5.
 * 隐藏式列表
 * 点击开关显示或关闭下拉列表
 */

cc.Class({
    extends: cc.Component,
    properties: {
        nd_switch: cc.Node,
        nd_listView: cc.Node,

        during_animatioin: 0.2,
    },

    onLoad: function () {
        this._bAnimation = false;

        this.nd_listView.y = this.nd_listView.getContentSize().height;
    },

    onBtnSwitch: function () {
        if (this._bAnimation) {
            return;
        }

        this.nd_switch.rotation += 180;

        var moveOffset = this.nd_listView.getContentSize().height;
        if (this._isSwitchOn()) {
            moveOffset = -moveOffset;
        }

        var self = this;
        this._bAnimation = true;
        this.nd_listView.runAction(cc.sequence(
            cc.moveBy(self.during_animatioin, 0, moveOffset),
            cc.callFunc(function () {
                self._bAnimation = false;
            })
        ));
    },

    _isSwitchOn: function () {
        var rotation = this.nd_switch.rotation;
        var factor = rotation / 180;
        return factor % 2 == 0;
    },

});
