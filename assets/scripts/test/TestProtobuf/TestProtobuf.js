/**
 * Created by Kinnon.Zhang on 2018/3/8.
 */
var Protobuf = require("../../ThirdParty/Protobuf/protobuf");
require("../../framework/Flow");

cc.Class({
    extends: cc.Component,
    properties: {
        lbl_content: cc.Label,
    },
    onLoad: function () {
        var pbBuilder = Protobuf.newBuilder();
        var EgMessage = null;
        cc.vv.waterfall(function (cb) {
            cc.loader.loadRes("proto/common", function (err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                Protobuf.loadProto(content, pbBuilder);
                cb();
            });
        }, function(cb) {
            cc.loader.loadRes("proto/room", function (err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                Protobuf.loadProto(content, pbBuilder);
                cb();
            });
        }, function(cb) {
            cc.loader.loadRes("proto/hall_hz", function (err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                Protobuf.loadProto(content, pbBuilder);
                cb();
            });
        }, function(cb) {
            cc.loader.loadRes("proto/scqp_eg", function (err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                Protobuf.loadProto(content, pbBuilder);
                cb();
            });
        }, function (cb) {
            EgMessage = pbBuilder.build("scqp_eg");
            var newMsg = new EgMessage.OperationReq();
            newMsg.request = {};
            newMsg.request.code = 123;
            newMsg.op = 111;
            newMsg.card = 1234;
            newMsg.count = 3;

            var data = newMsg.toArrayBuffer();
            this.lbl_content.string = "parse successfull";
            var parse = EgMessage.OperationReq.decode(data);
            this.scheduleOnce(function () {
                this.lbl_content.string = JSON.stringify(parse, null, "\t");
            }.bind(this), 5);
        }.bind(this));
    }
});

