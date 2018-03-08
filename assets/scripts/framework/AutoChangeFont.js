/**
 * Created by Kinnon.Zhang on 2017/12/27.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        fntWin: cc.Font,
        fntLoss: cc.Font,

        lbl_target: cc.Label
    },

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // life-cycle hooks
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    update: function() {
        if (!this.lbl_target) {
            return;
        }

        var head = this._getStringHead();
        if (head == "-") {
            this.lbl_target.font = this.fntLoss;
        }
        else {
            this.lbl_target.font = this.fntWin;
        }
    },

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // private methods
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _getStringHead: function () {
        var score = this.lbl_target.string;
        score = score.toString();
        if (!score || score === "") {
            return "";
        }
        var head = score.charAt(0);
        return head;
    },
});


