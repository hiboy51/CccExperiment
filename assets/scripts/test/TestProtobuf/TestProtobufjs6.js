/**
 * Created by Kinnon.Zhang on 2018/3/9.
 * 测试protobufjs6
 */
cc.Class({
    extends: cc.Component,
    properties: {
        lbl_content: cc.Label
    },

    onLoad: function() {
        var PB = protobuf;
        // hack
        PB.util.fetch = cc.loader.load.bind(cc.loader);

        var url = cc.url.raw("resources/proto/scqp_eg.proto");
        PB.load(url, function(err, root) {
            if (err) {
                console.log(err);
                return;
            }
            var OperationReq = root.lookupType("scqp_eg.OperationReq");
            var newReq = OperationReq.create({op: 123, request: {code: 1, api: 11}});
            var buf = OperationReq.encode(newReq).finish();
            var parseBuf = OperationReq.decode(buf);
            console.log(OperationReq.toObject(parseBuf, {
                longs: String,
                enums: String,
                bytes: String,
            }));
        });
    },
});
