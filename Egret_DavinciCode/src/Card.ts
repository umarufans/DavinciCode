import TextFieldType = egret.TextFieldType;
/**
 * Created by Lawrence on 15/11/7.
 */
class Card extends egret.Sprite {
    public constructor(num:number, statusIndex:number, drawStatus:number) {
        super();
        var index:number = num;
        this.text = new egret.TextField();
        if(index % 2) {
            this._color = CardStatus.color[1];
            this.colorValue = 0xffffff;
            this.text.textColor = 0x000000;
            this._colorIndex = 1;
        } else {
            this._color = CardStatus.color[0];
            this.colorValue = 0x000000;
            this.text.textColor = 0xffffff;
            this._colorIndex = 0;
        }
        this.status = CardStatus.status[statusIndex];
        this._num = Math.floor(index/2);
        this.draw(drawStatus);
    }
    private _color:string;
    private status:string;
    private _num:number;
    private colorValue:number;
    private _colorIndex:number;
    private text:egret.TextField;
    private draw(status:number) {
        this.graphics.beginFill(this.colorValue);
        this.graphics.drawRect(0, 0, 100, 160);
        this.graphics.endFill();
        this.text.width = 100;
        this.text.height = 160;
        this.text.size = 48;
        this.text.textAlign = HorizontalAlign.CENTER;
        this.text.verticalAlign = VerticalAlign.MIDDLE;
        if(status == 0) {
            this.text.text = "";
        } else {
            if(this._num <= 11) {
                this.text.text = this._num + '';
            } else {
                this.text.text = '-';
            }
        }
        this.addChild(this.text);
    }
    get num():number {
        return this._num;
    }
    get colorIndex():number {
        return this._colorIndex;
    }

    public toString() {
        return this._color + this.status + this._num;
    }
}