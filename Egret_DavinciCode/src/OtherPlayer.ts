/**
 * Created by Lawrence on 15/11/7.
 */
class OtherPlayer extends egret.Sprite {
    public constructor(userName:string, cardList:Array<Card>) {
        this._userName = userName;
        this._cardList = cardList;
        super();
    }
    private _userName:string;
    private _cardList:Array<Card>;
    get userName():string {
        return this._userName;
    }
    get cardList():Array<Card> {
        return this._cardList;
    }
    public generateCardList() {
        for(var i = 0; i < this._cardList.length; i++) {
            var card:Card = this._cardList[i];
            card.x = i * 120;
            this.addChild(card);
        }
    }
    public addCard(card:Card) {
        this._cardList.push(card);
        card.x = this._cardList.length * 120;
        this.addChild(card);
    }
}