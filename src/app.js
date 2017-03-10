var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var main = new demo.Main($('#screen').get(0));
    setTimeout(function () {
        $('#loading').hide(0);
        main.onCreate();
    }, 2000);
};
var demo;
(function (demo) {
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
        Main.prototype.onCreate = function () {
            this._move = new Move();
            this._move.left = this.width / 2 - this._move.width / 2;
            this._move.top = this.height / 2 - this._move.height / 2;
            this.addChild(this._move);
            AnimationUtils.ALPHA.play(this._move, 0, 0.5, 1000);
        };
        return Main;
    }(view.Activity));
    demo.Main = Main;
    var Move = (function (_super) {
        __extends(Move, _super);
        function Move() {
            var _this = this;
            _super.call(this);
            this._num = 0;
            this.alpha = 0;
            this.height = this.width = 50;
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
            var _this = this;
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
                    this.onDraw = function (ctx) {
                        _this._ipen.readDraw('red', 4);
                        ctx.rect(0, 0, _this.width, _this.height);
                        _this._ipen.drawOver();
                    };
                    this.sUpdata();
                    $('#msg').html('Its name is \'View\'. A basic object be used to draw the picture. U can use it create button, window or other thing. ');
                    break;
                case 3:
                    this.onDraw = null;
                    this.removeEventListener('touch');
                    this.sUpdata();
                    $('#msg').html('Now! Today is here. See U.');
                    setTimeout(function () {
                        AnimationUtils.ALPHA.over = function (v) {
                            v.parent.removeChild(v);
                        };
                        AnimationUtils.ALPHA.play(_this, 1, 0, 1700);
                    }, 300);
                    return;
            }
            this._num++;
        };
        return Move;
    }(view.View));
})(demo || (demo = {}));
//# sourceMappingURL=app.js.map