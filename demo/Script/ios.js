var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$(function () {
    var menu = new ios.Main($('#screen').get(0));
    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        $('canvas').attr('width', window.innerWidth);
        $('canvas').attr('height', window.innerWidth * 96 / 64);
    }
    menu.onCreate();
});
var ios;
(function (ios) {
    var AnimationUtils = (function () {
        function AnimationUtils() {
        }
        AnimationUtils.ALPHA = new animations.Alpha();
        AnimationUtils.TRANS = new animations.Trans();
        return AnimationUtils;
    }());
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        Main.prototype.loadSize = function () {
            this._m.height = (5 / 96) * this.height;
            this._btnSize = this.width * (12 / 64);
            this._m.width = this.width;
            this._cp.width = this.width;
            this._cp.height = this.height - this._m.height;
            this._cp.top = this._m.height;
        };
        Main.prototype.onCreate = function () {
            var _this = this;
            this._m = new Menu();
            this._cp = new ControlPanel();
            this.loadSize();
            this._move = new Move(this.width);
            this.addTimer(function (dt) {
                var d = new Date();
                var h = d.getHours();
                var hour = '';
                var minute = '';
                if (h < 10) {
                    hour = '0' + h;
                }
                else {
                    hour = h + '';
                }
                var m = d.getMinutes();
                if (m < 10) {
                    minute = '0' + m;
                }
                else {
                    minute = m + '';
                }
                var t = hour + ':' + minute;
                if (t != _this._m.time) {
                    _this._m.time = t;
                    _this._m.sUpdata();
                }
            });
            this.addChild(this._m);
            this.addChild(this._cp);
            this.addChild(this._move);
            var gh = new widget.Button();
            gh.height = gh.width = this._btnSize;
            gh.txt = '';
            gh._btn_bg.src = 'res/img/github.png';
            gh._btn_bg_press.src = 'res/img/github_press.png';
            gh.addClickEvent(function () {
                location.replace('https://github.com/ICE-FireofSong/River/');
            });
            var ol = new widget.Button();
            ol.txt = '';
            ol.height = ol.width = this._btnSize;
            ol._btn_bg.src = 'res/img/outlook.png';
            ol._btn_bg_press.src = 'res/img/outlook_press.png';
            ol.addClickEvent(function () {
                location.replace('https://login.live.com/');
            });
            var wow = new widget.Button();
            wow.txt = '';
            wow.height = wow.width = this._btnSize;
            wow._btn_bg.src = 'res/img/wow.png';
            wow._btn_bg_press.src = 'res/img/wow_press.png';
            wow.addClickEvent(function () {
                location.replace('http://wow.blizzard.cn/');
            });
            this._cp.installPro(gh);
            this._cp.installPro(ol);
            this._cp.installPro(wow);
            this._cp.upDataLayout();
        };
        return Main;
    }(view.Activity));
    ios.Main = Main;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = this;
            _super.call(this);
            this.time = '';
            this._ipen = new iPen(this.canvas);
            this.onDraw = function (ctx) {
                _this._ipen.readDraw('white', 1);
                ctx.fillStyle = 'white';
                ctx.font = ((24 / 640) * _this.width) + 'px SimHei';
                ctx.fillText(_this.time, _this.width / 2 - 25, _this.height / 2 + 5);
                _this._ipen.drawOver();
            };
        }
        return Menu;
    }(view.Container));
    var Move = (function (_super) {
        __extends(Move, _super);
        function Move(w) {
            var _this = this;
            _super.call(this);
            this.alpha = 0.5;
            this.height = this.width = (10 / 64) * w;
            this._bg = new Image();
            this._bg.src = 'res/img/move_press.png';
            this.setBackGround(this._bg);
            this._ipen = new iPen(this.canvas);
            this.addTouchEventListener(function (e) {
                switch (e.touchType) {
                    case view.View.DOWN:
                        AnimationUtils.ALPHA.over = null;
                        _this._offLeft = e.clientX - _this.left;
                        _this._offTop = e.clientY - _this.top;
                        _this._lastTime = new Date().getTime();
                        AnimationUtils.ALPHA.play(_this, 0.5, 1, 150);
                        break;
                    case view.View.MOVE:
                        var l = e.clientX - _this._offLeft;
                        var t = e.clientY - _this._offTop;
                        l = l < 0 ? 0 : l;
                        l = l + _this.width > _this.parent.width ? _this.parent.width - _this.width : l;
                        t = t < 0 ? 0 : t;
                        t = t + _this.height > _this.parent.height ? _this.parent.height - _this.height : t;
                        _this.left = l;
                        _this.top = t;
                        break;
                    case view.View.UP:
                        var now = new Date().getTime();
                        var off = now - _this._lastTime;
                        if (off < 150) {
                            _this.click();
                        }
                        else {
                            switch (_this.where(_this.left + _this.width / 2, _this.top + _this.height / 2)) {
                                case 'left':
                                    AnimationUtils.TRANS.play(_this, _this.left, 0, _this.top, _this.top, 100);
                                    break;
                                case 'right':
                                    AnimationUtils.TRANS.play(_this, _this.left, _this.parent.width - _this.width, _this.top, _this.top, 100);
                                    break;
                                case 'bottom':
                                    AnimationUtils.TRANS.play(_this, _this.left, _this.left, _this.top, _this.parent.height - _this.height, 100);
                                    break;
                                case 'top':
                                    AnimationUtils.TRANS.play(_this, _this.left, _this.left, _this.top, 0, 100);
                                    break;
                            }
                            AnimationUtils.ALPHA.play(_this, 1, 0.5, 150);
                        }
                        return false;
                }
                return true;
            });
        }
        Move.prototype.where = function (x, y) {
            var offx = this.parent.height / 2 - y;
            var offy = this.parent.width / 2 - x;
            var tb = offx > 0 ? 'top' : 'bottom';
            var lr = offy > 0 ? 'left' : 'right';
            return Math.abs(offx) < Math.abs(offy) ? lr : tb;
        };
        Move.prototype.click = function () {
            location.replace('ios.txt');
        };
        return Move;
    }(view.View));
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
            _super.call(this);
            var l = new widget.EasyLayout2(this);
            l.margin = this.width / 32;
            l.float = 'left';
            this.layout = l;
        }
        ControlPanel.prototype.installPro = function (p) {
            this.addChild(p);
        };
        return ControlPanel;
    }(view.Container));
})(ios || (ios = {}));
//# sourceMappingURL=ios.js.map