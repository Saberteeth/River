declare module view {
    /**
     * This is a event about touch. U can use it get coordinate and touch type.
     */
    export interface TouchEvent extends Event {
        offsetX: number;
        offsetY: number;
        clientX: number;
        clientY: number;
        offX: number;
        offY: number;
        changedTouches: any;
        touchType: string;
    }

    /**
     * If class implement this interface that can hold the View.
     */
    export interface iContainer {
        /**
         *container's height.
         */
        height: number;
        /**
         *container's width.
         */
        width: number;
        /**
         *All views you already have.
         */
        children: Array<View>;
        /**
         *U can set that to layout children by some rules.
         */
        layout: Layout;

        //Function
        /**
         * Layout the views.
         */
        upDataLayout();

        /**
         * If the views change U can use it reDraw the views.
         * @param clazzs
         */
        sUpdataViews(clazzs: Array<Function>)

        /**
         * Change view's sequence that is to show the view.
         * @param nowIndex
         * @param newIndex
         */
        changeChildIndex(nowIndex: number, newIndex: number);

        hasID(v: View): boolean;
        getViewByID(id: string): View;

        /**
         * Add view in Activity.
         * @param v
         */
        addChild(v: View): boolean

        /**
         *children's number.
         */
        maxIndex: number
        changeChildIndex(nowIndex: number, newIndex: number);

        /**
         * Remove the view in contianer.
         * @param v
         */
        removeChild(v: View);

        /**
         * Return view's index in contianer.
         * @param v
         */
        getChildIndex(v: View): number;

        /**
         * Delete the children by class.
         * @param clazzs
         */
        removeChildrenByClass(clazzs: Array<Function>);
    }

    /**
     * When the viewType is CHANGE the View will use onDraw(ctx)
     */
    export enum ViewType {
        CHANGE = 0, SUCCESS = 1
    }

    /**
     * Layout based on rule.
     */
    export interface Layout {
        margin: number;
        useLayout();
    }

    /**
     * view.Activity is River's heart. U can use it control the view.View. It will communicate with canvas. So one Activity only pair with one canvas.
     */
    export class Activity implements iContainer {
        
        children: Array<View>;
        
        layout: Layout;
        
        width: number;
        
        height: number;
        /**
         *HTML's canvas
         */
        canvas: HTMLCanvasElement;
        
        maxIndex: number;

        //Function
        constructor(c: HTMLCanvasElement);
        hasID(v: View): boolean;
        getViewByID(id: string): View;
        /**
         * Use gesture control the Canvas. Can only be used on a touch screen.
         * @param e
         */
        gesture(e: TouchEvent): void;
        
        upDataLayout(): void;
        
        sUpdataViews(clazzs: Array<Function>): void;
        
        removeChildrenByClass(clazzs: Array<Function>): void;
        
        addChild(v: View): boolean;
        
        changeChildIndex(nowIndex: number, newIndex: number): void;
        
        getChildIndex(v: View): number;
        
        removeChild(v: View): void;
        /**
         * Set a timer.
         * @param timer
         */
        addTimer(timer: (dt: number) => void): void;
        /**
         * Delete the timer.
         */
        cleanTimer(): void;
    }

    /**
     * view.View is basic unit of the river. U can use it show the picture or add the action. A view must in an iContainer can be show itself. The basic iContainer is view.Activity.
     */
    export class View {
        removeEventListener(s: string);
        //static
        static DOWN: string;
        static MOVE: string;
        static UP: string;
        static TOUCH_DOWN: string;
        static TOUCH_MOVE: string;
        static TOUCH_UP: string;
        static MOUSE_DOWN: string;
        static MOUSE_MOVE: string;
        static MOUSE_UP: string;
        static FLOAT_MOVE: string;
        static FLOAT_END: string;

        ignoreLayout: boolean;
        id: string;
        alpha: number;
        left: number;
        top: number;
        right: number;
        bottom: number;
        ctx: CanvasRenderingContext2D;
        canvas: HTMLCanvasElement;
        parent: Activity;
        height: number;
        width: number;
        nowType: ViewType;

        //Function
        constructor();
        setBackGround(i: HTMLImageElement): void;
        getIndexForParents(): number;
        changeIndexForParents(newIndex: number): void;
        addTouchEventListener(listener: (e: TouchEvent) => boolean): void;
        addFloatMoveEvent(listener: (e: TouchEvent) => boolean): void;
        addMouseWheelEventListener(listener: (e: MouseWheelEvent) => boolean): void;
        sUpdata(): void;
        onDraw(ctx: CanvasRenderingContext2D): void;
    }

    /**
     * A View but can hold another view.
     */
    export class Container extends View implements iContainer {
        layout: Layout;
        children: Array<View>;
        maxIndex: number;

        //Function
        constructor();
        removeChildrenByClass(clazzs: Array<Function>): void;
        upDataLayout(): void;
        cleanChildren(): void;
        hasID(v: View): boolean;
        getViewByID(id: string): View;
        addChild(v: View): boolean;
        changeChildIndex(nowIndex: number, newIndex: number): void;
        getChildIndex(v: View): number;
        removeChild(v: View): void;
        sUpdataViews(clazzs: Array<Function>): void;
    }
}

declare module animations {
    /**
     * U can implement this to create animation.
     */
    export interface iAnimations {
        over: (v: view.View) => void;
        play(v: view.View, ...nums: number[]);
    }

    /**
     * Transport animation
     */
    export class Trans implements iAnimations {
        over(v: view.View): void;
        play(v: view.View, startX: number, endX: number, startY: number, endY: number, time: number): void;
    }

    /**
     * Alpha animation
     */
    export class Alpha implements iAnimations {
        play(v: view.View ,start: number, end: number, time: number): void;
        over(v: view.View): void;
    }
}

/**
 * A utils use to drawing.
 */
declare class iPen {
    cxt2d: CanvasRenderingContext2D;

    //Function
    constructor(canvas: HTMLCanvasElement);
    clean(): void;
    readDraw(color: string, lineWidth: number): void;
    drawOver(): void
    rawOver(): void;
    rgb(r: number, g: number, b: number): number;
}

/**
 * Some widget u can use. Like button, scroll.
 */
declare module widget {
    
    export interface iScrollViewEventHandler {
        getEventName(index: number): string;
        getMaxNum(): number;
        getEventColor(index: number): string;
        getEventScale(index: number): number;
        getEventType(index: number): number;
        getEventLength(index: number): number;
        target: ScrollView;
    }
    
    export interface iBtnHandler {
        getMaxNum(): number;
        getBtnHight(): number;
        getBtnWidth(): number;
        getBtn(index: number): Button;
    }

    export enum ScrollViewType {
        BIGDATA, SMALLDATA
    }

    class ScrollViewBtnHandler implements iBtnHandler {
        upDataList(): void;
        getMaxNum(): number;
        getBtnHight(): number;
        getBtnWidth(): number;
        getBtn(index: number): Button;
    }

    export class EasyLayout2 implements view.Layout {
        float: string;
        naxWdith: number;
        margin: number;
        constructor(c: view.iContainer);
        useLayout(): void;
    }

    export class EasyLayout implements view.Layout {
        maxHeight: number;
        margin: number;

        constructor(c: view.iContainer);
        useLayout(): void;
    }

    export class ScrollView extends view.Container {
        static SCROLL_EVENTS_TYPE_LINE;
        static SCROLL_EVENTS_TYPE_RECT;
        static SCROLL_WIDTH;

        type: ScrollViewType;
        LISTBTN_HEIGHT;
        LISTBTN_WIDTH;
        isShowEvents: boolean;
        scrollBtnImg: string;
        scrollBtnImg_press: string;
        handler: iScrollViewEventHandler;
        borderColor: string;
        bgSRC: string;
        scrollbgSRC: string;
        scrollPressbgSRC: string;
        fakeWidth: number;
        scale: number;

        //Function
        constructor();
        scaleChangeAction: (scale: number) => void;
        listBtnAction: (index: number) => void;
        rulerClickAction: (scale: number) => void;
        scrollAction: (t: string, scale: number) => void;
        eventShowList: Array<any>;
        removeListBtn(): void;
        onCreate(w: number): void;
    }

    export class ListButton extends view.Container {
        handler: iBtnHandler;
        constructor(handler: iBtnHandler);
        initHW(): void;
        onCreate(): void;
    }
    
    export class Button extends view.View {
        _btn_bg: HTMLImageElement;
        _btn_bg_press: HTMLImageElement;
        txt: string;
        txtFont: number;
        txtColor: string;
        addClickEvent(fun: () => void): void;
    }
}