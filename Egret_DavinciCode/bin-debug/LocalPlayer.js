/**
 * Created by Lawrence on 15/11/7.
 */
var LocalPlayer = (function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer() {
        _super.call(this);
        this._cardList = new Array();
    }
    var d = __define,c=LocalPlayer;p=c.prototype;
    d(p, "userName"
        ,function () {
            return this._userName;
        }
        ,function (value) {
            this._userName = value;
        }
    );
    d(p, "cardList"
        ,function () {
            return this._cardList;
        }
        ,function (value) {
            this._cardList = value;
        }
    );
    p.generateCardList = function (card) {
        if (card == null) {
            for (var i = 0; i < this._cardList.length; i++) {
                var card = this._cardList[i];
                card.x = i * 120;
                this.addChild(card);
            }
        }
        else {
            this._cardList.push(card); //temp process
            card.x = this._cardList.length * 120;
            this.addChild(card);
        }
    };
    return LocalPlayer;
})(egret.Sprite);
egret.registerClass(LocalPlayer,"LocalPlayer");
