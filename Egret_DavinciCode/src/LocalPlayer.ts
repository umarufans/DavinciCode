/**
 * Created by Lawrence on 15/11/7.
 */
class LocalPlayer extends egret.Sprite {
    public constructor(userName:string) {
        super();
        this._userName = userName;
    }
    private _userName:string;
    get userName():string {
        return this._userName;
    }
    set userName(value:string) {
        this._userName = value;
    }

    public changeState() {

    }
}