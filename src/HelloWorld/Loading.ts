import river from '../river/class';
import Arc from './Circle';

function colorTrend(where = 0, start = [100, 255, 0, 0.4], end = [100, 0, 255, 1]) {
  const arr = start.map((num, index) => {
    return Math.floor(num + (end[index] - start[index]) * (where));
  });
  return arr;
}


export class Loading extends river.Activity {
  public onCreate() {
    const size = 7;
    const arr: any[] = [];
    const arcs: any[] = [];
    const r = this.width / 2;
    let lastColor = null;
    for (let i = 0; i < size; i += 1) {
      const rgb = colorTrend(i / size);
      const nowColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      const circ = new Circle(14, 14, nowColor, lastColor || nowColor);
      lastColor = nowColor;
      circ.left = this.width;
      circ.top = this.height;
      const arc = new Arc(r,r, r - circ.width / 1.4);
      arr.push(circ);
      arcs.push(arc);
      circ.alpha = 0;
      setTimeout(() => {
        circ.addAnimations(arc);
        circ.alpha = .6;
      }, 180 * i)
    }

    for(let i= size-1; i>=0;i--) {
      this.addChild(arr[i]);
    }

  }
}

export class Circle extends river.View {
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
    if(this.container) {
      const x = this.container.width / 2;
      const l = this.left - x;
      const t = this.top - x;
      if(l > 0 && t > 0) return [0,this.height,this.width,0];
      if(l < 0 && t < 0) return [this.width,0,0,this.height];
      if(l < 0 && t > 0) return [0,0,this.width,this.height];
      if(l > 0 && t < 0) return [this.width,this.height,0,0];
    }
    return [0,0,this.width,this.height];
  }

  onDraw = (ctx: CanvasRenderingContext2D) => {
    const trend = this.colorTrend();
    const lg = ctx.createLinearGradient(trend[0],trend[1],trend[2],trend[3]);

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
