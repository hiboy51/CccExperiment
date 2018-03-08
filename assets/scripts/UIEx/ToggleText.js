cc.Class({
    extends: cc.Component,

    properties: {
        toggle: cc.Toggle,
        text: cc.Node,

        isChecked: true,

        // 选中颜色
        selectedColor: new cc.Color(219, 252, 47),
        // 未选中颜色
        unselectedColor: new cc.Color(137, 204, 248),
    },

    start: function () {
        this.toggle.isChecked = this.isChecked;
        this._updateTextColor();
    },

    onToggleClicked: function (event) {
        this.isChecked = this.toggle.isChecked;
        this._updateTextColor();
    },

    onTextClicked: function (event) {
        this.toggle.isChecked = !this.toggle.isChecked;
        this.isChecked = this.toggle.isChecked;
        this._updateTextColor();
    },

    _updateTextColor: function () {
        const checked = this.toggle.isChecked;
        var color = checked ? this.selectedColor : this.unselectedColor;
        this.text.color = color;
//         var lblOutline = this.text.getComponent(cc.LabelOutline);
//         lblOutline && (lblOutline.color = color);
    }

});
