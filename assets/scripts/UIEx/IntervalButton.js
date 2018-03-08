cc.Class({
    extends: cc.Button,

    properties: {
        interval:{default:0.5, type:cc.Float, tooltip:'clicked interval time'},
        clickedSoundEffect:{default:null, url:cc.AudioClip, tooltip:'clicked sound effect'},
    },

    // use this for initialization
    onLoad: function () {
        this.lastClickedTime = 0;
    },

    isCooldown:function () {
        const d = new Date();
        if( this.lastClickedTime === 0){
            return false
        }else{
            let interval = d.getTime() - this.lastClickedTime;
            return interval < this.interval * 1000;
        }
    },

    _onTouchBegan:function (event) {
        if(!this.interactable || !this.enabledInHierarchy || this.isCooldown()) return;
        this._super(event);
     },

    _onTouchMove:function (event) {
        if (!this.interactable || !this.enabledInHierarchy || !this._pressed || this.isCooldown()) return;
        this._super(event);
    },

    _onTouchEnded:function (event) {
        if (!this.interactable || !this.enabledInHierarchy || this.isCooldown()) return;
        this._super(event);
        this.lastClickedTime = new Date().getTime();
        if(this.clickedSoundEffect){
            cc.vv.audioMgr.playRawSFX(this.clickedSoundEffect)
        }
    },
    
    _onTouchCancel:function (event) {
        if (!this.interactable || !this.enabledInHierarchy || this.isCooldown()) return;
        this._super(event);
        this.lastClickedTime = new Date().getTime();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
