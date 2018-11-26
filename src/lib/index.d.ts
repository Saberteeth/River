import ActivityClass from './river/class/view/Activity';
import ContainerClass from './river/class/view/Container';
import ViewClass from './river/class/view/View';
import * as Anima from './river/class/animation/Animation';
import iPen from './river/class/iPen';
import ViewTypeEnum from './river/enum/ViewType';
export declare class Activity extends ActivityClass {
}
export declare class Container extends ContainerClass {
}
export declare class View extends ViewClass {
}
export declare abstract class Animation extends Anima.Animation {
}
export declare class IPen extends iPen {
}
export declare const ViewType: typeof ViewTypeEnum;
