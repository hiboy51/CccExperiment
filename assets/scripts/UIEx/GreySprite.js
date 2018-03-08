/**
 * Created by Kinnon.Zhang on 2017/12/29.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        enable_grey: {
            default: false,
            notify: function() {
                this._greySprite();
            }
        }
    },

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // life-cycle hooks
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _greySprite: function() {
        var comps_sprite = this.node.getComponentsInChildren(cc.Sprite);
        if (comps_sprite.length == 0) {
            return;
        }

        for (var i = 0; i < comps_sprite.length; ++i) {
            var spr = comps_sprite[i];
            spr._sgNode.setState(this.enable_grey ? 1 : 0);
        }
    }
});
