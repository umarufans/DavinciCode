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
var Player = egret.sys.Player;
var TextField = egret.TextField;
var HorizontalAlign = egret.HorizontalAlign;
var VerticalAlign = egret.VerticalAlign;
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
        this.playerList = new Array();
        this.othersCardLists = new Array();
        this.localPlayer = new LocalPlayer();
        this.localPlayer.userName = '';
        this.createGameScene();
        this.draw();
        //this.addChild(new Card(1, 1));
    };
    p.onReceiveMessage = function () {
        var message = this.socket.readUTF();
        console.log(message);
        var json = JSON.parse(message);
        if (this.connectStatus == 1) {
            this.removeChild(this.textField);
            for (var i = 0; i < json.length; i++) {
                this.playerList.push(json[i]);
            }
            for (var i = 0; i < this.playerList.length; i++) {
            }
            this.connectStatus = 0;
        }
        else {
            //alert("Length:" + this.playerList.length);
            var localName = this.localPlayer.userName;
            var statusCode = json['msg'];
            console.log("status code: " + statusCode);
            var cardList;
            if (statusCode == 0) {
                for (var i = 0; i < this.playerList.length; i++) {
                    var name = this.playerList[i];
                    if (name == localName) {
                        cardList = new Array();
                        var local = json[name];
                        for (var j = 0; j < local.length; j++) {
                            cardList.push(new Card(local[j][0], local[j][1], 1));
                            this.localPlayer.cardList = cardList;
                            this.localPlayer.generateCardList(null);
                            this.localPlayer.y = this.stage.stageHeight - 170;
                            this.addChild(this.localPlayer);
                        }
                    }
                    else {
                        cardList = new Array();
                        var remote = json[name];
                        for (var j = 0; j < remote.length; j++) {
                            cardList.push(new Card(remote[j][0], remote[j][1], 0));
                        }
                        this.othersCardLists.push(new OtherPlayer(name, cardList));
                        for (var j = 0; j < this.othersCardLists.length; j++) {
                            this.othersCardLists[j].generateCardList();
                            this.othersCardLists[j].y = 170 * j;
                            this.addChild(this.othersCardLists[j]);
                        }
                    }
                }
            }
            if (statusCode == 1) {
                this._operatorName = json['name'];
                console.log(this._operatorName);
                if (localName == this._operatorName) {
                    //this.socket.writeUTF('["' + name + '", ' + 1 + ']');
                    this.generateSelector();
                }
            }
            if (statusCode == 3) {
                console.log("Operator Name: " + this._operatorName);
                var info = json['info'];
                //alert("It Works!");
                if (this.localPlayer.userName == this._operatorName) {
                    var card = new Card(info[0], info[1], 1);
                    this.localPlayer.generateCardList(card);
                    console.log("Added!");
                }
                else {
                    for (var k = 0; k < this.othersCardLists.length; k++) {
                        if (this.othersCardLists[k].userName == this._operatorName) {
                            console.log("Added!");
                            this.othersCardLists[k].addCard(new Card(info[0], info[1], 0));
                        }
                    }
                }
            }
        }
        //console.log(json);
    };
    p.onSocketOpen = function () {
        //this.socket.writeUTF(this.localPlayer.userName);
        console.log("Server Connected");
    };
    p.draw = function () {
        this.textField = new TextField();
        this.textField.width = 200;
        this.textField.height = 100;
        this.textField.x = (this.stage.stageWidth - this.textField.width) / 2;
        this.textField.y = (this.stage.stageHeight - this.textField.height) / 2;
        this.textField.background = true;
        this.textField.backgroundColor = 0xffffff;
        this.textField.textColor = 0x000000;
        this.textField.textAlign = HorizontalAlign.CENTER;
        this.textField.textAlign = VerticalAlign.MIDDLE;
        this.textField.type = egret.TextFieldType.INPUT;
        this.textField.addEventListener(egret.Event.FOCUS_OUT, this.setConnection, this);
        this.addChild(this.textField);
    };
    p.setConnection = function () {
        this.localPlayer.userName = this.textField.text;
        console.log(this.textField.text);
        this.textField.backgroundColor = 0x123456;
        this.textField.type = egret.TextFieldType.DYNAMIC;
        this.textField.textColor = 0xffffff;
        this.textField.text = "Waiting for other players..";
        //this.removeChild(this.textField);
        this.establishConnection();
    };
    p.establishConnection = function () {
        this.connectStatus = 1;
        this.socket = new egret.WebSocket();
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.connectByUrl("ws://127.0.0.1:8888/" + this.localPlayer.userName);
    };
    p.generateSelector = function () {
        console.log("Generate Selector.");
        this.selector = new egret.Sprite();
        this.selector.graphics.beginFill(0x000000);
        this.selector.graphics.drawRect(0, 0, 200, 60);
        this.selector.graphics.endFill();
        var black = new ColorButton(0);
        var white = new ColorButton(1);
        white.x = 100;
        black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseBlack, this);
        white.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseWhite, this);
        this.selector.addChild(white);
        this.selector.addChild(black);
        this.selector.x = this.stage.stageWidth - 300;
        this.selector.y = this.stage.stageHeight - 200;
        this.selector.touchEnabled = true;
        this.addChild(this.selector);
    };
    p.chooseBlack = function () {
        var jsonLine = '["' + this.localPlayer.userName + '", ' + 1 + ', ' + 0 + ']';
        console.log(jsonLine);
        this.socket.writeUTF(jsonLine);
        this.removeChild(this.selector);
    };
    p.chooseWhite = function () {
        var jsonLine = '["' + this.localPlayer.userName + '", ' + 1 + ',' + 1 + ']';
        this.socket.writeUTF(jsonLine);
        this.removeChild(this.selector);
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,"Main");
