var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
var b = false;
window.onload = function () {
    main = new demo3.Main($('#screen').get(0));
    setTimeout(function () {
        $('#loading').hide(0);
        main.onCreate();
        b = true;
    }, 2000);
};
function layout1() {
    if (b) {
        main.layout1();
    }
}
function layout2() {
    if (b) {
        main.layout2();
    }
}
var demo3;
(function (demo3) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.apply(this, arguments);
        }
        Main.prototype.layout1 = function () {
            this.layout = new widget.EasyLayout(this);
            this.upDataLayout();
        };
        Main.prototype.layout2 = function () {
            this.layout = new widget.EasyLayout2(this);
            this.upDataLayout();
        };
        Main.prototype.onCreate = function () {
            for (var i = 0; i < 5; i++) {
                var btn = new widget.Button();
                btn._btn_bg.src = 'res/img/btn.png';
                btn._btn_bg_press.src = 'res/img/btn_press.png';
                btn.txt = i + '';
                btn.txtColor = 'white';
                btn.left = Math.random() * (this.width - btn.width);
                btn.top = Math.random() * (this.height - btn.height);
                this.addChild(btn);
            }
        };
        return Main;
    }(view.Activity));
    demo3.Main = Main;
})(demo3 || (demo3 = {}));
//# sourceMappingURL=app3.js.map