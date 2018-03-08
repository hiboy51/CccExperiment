/**
 * Created by Kinnon.Zhang on 2018/3/5.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        chouma_tmpl: cc.Node,
        chouma_parent: cc.Node,

        during: 1.0,
        in_out_radio: 3.0,

        pointsPos: [cc.Vec2],

        drawNode: cc.Graphics,

        count_range: [cc.Integer],
    },

    onLoad: function() {
        this.pointsBezier = this.calBezierCtrlPoint(this.pointsPos[0], this.pointsPos[1]);
        console.log(this.pointsBezier);
        this.drawBazierLine();

        this.pool = new cc.NodePool("BezierMoveTest");
        this.pool.put(this.chouma_tmpl);

        this.nearB1 = false;
        this.nearB2 = false;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touchP = this.chouma_parent.convertToNodeSpaceAR(event.getLocation());
            var limit = 50;

            var distanceP1 = (touchP.x - this.pointsBezier[0].x) * (touchP.x - this.pointsBezier[0].x) +
                (touchP.y - this.pointsBezier[0].y) * (touchP.y - this.pointsBezier[0].y);
            distanceP1 = Math.sqrt(distanceP1);

            var distanceP2 = (touchP.x - this.pointsBezier[1].x) * (touchP.x - this.pointsBezier[1].x) +
                (touchP.y - this.pointsBezier[1].y) * (touchP.y - this.pointsBezier[1].y);;
            distanceP2 = Math.sqrt(distanceP2);

            if (distanceP1 < limit) {
                this.nearB1 = true;
            }
            if (distanceP2 < limit) {
                this.nearB2 = true;
            }

        }.bind(this));

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.getDelta();
            if (!!this.nearB1) {
                this.pointsBezier[0].x += delta.x;
                this.pointsBezier[0].y += delta.y;
            }

            if (!!this.nearB2) {
                this.pointsBezier[1].x += delta.x;
                this.pointsBezier[1].y += delta.y;
            }

            this.drawBazierLine();

        }.bind(this));

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.nearB1 = false;
            this.nearB2 = false;
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.nearB1 = false;
            this.nearB2 = false;
        }.bind(this));
    },

    onDisable: function() {
        if (this.pool) this.pool.clear();
    },

    calBezierCtrlPoint: function (pBegin, pEnd) {
        var radio = 200;
        var deltaX = pEnd.x - pBegin.x;
        var deltaY = pEnd.y - pBegin.y;
        var cos = deltaX / Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var sin = deltaY / Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var cltrP1 = cc.p(pBegin.x + deltaX / 3, pBegin.y + deltaY / 3);
        var cltrP2 = cc.p(pEnd.x - deltaX / 3, pEnd.y - deltaY / 3);
        cltrP1.x -= radio * sin;
        cltrP1.y += radio * cos;
        cltrP2.x -= radio * sin;
        cltrP2.y += radio * cos;

        return [
            cc.p(Math.floor(cltrP1.x), Math.floor(cltrP1.y)),
            cc.p(Math.floor(cltrP2.x), Math.floor(cltrP2.y))
        ];
    },

    drawBazierLine: function() {
        this.drawNode.clear();
        this.drawNode.lineWidth = 2;
        this.drawNode.strokeColor = cc.color(212, 252, 0);
        this.drawNode.fillColor = cc.color(255, 255, 255);

        this.drawNode.moveTo(this.pointsPos[0].x, this.pointsPos[0].y);
        this.drawNode.bezierCurveTo(
            this.pointsBezier[0].x, this.pointsBezier[0].y,
            this.pointsBezier[1].x, this.pointsBezier[1].y,
            this.pointsPos[1].x, this.pointsPos[1].y
        );
        this.drawNode.stroke();

        this.drawNode.circle(this.pointsBezier[0].x, this.pointsBezier[0].y, 10);
        this.drawNode.stroke();

        this.drawNode.circle(this.pointsBezier[1].x, this.pointsBezier[1].y, 10);
        this.drawNode.stroke();
    },

    init: function(choumaNode) {
        choumaNode.position = this.pointsPos[0];
    },

    spawnChouma: function() {
        var chouma = this.pool.get();
        if (!chouma) {
            chouma = cc.instantiate(this.chouma_tmpl);
        }
        return chouma;
    },

    onBtnMove: function () {
        var self = this;
        var node = this.spawnChouma();
        node.parent = this.chouma_parent;
        this.init(node);
        var bezier = [].concat(this.pointsBezier);
        bezier.push(this.pointsPos[1]);
        node.runAction(cc.sequence(
                cc.bezierTo(this.during, bezier).easing(cc.easeSineInOut()),
                cc.callFunc(function () {
                    self.pool.put(this);
                }.bind(node))
            )
        );
    },

    onBtnMoveAll: function() {
        var self = this;
        var rand = Math.floor(cc.random0To1() * (this.count_range[1] - this.count_range[0])) + this.count_range[0];
        console.log("count = ", rand);
        var bezier = [].concat(this.pointsBezier);
        bezier.push(this.pointsPos[1]);

        this.schedule(function () {
            var self = this;
            var node = this.spawnChouma();
            this.init(node);
            node.parent = this.chouma_parent;
            node.runAction(cc.sequence(
                    cc.bezierTo(this.during, bezier).easing(cc.easeSineInOut()),
                    cc.callFunc(function () {
                        self.pool.put(this);
                    }.bind(node))
                )
            );
        }.bind(this), 0.05, rand - 1, 0);
    },

    reuse: function(arg) {
        console.log("reuse chouma");
    },

    unuse: function () {
        console.log("unuse chouma");
    },
});
