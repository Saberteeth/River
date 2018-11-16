import View from "../view/View";

export abstract class Animation {
  isForever = false;
  cell: number = 10;
  private timeOff = 0;
  step(dt: number) {
    this.timeOff += dt;
    if (this.timeOff > this.cell) {
      this.timeOff = 0;
      return true;
    }
    return false;
  }

  public abstract run: (v: View) => boolean;
}
