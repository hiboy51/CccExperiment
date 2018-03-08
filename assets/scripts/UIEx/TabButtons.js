var TabButtonItem = cc.Class({
    name: "TabButtonItem",
    properties: {
        view: cc.Node,
        selected: cc.Node,
        unselected: cc.Node,
        checked: false,
        flag: ""
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        buttons: {
            default: [],
            type: TabButtonItem
        },

        handler: cc.Component.EventHandler
    },

    // use this for initialization
    onLoad: function () {
        if (this.buttons.length === 0) {
            return;
        }

        var checkedId = 0;
        for (var i = 0; i < this.buttons.length; ++i) {
            var each = this.buttons[i];

            if (each.checked) {
                checkedId = i;
            }

            var node = each.view;
            node.addComponent(cc.Button);
            var bb = this._getNodeBoundingBox(node);
            node.setContentSize(bb.size);

            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "TabButtons";
            eventHandler.handler = "onBtnClick";

            node.getComponent(cc.Button).clickEvents.push(eventHandler);
        }

        this._refreshView(this.buttons[checkedId].view, true);
    },

    onBtnClick: function (event, customData) {
        var targetView = event.target;
        this._refreshView(targetView);
    },

    // //////////////////////////////////////////////////////////////////////////////////////////////
    // private methods
    // //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *  @param targetView   button所在节点
     *  @param init         组件刚加载并初始化时需要触发回调
     */
    _refreshView: function (targetView, init) {
        var targetItem = null;
        var willCb = false;
        this.buttons.forEach((each)=>{
            var view = each.view;
            if (targetView === view) {
                targetItem = each;
            }

            if (targetView === view) {
                willCb = !!init || !each.checked;
                each.selected.active = true;
                each.unselected.active = false;
                each.checked = true;
            }
            else {
                each.selected.active = false;
                each.unselected.active = true;
                each.checked = false;
            }
        });

        if (this.handler && targetItem !== null && willCb) {
            this.handler.emit([targetItem.flag]);
        }
    },

    _getNodeBoundingBox: function (node) {
        var children = node.children;
        var thisBb = node.getBoundingBoxToWorld();

        if (children.length === 0) {
            return thisBb;
        }

        var mergeBox = function (a, b) {
            var minx = Math.min(a.xMin, b.xMin);
            var miny = Math.min(a.yMin, b.yMin);
            var maxx = Math.max(a.xMax, b.xMax);
            var maxy = Math.max(a.yMax, b.yMax);

            return cc.rect(minx, miny, maxx - minx, maxy - miny);
        };

        var resultBB = thisBb;
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            var bb = this._getNodeBoundingBox(child);

            resultBB = mergeBox(resultBB, bb);
        }

        return resultBB;
    }
});
