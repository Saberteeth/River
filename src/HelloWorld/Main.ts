import * as River from '../lib';
import widget from '../river/widget/widget';
import { Move, AnimationUtils } from './Move';
import { Setting } from './Setting';
// import Eye from '../Eye';



export class MainActivity extends River.Activity {
  private btn: Move;
  private setting: Setting;
  private icon: widget.Button;
  react: any;

  setButtonBg(v: widget.Button, bg: string) {
    v._btn_bg.src = `${bg}.png`;
    v._btn_bg_press.src = `${bg}_press.png`;
  }

  addIcon() {
    this.icon = new widget.Button();
    this.setButtonBg(this.icon, 'btn');
    this.icon.width = this.icon.height = 80;
    this.icon.top = this.icon.left = 20;
    this.icon.txt = '';
    this.icon.addClickEvent(()=>{
      window.location.href = './API.htm';
    });
  }

  public onCreate() {
    this.addIcon();

    this.btn = new Move();
    this.setting = new Setting();
    const endL = this.width / 2 - 250 / 2;
    const endT = this.height / 2 - 150 / 2;
    this.setting.left = endL;
    this.setting.top = endT;

    this.btn.left = this.width / 2 - this.btn.width / 2;
    this.btn.top = this.height / 2 - this.btn.height / 2;

    this.setting.bindOver(()=>{
      this.removeChild(this.setting);
      this.addChild(this.btn);
    });

    this.btn.onClick = () => {
      this.removeChild(this.btn);
      this.addChild(this.setting);
      this.setting.showItem(this.btn.left, this.btn.top, endL, endT);
    }

    this.setting.addBtnClick((type: number) => {
      this.react && this.react.userItemOpen(type);
      this.setting.closeItem(this.setting.left, this.setting.top, this.btn.left, this.btn.top);
    });

    this.setting.addTouchEventListener(e=>{

      if(e.touchType == River.View.UP) {
        this.setting.closeItem(this.setting.left, this.setting.top, this.btn.left, this.btn.top);
      }
      return true;
    });

    // const eye = new Eye(50);



    this.addChild(this.icon);
    this.addChild(this.btn);
    // this.addChild(eye);
    AnimationUtils.ALPHA.play(0, 0.5, 1000, this.btn);
  }

}

export function createActivity(id: string) {
  return new MainActivity(<HTMLCanvasElement>document.getElementById(id));
}

export default createActivity;


