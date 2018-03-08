/**
 * Created by Kinnon.Zhang on 2017/7/25.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        doubleClickCheckInterval: 0.5,
        dragMinDistanceCheck: 10,

        onClick: {
            tooltip: "单击事件回调",
            default: null,
            type: cc.Component.EventHandler,
        },

        onDoubleClick: {
            tooltip: "双击事件回调",
            default: null,
            type: cc.Component.EventHandler,
        },

        onDragging: {
            tooltip: "拖动事件回调",
            default: null,
            type: cc.Component.EventHandler,
        },

        onDragEnd: {
            tooltip: "拖动结束的回调",
            default: null,
            type: cc.Component.EventHandler,
        }
    },

    // //////////////////////////////////////////////////////////////////////////////////////////////
    // life cycle
    // //////////////////////////////////////////////////////////////////////////////////////////////
    onLoad: function() {
        this.scheduleCopy = null;

        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
    },

    onDestroy: function() {
        this.node.targetOff(this);
    },

    // //////////////////////////////////////////////////////////////////////////////////////////////
    // private interface
    // //////////////////////////////////////////////////////////////////////////////////////////////
    _onTouchBegin: function(event) {
        this.isMoving = false;
    },

    _onTouchMove: function(event) {
        var delta = event.getDelta();
        var mag = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        if (mag < this.dragMinDistanceCheck) {
            return;
        }

        this.isMoving = true;
        if (this.onDragging) {
            var param = [
                this.node,
                event.getStartLocation(),
                event.getLocation(),
                delta
            ];
            this.onDragging.emit(param);
        }
    },

    _onTouchEnd: function(event) {
        // 处理拖动结束
        var clickPos = event.getLocation();
        var startPos = event.getStartLocation();

        if (this.isMoving) {
            this.isMoving = false;
            if (this.onDragEnd) {
                var param = [
                    this.node,
                    startPos,
                    clickPos
                ];
                this.onDragEnd.emit(param);
            }
            return;
        }

        // 判断是触发双击还是单击事件
        this.unschedule(this.scheduleCopy);
        var self = this;
        var onDoubleClickCheckEnd = function () {
            self.checkDbClick = false;
            if (self.onClick) {
                var param = [
                    self.node,
                    clickPos
                ];
                self.onClick.emit(param);
            }
        };
        if (this.checkDbClick) {
            this.checkDbClick = false;
            if (this.onDoubleClick) {
                var param = [this.node, clickPos];
                this.onDoubleClick.emit(param);
            }
            return;
        }
        this.checkDbClick = true;
        this.scheduleOnce(onDoubleClickCheckEnd, this.doubleClickCheckInterval);
        this.scheduleCopy = onDoubleClickCheckEnd;
    },
});
