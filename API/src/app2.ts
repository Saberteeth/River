window.onload = () => {
    var main = new demo2.Main(<HTMLCanvasElement>$('#screen').get(0));
    setTimeout(() => {
        $('#loading').hide(0);
        main.onCreate();
    }, 2000);
};

module demo2 {
    class AnimationUtils {
        static ALPHA = new animations.Alpha();
        static TRANS = new animations.Trans();
    }

    export class Main extends view.Activity {
        _box: Box;
        private _move: Move;
        onCreate() {
            this._box = new Box();
            this._move = new Move(this);
            this._move.left = this.width / 2 - this._move.width / 2;
            this._move.top = this.height / 2 - this._move.height / 2;
            this.addChild(this._move);
            this.addChild(this._box);
        }
    }

    class Move extends view.View {
        private _bg: HTMLImageElement;
        private _offLeft: number;
        private _offTop: number;
        private _lastTime: number;
        private _ipen: iPen;
        private _main: Main
        constructor(m: Main) {
            super();
            this._main = m;
            this.alpha = 0.8;
            this.height = this.width = 50;
            this._bg = new Image();
            this._bg.src = 'res/img/move_press.png';
            this.setBackGround(this._bg);
            this._ipen = new iPen(this.canvas);

            this.addTouchEventListener((e: view.TouchEvent) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        if (this._main._box.inChildren) {
                            $('#msg').html('OK! Put me in box!');
                        }

                        AnimationUtils.ALPHA.over = null;
                        this._offLeft = e.clientX - this.left;
                        this._offTop = e.clientY - this.top;
                        this._lastTime = new Date().getTime();
                        AnimationUtils.ALPHA.play(this, 0.5, 1, 300);
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
                        if (this.left > this._main._box.left + 10 && this.top > this._main._box.top && this.right < this._main._box.right - 10 && this.bottom < this._main._box.bottom) {
                            this.parent.removeChild(this);
                            this.left -= this._main._box.left; this.top -= this._main._box.top;
                            this._main._box.addChild(this);
                            this._main._box.inChildren = false;
                            $('#msg').html('I\'m into box now! Move the box again!');
                            this.removeEventListener('touch');
                        } else {
                            var now = new Date().getTime();
                            var off = now - this._lastTime;
                            if (off > 300) {
                                AnimationUtils.ALPHA.play(this,1, 0.5, 300 );
                            }
                        }
                        return false;
                }
                return true;
            });
        }
    }

    class Box extends view.Container {
        private _ipen; iPen;
        private _offLeft: number;
        private _offTop: number;
        inChildren = true;
        constructor() {
            super();
            this._ipen = new iPen(this.canvas);
            this.width = 100;
            this.height = 100
            this.alpha = 0.5;

            this.addTouchEventListener((e: view.TouchEvent) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        if (!this.inChildren) {
                            this.inChildren = true;
                            $('#msg').html('The box we call it \'Container\', It\'s extend to view.View and implements iContainer. A Container can has children just like view.Activity. Bye. Have fun!');
                        }

                        this._offLeft = e.clientX - this.left;
                        this._offTop = e.clientY - this.top;
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
                        return false;
                }
                return true;
            });

            this.onDraw = (ctx) => {
                this._ipen.readDraw('black', 1);
                ctx.fillStyle = 'gray';
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.fillStyle = 'black';
                ctx.fillRect(10, 10, this.width - 20, this.height - 20);
                this._ipen.drawOver();
            }
        }
    }



}