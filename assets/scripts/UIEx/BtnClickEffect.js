cc.Class ({
    extends: cc.Component,
    
    properties: {
        fileName: "btn_click.mp3",
    },
    
    // use this for initialization
    onLoad: function () {
    },
    
    onEnable : function () {
        var btn = this.node.getComponent (cc.Button);
        if (btn) {
            this.node.on (cc.Node.EventType.TOUCH_START, this._playBtnEfx, this);
        }
    },
    onDisable: function () {
        this.node.off (cc.Node.EventType.TOUCH_START, this._playBtnEfx, this);
    },
    
    _playBtnEfx: function () {
        console.log ('BtnClickEffect node:' + this.node.name + ' active:' + this.node.active);
        cc.vv.audioMgr.playSFX (this.fileName);
    }
});
