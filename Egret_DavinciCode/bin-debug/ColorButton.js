/**
 * Created by Lawrence on 15/11/8.
 */
var ColorButton = (function (_super) {
    __extends(ColorButton, _super);
    function ColorButton(colorIndex) {
        _super.call(this);
        this._color = colorIndex;
        if (colorIndex == 0) {
            this.graphics.beginFill(0x000000);
        }
        else {
            this.graphics.beginFill(0xffffff);
        }
        this.graphics.drawRect(0, 0, 100, 60);
        this.graphics.endFill();
        this.touchEnabled = true;
        //this.draw();
    }
    var d = __define,c=ColorButton;p=c.prototype;
    p.draw = function () {
        var textField = new egret.TextField();
        textField.width = 100;
        textField.height = 60;
        textField.textAlign = egret.HorizontalAlign.CENTER;
        textField.textColor = this._color == 0 ? 0xffffff : 0x000000;
        textField.text = this._color == 0 ? 'Black' : 'White';
        this.addChild(textField);
    };
    d(p, "color"
        ,function () {
            return this._color;
        }
    );
    return ColorButton;
})(egret.Sprite);
egret.registerClass(ColorButton,"ColorButton");
