/**
 * Created by Kinnon.Zhang on 2018/2/2.
 * 流程控制，避免回调嵌套
 */

function Waterfall() {
    var argLen = arguments.length;
    if (argLen == 0) {
        return;
    }

    var argArray = Array.prototype.slice.apply(arguments);
    var func = argArray[0];
    var rest = argArray.length > 1 ? argArray.slice(1) : undefined;
    var self = this;
    if (self === undefined) {
        func(function () {
            Waterfall.apply(self, rest);
        });
    }
    else {
        func.bind(this)(function () {
            Waterfall.apply(self, rest);
        });
    }
};

cc.vv = cc.vv || {};
cc.vv.waterfall = cc.vv.waterfall || Waterfall;

module.exports = Waterfall;



