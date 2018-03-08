/**
 * Created by Kinnon.Zhang on 2017/12/15.
 * 不再采用包装枚举的方式拉选网络消息协议号
 */

const DEBUG = true;

const CONFIG = [
    "IDProtocols",
];

const COMMANDS = function () {
    var all = [];
    for (var i = 0; i < CONFIG.length; ++i) {
        var file = CONFIG[i];
        var conf = require(file);
        if (!!conf) {
            all.push(conf);
        }
    }
    return all;
}();

/**
 *  若查找到与定义文件匹配的key，则返回对应的value
 *  否则返回key本身
 *  虽然直接使用协议号是允许的，还是建议先定义key再使用，更规范易读
 * */
function getProtocolByKey(key) {
    if (!Array.isArray(COMMANDS)) {
        return key;
    }

    for (var i = 0; i < COMMANDS.length; ++i) {
        var conf = COMMANDS[i];
        for (var k in conf) {
            if (k == key) {
                return conf[k];
            }
        }
    }
    return key;
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom Class
// ////////////////////////////////////////////////////////////////////////////////////////////////////

var ProtocolHandler = cc.Class({
    name: "ProtocolHandlerEx",
    properties: {
        /** 指定协议号 */
        protocol_id: "EMPTY_KEY",
        /** 指定协议处理方法 */
        protocol_handler: cc.Component.EventHandler,
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        protocols: {
            default: [],
            type:[ProtocolHandler]
        }
    },

    onEnable: function() {
        this._callbacks = [];
        this._registerHandlers();
    },

    onDisable: function() {
        this._unregisterHandlers();
    },
    // ////////////////////////////////////////////////////////////////////////////////////////////////////

    _registerHandlers: function () {
        for (var i in this.protocols) {
            var p = this.protocols[i];
            var command = getProtocolByKey(p.protocol_id);
            if (!command) {
                continue;
            }
            var handler = p.protocol_handler;
            if (!handler) {
                continue;
            }
            var callback = cc.vv.eventTarget.on(command, function (data) {
                DEBUG && console.log("Handle: ", JSON.stringify({
                    protocol: this.command,
                    script: this.handler.component,
                    foo: this.handler.handler
                }, null, '\t'));

                this.handler.emit([data.detail]);
            }.bind({handler: handler, command: command}), this.node);
            this._callbacks.push({
                event: command,
                callback: callback
            });
        }
    },

    _unregisterHandlers: function () {
        for (var i in this._callbacks) {
            var cache = this._callbacks[i];
            cc.vv.eventTarget.off(cache.event, cache.callback, this.node);
        }
        this._callbacks.length = 0;
    },
});