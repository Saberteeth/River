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
    for (let i = 0; i < size; i += 1) {
      const rgb = colorTrend(i / 7);

      const circ = new Circle(12, 12, `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`);
      circ.left = this.width;
      circ.top = this.height;
      const arc = new Arc(r,r, r - circ.width / 2);
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
  color: string;
  constructor(w: number, h: number, color: string) {
    super();
    this.width = w;
    this.height = h;
    this.color = color;
  }

  onDraw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
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
