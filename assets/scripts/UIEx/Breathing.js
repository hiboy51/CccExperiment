/**
 * Created by Kinnon.Zhang on 2017/7/26.
 */

cc.Class({
    extends: cc.Component,

    properties: {
        interval: 0.5,
        scale: 1.2,
    },

    // ///////////////////////////////////////////////////////////////////////////////////////////////////
    // life cycle
    // ///////////////////////////////////////////////////////////////////////////////////////////////////
    onEnable: function () {
        var action = cc.sequence(cc.scaleTo(this.interval, this.scale), cc.scaleTo(this.interval, 1.0));
        var repeat = cc.repeatForever(action);

        this.node.runAction(repeat);
    },
});