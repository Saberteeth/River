
import * as River from '../lib';
import iAnimations from '../lib/interface/iAnimations';
import animation from '../river/class/animation';
import widget from '../river/widget/widget';


class Change implements iAnimations {
  private runTime: number = 0;
  private runID: NodeJS.Timer;
  over: any;
  play(w: number, h: number, toW: number, toH: number, time: number, v: any) {
    clearTimeout(this.runID);
    this.runTime = 0;
    var offW = toW - w;
    var offH = toH - h;

    var speedW = offW / (time / 10);
    var speedH = offH / (time / 10);

    v.width = w;
    v.height = h;

    this.run(speedW, speedH, v, offW, toW, toH);
  }

  private run(speedW: number, speedH: number, v: any, off: number, toW: number, toH: number) {

    this.runID = setTimeout(() => {
      v.width += speedW;
      v.height += speedH;

      this.runTime += speedW;
      if (Math.abs(this.runTime) >= Math.abs(off)) {
        v.width = toW;
        v.height = toH;
        this.runTime = 0;
        if (this.over && off < 0) {
          this.over(v);
        }
        return;
      }

      this.run(speedW, speedH, v, off, toW, toH);
    }, 10);
  }
}

export class AnimationUtils {
  static CHANGE = new Change();
  static ALPHA = new animation.Alpha();
  static TRANS = new animation.Trans();
}

export class Setting extends River.view.Container {
  private _bg: HTMLImageElement;
  private btn: widget.Button;
  private btn2: widget.Button;

  constructor() {
    super();
    this.alpha = 0;
    this._bg = new Image();
    this._bg.src = 'setting.svg';
    this.setBackGround(this._bg);

    this.btn = new widget.Button();
    this.btn._btn_bg.src = `adduser.svg`;
    this.btn._btn_bg_press.src = `adduser.svg`;
    this.btn.width = 50;
    this.btn.height = 50;
    this.btn.txt = '';
    this.btn.top = this.height / 2 - 25;
    this.btn.left = 50;
    this.btn.alpha = 0;


    this.btn2 = new widget.Button();
    this.btn2._btn_bg.src = `adduser_press.svg`;
    this.btn2._btn_bg_press.src = `adduser_press.svg`;
    this.btn2.width = 40;
    this.btn2.height = 50;
    this.btn2.txt = '';
    this.btn2.top = this.height / 2 - 25;
    this.btn2.left = 160;
    this.btn2.alpha = 0;

    this.addChild(this.btn);
    this.addChild(this.btn2);
  }


  addBtnClick(func: any) {
    this.btn.addClickEvent(() => func(1));
    this.btn2.addClickEvent(() => func(2));
  }

  bindOver(func: Function) {
    AnimationUtils.CHANGE.over = func;
  }

  showItem(x: number, y: number, endX: number, endY: number) {
    AnimationUtils.CHANGE.play(50, 50, 250, 150, 200, this);
    AnimationUtils.ALPHA.play(0, 1, 200, this);
    AnimationUtils.TRANS.play(x, endX, y, endY, 200, this);
    setTimeout(() => {
      this.children.forEach(e => {
        e.alpha = 1;
      })
    }, 200);
  }

  closeItem(x: number, y: number, endX: number, endY: number) {
    AnimationUtils.CHANGE.play(250, 150, 50, 50, 200, this);
    AnimationUtils.ALPHA.play(1, 0, 200, this);
    AnimationUtils.TRANS.play(x, endX, y, endY, 200, this);
    this.children.forEach(e => {
      e.alpha = 0;
    })
  }
}

export default Setting;
