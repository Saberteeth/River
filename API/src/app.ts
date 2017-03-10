﻿window.onload = () => {
    var main = new demo.Main(<HTMLCanvasElement>$('#screen').get(0));
    setTimeout(() => {
        $('#loading').hide(0);
        main.onCreate();
    }, 2000);

    
};

module demo {
    class AnimationUtils {
        static ALPHA = new animations.Alpha();
        static TRANS = new animations.Trans();
    }

    export class Main extends view.Activity {
        private _move: view.View;
        onCreate() {
            this._move = new Move();
            this._move.left = this.width / 2 - this._move.width / 2;
            this._move.top = this.height / 2 - this._move.height / 2;
            this.addChild(this._move);
            AnimationUtils.ALPHA.play(this._move,0, 0.5, 1000);
        }
    }

    class Move extends view.View {
        private _bg: HTMLImageElement;
        private _offLeft: number;
        private _offTop: number;
        private _lastTime: number;
        private _num: number;
        private _ipen: iPen;

        where(x: number, y: number): string {
            var offx = this.parent.height / 2 - y; 
            var offy = this.parent.width / 2 - x;
            var tb =  offx > 0 ? 'top' : 'bottom';
            var lr = offy > 0 ? 'left' : 'right';
            return Math.abs(offx) < Math.abs(offy) ? lr : tb;
        }

        click() {
            
            switch (this._num) {
                case 0:
                    $('#msg').html('Ouch! You hurt me! Don\'t worry, I\'m OK. Let\'s we lean the next. Click me again.');
                    break;
                case 1:
                    $('#screen').css('border', '3px solid red');
                    $('#msg').html('This is my body, U use that control all action. Like show or move the picture. We call it \'Activity\'. U must be know an Activity be pair with a canvas! Next.');
                    break;
                case 2:
                    $('#screen').css('border', 'none');
                    this.onDraw = (ctx) => {
                        this._ipen.readDraw('red', 4);
                        ctx.rect(0, 0, this.width, this.height);
                        this._ipen.drawOver();
                    }
                    this.sUpdata();
                    $('#msg').html('Its name is \'View\'. A basic object be used to draw the picture. U can use it create button, window or other thing. ');
                    break;
                case 3:
                    this.onDraw = null;
                    this.removeEventListener('touch');
                    this.sUpdata();
                    $('#msg').html('Now! Today is here. See U.');
                    setTimeout(() => {
                        AnimationUtils.ALPHA.over = (v) => {
                            v.parent.removeChild(v);
                        } 
                        AnimationUtils.ALPHA.play(this,1, 0, 1700);
                    }, 300);
                    return;
            }

            this._num++;
            
        }

        constructor() {
            super();
            this._num = 0;
            this.alpha = 0;
            this.height = this.width = 50;
            this._bg = new Image();
            this._bg.src = 'res/img/move_press.png';
            this.setBackGround(this._bg);
            this._ipen = new iPen(this.canvas);

            this.addTouchEventListener((e: view.TouchEvent) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        AnimationUtils.ALPHA.over = null;
                        this._offLeft = e.clientX - this.left;
                        this._offTop = e.clientY - this.top;
                        this._lastTime = new Date().getTime();
                        AnimationUtils.ALPHA.play(this,0.5, 1, 150);
                        break;
                    case view.View.MOVE:
                        var l = e.clientX - this._offLeft;
                        var t = e.clientY - this._offTop;  
                        l = l < 0 ? 0 : l;
                        l = l + this.width > this.parent.width ? this.parent.width - this.width : l;

                        t = t < 0 ? 0 : t;
                        t = t + this.height > this.parent.height ? this.parent.height - this.height : t;

                        this.left = l;
                        this.top = t; 
                        break;
                    case view.View.UP:
                        var now = new Date().getTime();
                        var off = now - this._lastTime;
                        if (off < 150) {
                            this.click();
                        } else {
                            switch (this.where(this.left + this.width / 2, this.top + this.height / 2)) {
                                case 'left':
                                    AnimationUtils.TRANS.play(this, this.left, 0, this.top, this.top,100);
                                    break;
                                case 'right':
                                    AnimationUtils.TRANS.play(this, this.left, this.parent.width - this.width, this.top, this.top, 100);
                                    break;
                                case 'bottom':
                                    AnimationUtils.TRANS.play(this, this.left, this.left, this.top, this.parent.height - this.height, 100);
                                    break;
                                case 'top':
                                    AnimationUtils.TRANS.play(this, this.left, this.left, this.top, 0, 100);
                                    break;
                            }
                            AnimationUtils.ALPHA.play(this,1, 0.5, 150);
                        }
                        return false;
                }
                return true;
            });
        }
    }
}