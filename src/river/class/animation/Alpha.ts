import iAnimations from '../../../lib/interface/iAnimations';

/**
 * @Deprecated
 */
export default class Alpha implements iAnimations {
  private runTime: number = 0;
  private runID: NodeJS.Timer;

  play(start: number, end: number, time: number, v: any) {
      clearTimeout(this.runID);
      this.runTime = 0;
      var off = end - start;
      var speed = off / (time / 10);
      v.alpha = start;
      this.run(speed, v, off, end);
  }

  private run(speed: number, v: any, off: number, end: number) {
      this.runID = setTimeout(() => {
          v.alpha += speed;
          this.runTime += speed;

          if (Math.abs(this.runTime) >= Math.abs(off)) {
              v.alpha = end;
              this.runTime = 0;
              if (this.over) {
                  this.over(v);
              }
              return;
          }

          this.run(speed, v, off, end);
      }, 10);
  }

  over: any;
}
