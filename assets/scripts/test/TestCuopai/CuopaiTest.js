/**
 * Created by Kinnon.Zhang on 2018/4/8.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        nd_bg:                      cc.Node,
        nd_zhengmian:               cc.Node,
        nd_root:                    cc.Node,
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////
    // life cycle

    onLoad: function() {
        this._offsetY = 0;

        this._zhengMianBaseY = this.nd_zhengmian.y;
        this._bgBaseY = this.nd_bg.y;
        this._rootBaseY = this.nd_root.y;

        this._rollBack = false;
    },
    
    update: function () {
        if (!this._rollBack) {
            return;
        }

        if (this._offsetY > 20) {
            this._offsetY -= 20;
        }
        else {
            this._offsetY = 0;
            this._rollBack = false;
        }

        this._refreshView();
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////
    // override from [GestureRecognizer]

    onDragging: function(node, startPos, curPos, deltaStep) {
        this._rollBack = false;

        var willY = this.nd_zhengmian.y + deltaStep.y;
        if (willY < -238 || willY > -6) {
            return;
        }
        this._offsetY += deltaStep.y;

        this._refreshView();
    },

    onDragEnd: function (node, startPos, curPos) {
        this._rollBack = true;
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////
    // private methods

    _refreshView: function () {
        this.nd_zhengmian.y = this._zhengMianBaseY + this._offsetY;
        this.nd_bg.y = this._bgBaseY - this._offsetY;
        this.nd_root.y = this._rootBaseY + this._offsetY;
    },
});
