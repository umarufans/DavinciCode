/**
 * Created by Lawrence on 15/11/7.
 */
var OtherPlayer = (function (_super) {
    __extends(OtherPlayer, _super);
    function OtherPlayer(userName, cardList) {
        this._userName = userName;
        this._cardList = cardList;
        _super.call(this);
    }
    var d = __define,c=OtherPlayer;p=c.prototype;
    d(p, "userName"
        ,function () {
            return this._userName;
        }
    );
    d(p, "cardList"
        ,function () {
            return this._cardList;
        }
    );
    p.generateCardList = function () {
        for (var i = 0; i < this._cardList.length; i++) {
            var card = this._cardList[i];
            card.x = i * 120;
            this.addChild(card);
        }
    };
    p.addCard = function (card) {
        this._cardList.push(card);
        card.x = this._cardList.length * 120;
        this.addChild(card);
    };
    return OtherPlayer;
})(egret.Sprite);
egret.registerClass(OtherPlayer,"OtherPlayer");
