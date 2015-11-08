/**
 * Created by Lawrence on 15/11/8.
 */
var CardApply = (function (_super) {
    __extends(CardApply, _super);
    function CardApply() {
        _super.call(this);
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, 60, 30);
        this.graphics.endFill();
    }
    var d = __define,c=CardApply;p=c.prototype;
    return CardApply;
})(egret.Sprite);
egret.registerClass(CardApply,"CardApply");
