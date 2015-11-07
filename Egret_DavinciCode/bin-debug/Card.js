/**
 * Created by Lawrence on 15/11/7.
 */
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(num, statusIndex) {
        _super.call(this);
        var index = num;
        if (index % 2) {
            this.color = CardStatus.color[1];
        }
        else {
            this.color = CardStatus.color[0];
        }
        this.status = CardStatus.status[statusIndex];
        this.num = Math.floor(index / 2);
        this.draw();
    }
    var d = __define,c=Card;p=c.prototype;
    p.draw = function () {
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(0, 0, 100, 160);
        this.graphics.endFill();
        var text = new egret.TextField();
        text.text = this.color + this.status + this.num;
        this.addChild(text);
    };
    return Card;
})(egret.Sprite);
egret.registerClass(Card,"Card");
