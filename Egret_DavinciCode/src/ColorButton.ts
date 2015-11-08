/**
 * Created by Lawrence on 15/11/8.
 */
class ColorButton extends egret.Sprite {
    public constructor(colorIndex:number) {
        super();
        this._color = colorIndex;
        if(colorIndex == 0) {
            this.graphics.beginFill(0x000000);
        } else {
            this.graphics.beginFill(0xffffff);
        }
        this.graphics.drawRect(0, 0, 100 ,60);
        this.graphics.endFill();
        this.touchEnabled = true;
        //this.draw();
    }
    private _color:number;
    private draw() {
        var textField:egret.TextField = new egret.TextField();
        textField.width = 100;
        textField.height = 60;
        textField.textAlign = egret.HorizontalAlign.CENTER;
        textField.textColor = this._color == 0 ? 0xffffff : 0x000000;
        textField.text = this._color == 0 ? 'Black' : 'White';
        this.addChild(textField);
    }
    get color():number {
        return this._color;
    }
}