/**
 * Created by Kinnon.Zhang on 2017/7/25.
 */

cc.Class({
    extends: cc.Component,
    /**
     * @param:
     *  [ node, position ]
     * */
    handleClick: function (node, position) {
        console.log("Click Occurs, position: ", position.x," ", position.y);
    },

    /**
     * @param:
     *  [ node, position ]
     * */
    handleDoubleClick: function (node, position) {
        console.log("Double Click Occurs, position: ", position.x," ", position.y);
    },

    /**
     * @param:
     *  [ node, startLocation, curLocation, deltaStep ]
     *
     * */
    handleDragging: function (node, startPos, curPos, deltaStep) {
        console.log("Dragging....., current pos: ", curPos.x," ", curPos.y);
    },

    /**
     * @param:
     *  [ node, startLocation, curLocation ]
     * */
    handleDragEnd: function (node, startPos, curPos) {
        console.log("Dragging Stopped start: ", startPos.x, " ", startPos.y, " end: ", curPos.x, " ", curPos.y);
    }
});