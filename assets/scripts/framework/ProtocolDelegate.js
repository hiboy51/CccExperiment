/**
 * 优点：
 *      将网络协议号包装成Cocos Creator编辑器支持的枚举类型
 *      可以在面板下拉选取，更方便，更不易出错
 * 缺点：
 *      由于枚举类型在Cocos Creator内部以整数被序列化到文件中，
 *      所以定义协议号的数组若从中间删除或添加，将导致枚举值被
 *      反映射到协议号的过程错位
 *
 * */

var COMMANDS = require("IDProtocols");

var menu = {};
for (var i in COMMANDS) {
    menu[i] = -1;
}
var MENU = cc.Enum(menu);

function getEnumNameByValue(list, value) {
    for (var i in list) {
        var item = list[i];
        if (item.value === value) {
            return item.name;
        }
    }
    return "";
}

function getProtocolIdByEnum(enumValue) {
    var list = cc.Enum.getList(MENU);
    var idx = getEnumNameByValue(list, enumValue);
    return COMMANDS[idx];
}

// ////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom Class
// ////////////////////////////////////////////////////////////////////////////////////////////////////

var ProtocolHandler = cc.Class({
    name: "ProtocolHandler",
    properties: {
        /** 指定协议号 */
        protocol_id: {
            default: -1,
            type: MENU
        },
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

    onLoad: function () {
        this._callbacks = [];

        this._registerHandlers();
    },

    onDestroy: function () {
        this._unregisterHandlers();
    },

    // ////////////////////////////////////////////////////////////////////////////////////////////////////

    _registerHandlers: function () {
        for (var i in this.protocols) {
            var p = this.protocols[i];
            var command = getProtocolIdByEnum(p.protocol_id);
            if (!command) {
                continue;
            }
            var handler = p.protocol_handler;
            if (!handler) {
                continue;
            }
            var callback = cc.vv.eventTarget.on(command, function (data) {
                this.emit([data.detail]);
            }.bind(handler), this.node);
            this._callbacks.push({
                event: command,
                callback: callback
            });
        }
    },

    _unregisterHandlers: function () {
        for (var i in this._callbacks) {
            var cache = this._callbacks[i];
            cc.vv.eventTarget.off(cache.event, cache.callback);
        }
        this._callbacks.length = 0;
    },
});