var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var main = new demo2.Main($('#screen').get(0));
    setTimeout(function () {
        $('#loading').hide(0);
        main.onCreate();
    }, 2000);
};
var demo2;
(function (demo2) {
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
            this._box = new Box();
            this._move = new Move(this);
            this._move.left = this.width / 2 - this._move.width / 2;
            this._move.top = this.height / 2 - this._move.height / 2;
            this.addChild(this._move);
            this.addChild(this._box);
        };
        return Main;
    }(view.Activity));
    demo2.Main = Main;
    var Move = (function (_super) {
        __extends(Move, _super);
        function Move(m) {
            var _this = this;
            _super.call(this);
            this._main = m;
            this.alpha = 0.8;
            this.height = this.width = 50;
            this._bg = new Image();
            this._bg.src = 'res/img/move_press.png';
            this.setBackGround(this._bg);
            this._ipen = new iPen(this.canvas);
            this.addTouchEventListener(function (e) {
                switch (e.touchType) {
                    case view.View.DOWN:
                        if (_this._main._box.inChildren) {
                            $('#msg').html('OK! Put me in box!');
                        }
                        AnimationUtils.ALPHA.over = null;
                        _this._offLeft = e.clientX - _this.left;
                        _this._offTop = e.clientY - _this.top;
                        _this._lastTime = new Date().getTime();
                        AnimationUtils.ALPHA.play(_this, 0.5, 1, 300);
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
                        if (_this.left > _this._main._box.left + 10 && _this.top > _this._main._box.top && _this.right < _this._main._box.right - 10 && _this.bottom < _this._main._box.bottom) {
                            _this.parent.removeChild(_this);
                            _this.left -= _this._main._box.left;
                            _this.top -= _this._main._box.top;
                            _this._main._box.addChild(_this);
                            _this._main._box.inChildren = false;
                            $('#msg').html('I\'m into box now! Move the box again!');
                            _this.removeEventListener('touch');
                        }
                        else {
                            var now = new Date().getTime();
                            var off = now - _this._lastTime;
                            if (off > 300) {
                                AnimationUtils.ALPHA.play(_this, 1, 0.5, 300);
                            }
                        }
                        return false;
                }
                return true;
            });
        }
        return Move;
    }(view.View));
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            var _this = this;
            _super.call(this);
            this.inChildren = true;
            this._ipen = new iPen(this.canvas);
            this.width = 100;
            this.height = 100;
            this.alpha = 0.5;
            this.addTouchEventListener(function (e) {
                switch (e.touchType) {
                    case view.View.DOWN:
                        if (!_this.inChildren) {
                            _this.inChildren = true;
                            $('#msg').html('The box we call it \'Container\', It\'s extend to view.View and implements iContainer. A Container can has children just like view.Activity. Bye. Have fun!');
                        }
                        _this._offLeft = e.clientX - _this.left;
                        _this._offTop = e.clientY - _this.top;
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
                        return false;
                }
                return true;
            });
            this.onDraw = function (ctx) {
                _this._ipen.readDraw('black', 1);
                ctx.fillStyle = 'gray';
                ctx.fillRect(0, 0, _this.width, _this.height);
                ctx.fillStyle = 'black';
                ctx.fillRect(10, 10, _this.width - 20, _this.height - 20);
                _this._ipen.drawOver();
            };
        }
        return Box;
    }(view.Container));
})(demo2 || (demo2 = {}));
//# sourceMappingURL=app2.js.map