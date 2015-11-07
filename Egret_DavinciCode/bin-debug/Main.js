//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Logger = egret.Logger;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.message = "hello world";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main;p=c.prototype;
    p.onAddToStage = function (event) {
        this.init();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    };
    p.createGameScene = function () {
        var background = new egret.Shape;
        background.graphics.beginFill(0x123456);
        background.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        background.graphics.endFill();
        this.addChild(background);
    };
    p.init = function () {
        this.createGameScene();
        //    this.draw();
        this.cardList = new Array();
        this.localPlayer = new LocalPlayer("Lawrence");
        this.socket = new egret.WebSocket();
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.connectByUrl("ws://192.168.1.108:8888/" + this.localPlayer.userName);
    };
    p.onReceiveMessage = function () {
        var message = this.socket.readUTF();
        var json = JSON.parse(message);
        console.log(json);
        for (var i = 0; i < 3; i++) {
            var card = new Card(json[i][0], json[i][1]);
            card.x = 150 * i;
            this.addChild(card);
            this.cardList.push(card);
        }
    };
    p.onSocketOpen = function () {
        this.socket.writeUTF(this.localPlayer.userName);
        console.log("Server Connected");
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,"Main");
