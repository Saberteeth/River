﻿var main;

window.onload = () => {
    main = new demo4.Main(<HTMLCanvasElement>$('#screen').get(0));
    setTimeout(() => {
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

module demo4 {

    class Animations {
        static TRANS: animations.Trans = new animations.Trans();
        static ALPHA: animations.Alpha = new animations.Alpha();
    }

    export class Main extends view.Activity {
        private _view: view.View;
       
        trans() {
            var endY = this.height / 2 - this._view.height / 2;
            var endX = this.width / 2 - this._view.width / 2;
            switch (this._view.top) {
                case 0:
                    Animations.TRANS.play(this._view,this._view.left, endX, this._view.top, endY, 1000);
                    break;
                default:
                    Animations.TRANS.play(this._view , endX, 0, endY, 0, 1000 );
                    break;
            }
            
        }

        alpha() {
            switch (this._view.alpha) {
                case 1:
                    Animations.ALPHA.play(this._view,1, 0.2, 1000);
                    break;
               default:
                    Animations.ALPHA.play(this._view,0.2, 1, 1000);
                    break;
            }
        }
       
        onCreate() {
            this._view = new view.View();
            this._view.width = this._view.height = 50;
            var img = new Image();
            img.src = 'res/img/move_press.png';
            this._view.setBackGround(img);
            this.addChild(this._view);
        }
    }
}