
import river from '../river/class';
import iAnimations from '../river/interface/iAnimations';
import animation from '../river/class/animation';

class Change implements iAnimations {
  private runTime: number = 0;
  private runID: NodeJS.Timer;
  over: any;
  play(w: number, h: number, toW: number, toH: number, time: number, v: river.View) {
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

  private run(speedW: number, speedH: number, v: river.View, off: number,toW: number, toH: number) {

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

export class Setting extends river.Container {
  private _bg: HTMLImageElement;

  constructor() {
    super();
    this.alpha = 0;
    this.width = 50;
    this.height = 50;
    this._bg = new Image();
    this._bg.src = 'float.svg';
    this.setBackGround(this._bg);
  }

  bindOver(func: Function) {
    AnimationUtils.CHANGE.over = func;
  }

  showItem(x: number, y: number, endX: number, endY: number) {
    AnimationUtils.CHANGE.play(50, 50, 250, 150, 200, this);
    AnimationUtils.ALPHA.play(0,1,200, this);
    AnimationUtils.TRANS.play(x, endX, y, endY, 200, this);
  }

  closeItem(x: number, y: number, endX: number, endY: number) {
    AnimationUtils.CHANGE.play(250, 150, 50, 50, 200, this);
    AnimationUtils.ALPHA.play(1,0,200, this);
    AnimationUtils.TRANS.play(x, endX, y, endY, 200, this);
  }
}

export default Setting;
