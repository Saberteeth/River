import * as River from '../lib';
import Arc from './Circle';

function colorTrend(where = 0, start = [100, 255, 0, 0.4], end = [100, 0, 255, 1]) {
  const arr = start.map((num, index) => {
    return Math.floor(num + (end[index] - start[index]) * (where));
  });
  return arr;
}


export class Loading extends River.view.Activity {
  public onCreate(start =  [100, 255, 0, 0.4], end = [100, 0, 255, 1]) {
    const size = 7;
    const arr: any[] = [];
    const arcs: any[] = [];
    const r = this.width / 2;
    let lastColor = null;
    for (let i = 0; i < size; i += 1) {
      const rgb = colorTrend(i / size, start, end);
      const nowColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      const circ = new Circle(12, 12, nowColor, lastColor || nowColor);
      lastColor = nowColor;
      circ.left = this.width;
      circ.top = this.height;
      const arc = new Arc(r, r, r - circ.width / 1.2);
      arr.push(circ);
      arcs.push(arc);
      circ.alpha = 0;
    }

    for (let i = size - 1; i >= 0; i--) {
      this.addChild(arr[i]);
    }

    setTimeout(()=>{
      this.playAnimation(arr, arcs);
    },0);
  }

  async playAnimation(arr:any[] = [], arcs:any[] = [], index = 0) {
    if(index > arr.length - 1) return true;
    arr[index].addAnimations(arcs[index]);
    arr[index].alpha = .6;

    const promise = new Promise((res)=>{
      setTimeout(()=>{
        res(this.playAnimation(arr, arcs, index + 1));
      }, 180);
    });
    return await promise;
  }
}

export class Circle extends River.view.View {
  color1: string;
  color2: string | undefined;
  constructor(w: number, h: number, color1: string, color2?: string) {
    super();
    this.width = w;
    this.height = h;
    this.color1 = color1;
    this.color2 = color2;
  }

  colorTrend() {
    if (this.container) {
      const x = this.container.width / 2;
      const l = this.left - x;
      const t = this.top - x;

      const bL = -l + x;
      const bT = -t + x;
      const toSmale = this.width / this.container.width;
      const x1 = t > 0 ? 0 : this.width;
      const y1 = l > 0 ? this.height : 0;
      const x2 = - bL * toSmale;
      const y2 = bT * toSmale;
      return [ x1, y1, x2, y2 ];
    }
    return [0, 0, this.width, this.height];
  }

  onDraw = (ctx: CanvasRenderingContext2D) => {
    const trend = this.colorTrend();
    const lg = ctx.createLinearGradient(trend[0], trend[1], trend[2], trend[3]);

    lg.addColorStop(0, this.color2 || this.color1);
    lg.addColorStop(1, this.color1);

    ctx.fillStyle = lg;
    ctx.strokeStyle = lg;
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, this.width / 2 - 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

export function createActivity(id: string) {
  return new Loading(<HTMLCanvasElement>document.getElementById(id));
}

export default createActivity;
