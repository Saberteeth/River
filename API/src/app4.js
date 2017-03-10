var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
window.onload = function () {
    main = new demo4.Main($('#screen').get(0));
    setTimeout(function () {
        $('#loading').hide(0);
        main.onCreate();
        b = true;
    }, 2000);
};
function trans() {
    main.trans();
}
function alpha() {
    main.alpha();
}
var demo4;
(function (demo4) {
    var Animations = (function () {
        function Animations() {
        }
        Animations.TRANS = new animations.Trans();
        Animations.ALPHA = new animations.Alpha();
        return Animations;
    }());
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        Main.prototype.trans = function () {
            var endY = this.height / 2 - this._view.height / 2;
            var endX = this.width / 2 - this._view.width / 2;
            switch (this._view.top) {
                case 0:
                    Animations.TRANS.play(this._view, this._view.left, endX, this._view.top, endY, 1000);
                    break;
                default:
                    Animations.TRANS.play(this._view, endX, 0, endY, 0, 1000);
                    break;
            }
        };
        Main.prototype.alpha = function () {
            switch (this._view.alpha) {
                case 1:
                    Animations.ALPHA.play(this._view, 1, 0.2, 1000);
                    break;
                default:
                    Animations.ALPHA.play(this._view, 0.2, 1, 1000);
                    break;
            }
        };
        Main.prototype.onCreate = function () {
            this._view = new view.View();
            this._view.width = this._view.height = 50;
            var img = new Image();
            img.src = 'res/img/move_press.png';
            this._view.setBackGround(img);
            this.addChild(this._view);
        };
        return Main;
    }(view.Activity));
    demo4.Main = Main;
})(demo4 || (demo4 = {}));
//# sourceMappingURL=app4.js.map