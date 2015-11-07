/**
 * Created by Lawrence on 15/11/7.
 */
var LocalPlayer = (function (_super) {
    __extends(LocalPlayer, _super);
    function LocalPlayer(userName) {
        _super.call(this);
        this._userName = userName;
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
    p.changeState = function () {
    };
    return LocalPlayer;
})(egret.Sprite);
egret.registerClass(LocalPlayer,"LocalPlayer");
