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

import Logger = egret.Logger;
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private socket:egret.WebSocket;
    private message:string = "hello world";
    private cardList:Array<Card>;
    private localPlayer:LocalPlayer;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.init();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
       //RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    }
    private createGameScene() {
        var background:egret.Shape = new egret.Shape;
        background.graphics.beginFill(0x123456);
        background.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        background.graphics.endFill();
        this.addChild(background);
    }
    private init() {
        this.createGameScene();
    //    this.draw();
        this.cardList = new Array<Card>();
        this.localPlayer = new LocalPlayer("Lawrence");
        this.socket = new egret.WebSocket();
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.connectByUrl("ws://192.168.1.108:8888/" + this.localPlayer.userName);
    }
    private onReceiveMessage() {
        var message = this.socket.readUTF();
        var json = JSON.parse(message);
        console.log(json);
        for(var i = 0; i < 3; i++) {
            var card = new Card(json[i][0], json[i][1]);
            card.x = 150 * i;
            this.addChild(card);
            this.cardList.push(card);
        }
    }
    private onSocketOpen() {
        this.socket.writeUTF(this.localPlayer.userName);
        console.log("Server Connected");
    }
}


