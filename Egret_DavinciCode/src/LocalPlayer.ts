/**
 * Created by Lawrence on 15/11/7.
 */
class LocalPlayer extends egret.Sprite {
    public constructor() {
        super();
        this._cardList = new Array<Card>();
    }
    private _userName:string;
    private _insertIndex:number;
    private _cardList:Array<Card>;
    set userName(value:string) {
        this._userName = value;
    }
    get userName():string {
        return this._userName;
    }
    get cardList():Array<Card> {
        return this._cardList;
    }

    set cardList(value:Array<Card>) {
        this._cardList = value;
    }
    public generateCardList(card:Card) {
        if(card == null) {
            for(var i = 0; i < this._cardList.length; i++) {
                var card:Card = this._cardList[i];
                card.x = i * 120;
                this.addChild(card);
            }
        } else {
            this._cardList.push(card); //temp process
            card.x = this._cardList.length * 120;
            this.addChild(card);
            //if(card.num == 12) {
            //    //Select the position.
            //} else {
            //   for(var i = 0; i < this._cardList.length - 1; i++) {
            //       if(this._cardList[i].num > card.num || (this._cardList[i].num == card.num && this._cardList[i].colorIndex > card.colorIndex)) {
            //       }
            //   }
            //}
        }
    }
}