var main;
var b = false;
window.onload = () => {
    main = new demo3.Main(<HTMLCanvasElement>$('#screen').get(0));
    setTimeout(() => {
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

module demo3 {

    export class Main extends view.Activity {

        layout1() {
            this.layout = new widget.EasyLayout(this);
            this.upDataLayout();
        }

        layout2() {
            this.layout = new widget.EasyLayout2(this);
            this.upDataLayout();
        }
       
        onCreate() {
            
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

        }
    }
}