
import river from '../river/class';
import animation from '../river/class/animation';

export class AnimationUtils {
  static ALPHA = new animation.Alpha();
  static TRANS = new animation.Trans();
}

export class Move extends river.View {
  private _bg: HTMLImageElement;
  private _offLeft: number;
  private _offTop: number;
  private _begin: number;

  where(x: number, y: number): string {
    if (!this.container) return 'bad';
    var offx = this.container.height / 2 - y;
    var offy = this.container.width / 2 - x;
    var tb = offx > 0 ? 'top' : 'bottom';
    var lr = offy > 0 ? 'left' : 'right';
    return Math.abs(offx) < Math.abs(offy) ? lr : tb;
  }

  onClick() {
    console.log('click')
  }

  constructor() {
    super();
    this.alpha = 0;
    this.height = this.width = 50;
    this._bg = new Image();
    this._bg.src = 'move_press.png';
    this.setBackGround(this._bg);

    this.addTouchEventListener((e: river.TouchEvent) => {
      if (!this.container) return false;
      switch (e.touchType) {
        case river.View.DOWN:
          this._offLeft = e.clientX - this.left;
          this._offTop = e.clientY - this.top;
          AnimationUtils.ALPHA.play(0.5, 1, 150, this);
          this._begin = new Date().getTime();
          break;
        case river.View.MOVE:
          var l = e.clientX - this._offLeft;
          var t = e.clientY - this._offTop;
          l = l < 0 ? 0 : l;
          l = l + this.width > this.container.width ? this.container.width - this.width : l;

          t = t < 0 ? 0 : t;
          t = t + this.height > this.container.height ? this.container.height - this.height : t;

          this.left = l;
          this.top = t;
          break;
        case river.View.UP:
          AnimationUtils.ALPHA.play(1, 0.5, 150, this);
          if(new Date().getTime() - this._begin < 200) {
            this.onClick();
            return true;
          }

          switch (this.where(this.left + this.width / 2, this.top + this.height / 2)) {
            case 'left':
              AnimationUtils.TRANS.play(this.left, 0, this.top, this.top, 100, this);
              break;
            case 'right':
              AnimationUtils.TRANS.play(this.left, this.container.width - this.width, this.top, this.top, 100, this);
              break;
            case 'bottom':
              AnimationUtils.TRANS.play(this.left, this.left, this.top, this.container.height - this.height, 100, this);
              break;
            case 'top':
              AnimationUtils.TRANS.play(this.left, this.left, this.top, 0, 100, this);
              break;
            default:
              return false;
          }

      }
      return true;
    });
  }
}

export default Move;
