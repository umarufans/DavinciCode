var TextFieldType = egret.TextFieldType;
/**
 * Created by Lawrence on 15/11/7.
 */
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(num, statusIndex, drawStatus) {
        _super.call(this);
        var index = num;
        this.text = new egret.TextField();
        if (index % 2) {
            this._color = CardStatus.color[1];
            this.colorValue = 0xffffff;
            this.text.textColor = 0x000000;
            this._colorIndex = 1;
        }
        else {
            this._color = CardStatus.color[0];
            this.colorValue = 0x000000;
            this.text.textColor = 0xffffff;
            this._colorIndex = 0;
        }
        this.status = CardStatus.status[statusIndex];
        this._num = Math.floor(index / 2);
        this.draw(drawStatus);
    }
    var d = __define,c=Card;p=c.prototype;
    p.draw = function (status) {
        this.graphics.beginFill(this.colorValue);
        this.graphics.drawRect(0, 0, 100, 160);
        this.graphics.endFill();
        this.text.width = 100;
        this.text.height = 160;
        this.text.size = 48;
        this.text.textAlign = HorizontalAlign.CENTER;
        this.text.verticalAlign = VerticalAlign.MIDDLE;
        if (status == 0) {
            this.text.text = "";
        }
        else {
            if (this._num <= 11) {
                this.text.text = this._num + '';
            }
            else {
                this.text.text = '-';
            }
        }
        this.addChild(this.text);
    };
    d(p, "num"
        ,function () {
            return this._num;
        }
    );
    d(p, "colorIndex"
        ,function () {
            return this._colorIndex;
        }
    );
    p.toString = function () {
        return this._color + this.status + this._num;
    };
    return Card;
})(egret.Sprite);
egret.registerClass(Card,"Card");
