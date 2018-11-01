import activity from './view/Activity';
import contianer from './view/Container';
import view from './view/View';

import viewType from '../enum/ViewType';
import ianimations from '../interface/iAnimations';
import icontainer from '../interface/iContainer';
import ilayout from '../interface/iLayout';
import touchEvent from '../interface/TouchEvent';

namespace river {
  export abstract class Activity extends activity {
    public abstract onCreate():void;
  }
  export class View extends view {}
  export class Container extends contianer {}
  export type ViewType = viewType
  export type iAnimations = ianimations
  export type iContainer = icontainer
  export type iLayout = ilayout
  export type TouchEvent = touchEvent
}

export default river;
