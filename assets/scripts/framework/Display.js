/**
 * Created by Kinnon.Zhang on 2017/7/25.
 * 抽象概念：“展示”
 *  一个“展示”可以根据自身注册的开关来决定拉取感兴趣的数据并更新自身视图
 *
 *  ##
 *  最佳实践：
 *      1.尽量避免在长动画中激活Display的刷新机制，可以灵活复写isDirty方法来
 *        延迟刷新
 *      2.注意在_onNetworkDisconnected方法中处理断网情况，通常需要停掉正在播
 *        放的动画
 *      3.reset中初始化视图不是必须的，某些情况下需要保证节点上动画不被刷新机
 *        制打断，则避免在reset中重置节点
 *      ...
 *
 *      想到在写
 *
 *  ##
 */

cc.Class({
    extends: cc.Component,

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // life cycle
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    onLoad: function() {
        this.saveDisconnectCallback = null;
        this.realKey = null;
        this.schedule(this._onTickListening, 0);
        if (this._shareSignal()) {
            return;
        }
        this._registerSwitchKey(this._refreshOnLoad());
    },

    onDestroy: function() {
        console.log("Display tick removed");
        this.unschedule(this._onTickListening);

        if (cc.vv && cc.vv.eventTarget) {
            cc.vv.eventTarget.targetOff(this.node);
        }
    },

    onEnable: function() {
        // 监听断网
        if (cc.vv && cc.vv.eventTarget) {
            this.saveDisconnectCallback = cc.vv.eventTarget.on("disconnect", this._onNetworkDisconnected.bind(this), this.node);
        }

        if (this._shareSignal()) {
            this._registerSwitchKey();
        }

        this.unschedule(this._onTickListening);
        this.schedule(this._onTickListening, 0);
        // 立即执行一次刷新，避免有一帧的界面延迟
        this._onTickListening();
    },

    onDisable: function() {
        // 注销监听
        if (cc.vv && cc.vv.eventTarget && !!this.saveDisconnectCallback) {
            cc.vv.eventTarget.off("disconnect", this.saveDisconnectCallback, this.node);
            this.saveDisconnectCallback = null;
        }
        if (this._shareSignal()) {
            this._unregisterShareKey();
        }
    },

    update: function(dt) {

    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // public interface
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * virtual
     * 可以领用覆写该方法来控制刷新频率(hack手段)
     */
    isDirty: function () {
        var isSwitchOn = this._isSwitchOn();
        return !!isSwitchOn;
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // private interface
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** final */
    _onTickListening: function () {
        if (!this.isDirty()) {
            return;
        }

        this._reset();
        this._refreshView();

        var key = this._getSwitchKey();

        var Display = require("Display");
        Display.turnOff(key, this._shareSignal() ? this.realKey : null);

        var msg = key;
        console.log("Display Updated by Key: ", msg);
    },

    /**
     * #virtual
     * 监听断网事件
     * 通常在断网时需要停止正在播放的动画，以免动画回调可能会影响重连后的初始化逻辑
     **/
    _onNetworkDisconnected: function(debug) {
        if (!!debug) {
            var switchKey = this._getSwitchKey();
            console.log("Disconnecting Listener by Key ", switchKey,  "worked:");
        }
    },

    _refreshView: function () {

    },

    _refreshOnLoad: function () {
        return true;
    },

    /** final */
    _registerSwitchKey: function(initOn) {
        var switchOn = initOn == undefined ? true : initOn;

        var key = this._getSwitchKey();
        if (key === null) {
            return;
        }
        if (typeof (key) != "string") {
            console.error("invalid switch key");
            return;
        }

        if (!this._shareSignal()) {
            cc.vv.switches = cc.vv.switches || {};
            cc.vv.switches[key] = switchOn;
            return;
        }

        cc.vv.switchesShare = cc.vv.switchesShare || {};
        cc.vv.switchesShare[key] = cc.vv.switchesShare[key] || [];

        var realKey = this.realKey || this._uuid();
        var list = cc.vv.switchesShare[key];

        var find = false;
        for (var i = 0; i < list.length; ++i) {
            var item = list[i];
            if (item.key == realKey) {
                find = true;
                break;
            }
        }
        if (!find) {
            this.realKey = realKey;
            list.push({key: this.realKey, value: switchOn});
        }
    },

    /** final */
    _unregisterShareKey: function() {
        var key = this._getSwitchKey();
        if (!key) {
            return;
        }
        if (!cc.vv.switchesShare || cc.vv.switchesShare[key] == undefined) {
            return;
        }

        if (this.realKey == null) {
            return;
        }

        var list = cc.vv.switchesShare[key];
        var find = -1;
        for (var i = 0; i < list.length; ++i) {
            var each = list[i];
            if (each.key == this.realKey) {
                find = i;
                break;
            }
        }
        if (find >= 0) {
            list.splice(find, 1);
            this.realKey = null;
            console.log("UnRegister share Key: ", key);
        }
    },

    _getSwitchKey: function () {
        return null;
    },

    /** final */
    _isSwitchOn: function () {
        var key = this._getSwitchKey();
        if (key === null) {
            return false;
        }
        var share = this._shareSignal();
        if (!share) {
            if (!cc.vv.switches) {
                return false;
            }
            return cc.vv.switches[key];
        }

        if (!cc.vv.switchesShare || cc.vv.switchesShare[key] == undefined) {
            return false;
        }
        if (this.realKey == null) {
            return false;
        }

        var list = cc.vv.switchesShare[key];
        for (var i = 0; i < list.length; ++i) {
            var item = list[i];
            if (item.key == this.realKey) {
                return item.value;
            }
        }
        return false;
    },

    _reset: function() {

    },

    /**
     * 共享信号
     * 共享相同信号的组件会被单独编成组
     * 组内所有成员都执行更新后才会关闭信号
     * */
    _shareSignal: function() {
        return false;
    },

    /** final */
    _uuid: function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // static
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    statics: {
        clearAll: function() {
            cc.vv.switches = null;
            cc.vv.switchesShare = null;
        },

        resetAll: function() {
            if (cc.vv.switches) {
                for (var i in  cc.vv.switches) {
                    console.log("Key reset: ", i);
                    cc.vv.switches[i] = true;
                }
            }

            if (cc.vv.switchesShare) {
                for (var i in cc.vv.switchesShare) {
                    cc.vv.switchesShare[i].forEach(function (each) {
                        console.log("Key reset: ", i);
                        each.value = true;
                    });
                }
            }
        },

        isSwitchOnByKey: function (key) {
            if (!key) {
                return false;
            }

            if (cc.vv.switches && cc.vv.switches[key] != undefined) {
                return cc.vv.switches[key];
            }
            if (cc.vv.switchesShare && cc.vv.switchesShare[key] != undefined) {
                var result = true;
                var list = cc.vv.switchesShare[key];
                for (var i = 0; i < list.length; ++i) {
                    var each = list[i];
                    if (!!each.value == false) {
                        return false;
                    }
                }
                return result;
            }
        },

        turnOn: function (key) {
            if (!key) {
                return;
            }

            if (typeof (key) != "string") {
                console.error("cannot turn on switch by invalid key:", key);
                return;
            }

            if (cc.vv.switches && cc.vv.switches[key] != undefined) {
                cc.vv.switches[key] = true;
                console.log("Single signal turned on: ", key);
                return;
            }
            if (cc.vv.switchesShare && cc.vv.switchesShare[key] != undefined) {
                var list = cc.vv.switchesShare[key];
                for (var i = 0; i < list.length; ++i) {
                    var each = list[i];
                    each.value = true;
                    console.log("Share signal turned on: ", key);
                }
            }
        },

        turnOff: function (key, realKey) {
            if (!key) {
                return;
            }

            if (typeof (key) != "string") {
                console.error("cannot turn off switch by invalid key:", key);
                return;
            }

            if (cc.vv.switches && cc.vv.switches[key] != undefined) {
                cc.vv.switches[key] = false;
                return;
            }

            if (!realKey) {
                return;
            }

            if (cc.vv.switchesShare && cc.vv.switchesShare[key] != undefined) {
                var list = cc.vv.switchesShare[key];
                for (var i = 0; i < list.length; ++i) {
                    var each = list[i];
                    if (each.key == realKey) {
                        each.value = false;
                        break;
                    }
                }
            }
        }
    }
});

