/**
 * Created by Lawrence on 15/11/7.
 */
class Card extends egret.Sprite {
    public constructor(num:number, statusIndex:number) {
        super();
        var index:number = num;
        if(index % 2) {
            this.color = CardStatus.color[1];
        } else {
            this.color = CardStatus.color[0];
        }
        this.status = CardStatus.status[statusIndex];
        this.num = Math.floor(index/2);
        this.draw();
    }
    private color:string;
    private status:string;
    private num:number;
    private draw() {
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(0, 0, 100, 160);
        this.graphics.endFill();
        var text:egret.TextField = new egret.TextField();
        text.text = this.color + this.status + this.num;
        this.addChild(text);
    }
}