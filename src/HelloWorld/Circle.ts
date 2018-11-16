
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

  run = (v: any) => {
    const space = this.index * Math.PI / 180;
    v.left = this.x + this.raduis * Math.cos(space) - v.width / 2;
    v.top = this.y + this.raduis * Math.sin(space) - v.height / 2;
    this.index = this.index + 1 + (4 - Math.round(((this.index + 90) % 360) / 120));

    if(this.index < 360) return true;
    return false;
  }
}
