/**
 * Created by Kinnon.Zhang on 2018/2/2.
 */

const Waterfall = require("Waterfall");

cc.Class({
    extends: cc.Component,
    start: function () {
        this.testWaterFall();
    },

    testWaterFall: function () {
        var something1 = function (cb1) {
            console.log("do thing 1: ", new Date());
            var tick1 = function () {
                cb1();
            };
            setTimeout(tick1, 1000);
        };
        var something2 = function (cb2) {
            console.log("do thing 2: ", new Date());
            var tick2 = function () {
                cb2();
            };
            setTimeout(tick2, 2000);
        };
        var something3 = function (cb3) {
            console.log("do thing 3: ", new Date());
            var tick3 = function () {
                cb3();
            };
            setTimeout(tick3, 3000);
        };

        Waterfall.bind(this)(something1, something2, something3);
    }
});