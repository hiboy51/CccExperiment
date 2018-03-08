/**
 * Created by Kinnon.Zhang on 2017/7/26.
 */

const Display = require("Display");

cc.Class({
    extends: Display,

    // //////////////////////////////////////////////////////////////////////////////////////////
    // lifeCycle
    // //////////////////////////////////////////////////////////////////////////////////////////

    /** override */
    isDirty: function () {
        return true;
    },

    /** override */
    _refreshView: function () {
        if (cc.vv.banInteraction) {
            this.node.active = true;
            return;
        }
        this.node.active = false;
    },
});
