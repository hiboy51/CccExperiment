cc.Class({
    extends: cc.Component,

    properties: {
        // 选中后的图片
        checkedImg: cc.SpriteFrame,
        // 是否初始设置成选中
        isChecked: true,
        // 点选以后的回调
        handler: cc.Component.EventHandler
    },

    // use this for initialization
    onLoad: function () {
        this.sprComponent = this.node.getComponent(cc.Sprite);
        this.normalSpr = this.sprComponent.spriteFrame;
    },

    start: function () {
        this.isChecked && this._changeImg();
    },
    
    onBtnClick: function (target, data) {
        this.isChecked = !this.isChecked;

        var sequence = cc.sequence(
            cc.scaleTo(0.1, 1.1),
            cc.scaleTo(0.1, 1),
            cc.callFunc(function () {
                this._changeImg();
                this.handler && this.handler(this.node, this.isChecked);
            }, this)
        );
        this.node.stopAllActions();
        this.node.runAction(sequence);
    },

    setChecked: function (checked) {
        this.isChecked = checked;
        this._changeImg();
    },

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // private methods
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////

    _changeImg: function () {
        var targetSpr = this.isChecked ? this.checkedImg : this.normalSpr;
        this.sprComponent.spriteFrame = targetSpr;
    }
});
