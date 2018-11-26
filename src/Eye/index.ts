import * as River from '../lib';

export default class Eye extends River.view.Container {
  pupil: Pupil;
  constructor(r: number) {
    super();
    this.height = this.width = r * 2;
    this.pupil = new Pupil(r / 2);

    this.addChild(this.pupil);
    this.pupil.top = this.pupil.left = r - this.pupil.r;

    let offX = 0;
    let offY = 0;
    this.onTouchEvent = (e) => {
      if(e.touchType === River.view.View.DOWN) {
        offX = this.pupil.left - e.clientX;
        offY = this.pupil.top - e.clientY;
      }

      if(e.touchType !== River.view.View.MOVE) {
        return true;
      }

      const l = offX + e.clientX;
      const t =  offY + e.clientY;

      const side1 = Math.abs(r - (l + this.pupil.r));
      const side2 = Math.abs(r - (t + this.pupil.r));

      const scale = Math.sqrt(side1 * side1 + side2 * side2) / (r - this.pupil.r);

      this.pupil.left = (scale > 1 ? (l - this.pupil.r) / scale + this.pupil.r : l);

      this.pupil.top = (scale > 1 ? (t - this.pupil.r)/ scale + this.pupil.r : t);

      this.pupil.sUpdata();
      return true;
    }
  }



  onDraw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}


class Pupil extends River.view.View {
  constructor(r: number) {
    super();
    this.height = this.width = r * 2;
    this.r = r;
  }

  r: number;

  onDraw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}
