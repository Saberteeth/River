import activity from './view/Activity';
import contianer from './view/Container';
import view from './view/View';
import viewType from '../enum/ViewType';
import ianimations from '../interface/iAnimations';
import icontainer from '../interface/iContainer';
import ilayout from '../interface/iLayout';
import touchEvent from '../interface/TouchEvent';
declare namespace river {
    abstract class Activity extends activity {
        abstract onCreate(): void;
    }
    class View extends view {
    }
    class Container extends contianer {
    }
    type ViewType = viewType;
    type iAnimations = ianimations;
    type iContainer = icontainer;
    type iLayout = ilayout;
    type TouchEvent = touchEvent;
}
export default river;
