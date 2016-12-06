
$(() => {
    var menu = new ios.Main(<HTMLCanvasElement>$('#screen').get(0));

    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        $('canvas').attr('width', window.innerWidth);
        $('canvas').attr('height', window.innerWidth * 96 / 64);
    }

    menu.onCreate();
})

module ios {
    class AnimationUtils {
        static ALPHA = new animations.Alpha();
        static TRANS = new animations.Trans();
    }

    export class Main extends view.Activity{
        private _cp: ControlPanel;
        private _m: Menu;
        private _move: Move;
        private _btnSize: number;

        loadSize() {
            this._m.height = (5 / 96) * this.height;
            this._btnSize = this.width * (12 / 64);
            this._m.width = this.width;
            this._cp.width = this.width;
            this._cp.height = this.height - this._m.height;
            this._cp.top = this._m.height;
        }

        onCreate() {
            this._m = new Menu();
            this._cp = new ControlPanel();
            this.loadSize();
            this._move = new Move(this.width);

            this.addTimer((dt) => {
                var d = new Date();
                var h = d.getHours();
                var hour = '';
                var minute = '';
                if (h < 10) {
                    hour = '0' + h;
                } else {
                    hour = h+'';
                }

                var m = d.getMinutes();
                if (m < 10) {
                    minute = '0' + m;
                } else {
                    minute = m + '';
                }
                
                var t = hour + ':' + minute;
                
                if (t != this._m.time) {
                    this._m.time = t;
                    this._m.sUpdata();
                }
            })

          
            this.addChild(this._m);
            this.addChild(this._cp);
            this.addChild(this._move);

            var gh = new widget.Button();
            gh.height = gh.width = this._btnSize;
            gh.txt = '';
            gh._btn_bg.src = 'res/img/github.png';
            gh._btn_bg_press.src = 'res/img/github_press.png';
            gh.addClickEvent(() => {
                location.replace('https://github.com/Saberteeth/River/');
            })

            var ol = new widget.Button();
            ol.txt = '';
            ol.height = ol.width = this._btnSize;
            ol._btn_bg.src = 'res/img/outlook.png';
            ol._btn_bg_press.src = 'res/img/outlook_press.png';
            ol.addClickEvent(() => {
                location.replace('https://login.live.com/');
            })

            var wow = new widget.Button();
            wow.txt = '';
            wow.height = wow.width = this._btnSize;
            wow._btn_bg.src = 'res/img/wow.png';
            wow._btn_bg_press.src = 'res/img/wow_press.png';
            wow.addClickEvent(() => {
                location.replace('http://wow.blizzard.cn/');
            })
           
            this._cp.installPro(gh);
            this._cp.installPro(ol);
            this._cp.installPro(wow);
            this._cp.upDataLayout();
            
        }
    }

    class Menu extends view.Container {
        private _ipen: iPen;
        time: string ='';
        constructor() {
            super();
            this._ipen = new iPen(this.canvas);
            this.onDraw = (ctx) => {
                this._ipen.readDraw('white', 1);
                ctx.fillStyle = 'white';

                ctx.font = ((24 / 640) * this.width) + 'px SimHei';
                ctx.fillText(this.time, this.width / 2 - 25, this.height/2 + 5);
                this._ipen.drawOver();
                
            }
        }
    }

    class Move extends view.View {
        private _bg: HTMLImageElement;
        private _offLeft: number;
        private _offTop: number;
        private _lastTime: number;
        private _ipen: iPen;

        where(x: number, y: number): string {
            var offx = this.parent.height / 2 - y;
            var offy = this.parent.width / 2 - x;
            var tb = offx > 0 ? 'top' : 'bottom';
            var lr = offy > 0 ? 'left' : 'right';
            return Math.abs(offx) < Math.abs(offy) ? lr : tb;
        }

        click() {
            location.replace('ios.txt');
        }

        constructor(w: number) {
            super();
            this.alpha = 0.5;
            this.height = this.width = (10 / 64) * w;
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
                        AnimationUtils.ALPHA.play(this, 0.5, 1, 150);
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
                                    AnimationUtils.TRANS.play(this, this.left, 0, this.top, this.top, 100);
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
                            AnimationUtils.ALPHA.play(this, 1, 0.5, 150);
                        }
                        return false;
                }
                return true;
            });
        }
    }

    class ControlPanel extends view.Container {
        installPro(p: widget.Button) {
            this.addChild(p);
        }

        constructor() {
            super();
            var l: widget.EasyLayout2 = new widget.EasyLayout2(this);
            l.margin = this.width / 32;
            l.float = 'left';
            this.layout = l;
        }
    }
}