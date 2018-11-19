
import { Animation } from '../river/class/animation/Animation';

export default class Arc extends Animation {
  constructor(x: number, y: number, raduis: number) {
    super();
    this.x = x;
    this.y = y;
    this.raduis = raduis;
  }

  isForever = true;
  x = 0;
  y = 0;
  raduis = 0;
  index = 0;
  rW = 0;
  rH = 0;

  run = (v: any) => {
    if(!this.rW || !this.rH) {
      this.rW = v.width;
      this.rH = v.height;
    }

    const space = this.index * Math.PI / 180;
    v.left = this.x + this.raduis * Math.cos(space) - v.width / 2;
    v.top = this.y + this.raduis * Math.sin(space) - v.height / 2;

    const x = (((this.index + 90) % 360) / 360);
    const off = Math.floor(((- x * x) + x) * 22);
    this.index = this.index + 1 + off;
    v.height = v.width = this.rW * (1 + off / 10);


    if(this.index < 360) return true;
    return false;
  }
}
