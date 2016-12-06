/**
 * Canvas辅助类
 */
declare class iPen {
    private _canvas;
    private _cxt2d;
    /**
     * 获取context2d对象
     */
    readonly cxt2d: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement);
    /**
     * 清空画布
     */
    clean(): void;
    /**
     * 准lian'xi备绘图
     * @param color 颜色
     * @param lineWidth 线宽
     */
    readDraw(color: string, lineWidth: number): void;
    /**
     * 结束绘画
     */
    drawOver(): void;
    /**
     * 颜色计算
     * @param r 红
     * @param g 绿
     * @param b 蓝
     */
    rgb(r: number, g: number, b: number): number;
}
/**
 * view工具模型，目前提供 Activity, view 两个核心继承类，一个TouchEvent事件类， ViewType视图状态枚举。
 */
declare module view {
    /**
     * 继承至Event，作为增强字段作用。
     */
    interface TouchEvent extends Event {
        /**
         * 局部偏移量x
         */
        offsetX: number;
        /**
         * 局部偏移量y
         */
        offsetY: number;
        /**
         * 全局偏移量x
         */
        clientX: number;
        /**
         * 全局偏移量y
         */
        clientY: number;
        /**
         * 获取touch中的数据保存对象
         */
        changedTouches: any;
        /**
         * 鼠标悬浮状态类型，等同于event中的.type，不同处是额外添加了end状态表示滑动离开悬浮区域
         */
        touchType: string;
        offX: number;
        offY: number;
    }
    interface iContainer {
        height: number;
        width: number;
        /**
         * 获取子对象集合
         */
        children: Array<View>;
        /**
         * 设置布局器
         */
        layout: Layout;
        /**
         * 使用布局
         */
        upDataLayout(): any;
        /**
         * 刷新子对象
         */
        sUpdataViews(clazzs: Array<Function>): any;
        /**
        * 交换两个点位置
        */
        changeChildIndex(nowIndex: number, newIndex: number): any;
        /**
         * 是否存在ID
         */
        hasID(v: View): boolean;
        /**
         * 根据ID获得视图，注意该id有包含关系的，即在不同的container可以拥有相同的id
         */
        getViewByID(id: string): View;
        /**
         * 添加显示对象
         */
        addChild(v: View): boolean;
        /**
         * 获取最大子对象位置，如果没有就返回-1
         */
        maxIndex: number;
        /**
        * 交换两个点位置
        */
        changeChildIndex(nowIndex: number, newIndex: number): any;
        /**
        * 移除显示对象
        */
        removeChild(v: View): any;
        /**
         * 获取对象在子类中的叠放次序，既索引
         */
        getChildIndex(v: View): number;
        removeChildrenByClass(clazzs: Array<Function>): any;
    }
    /**
     * 核心界面控制器，类似于Android中的Activity对象，拥有对添加其中的View对象的控制作用，
     * 并实际控制核心显示canvas的绘制，以及touch等事件分发。
     */
    class Activity implements iContainer {
        private _children;
        private _activityView;
        private _lastFloatView;
        private _canvas;
        private _ctx;
        private _timers;
        private _layout;
        readonly children: Array<View>;
        layout: Layout;
        readonly width: number;
        readonly height: number;
        /**
         * 获取注入的canvas对象
         */
        readonly canvas: HTMLCanvasElement;
        upDataLayout(): void;
        sUpdataViews(clazzs: Array<Function>): void;
        removeChildrenByClass(clazzs: Array<Function>): void;
        hasID(v: View): boolean;
        getViewByID(id: string): View;
        addChild(v: View): boolean;
        readonly maxIndex: number;
        changeChildIndex(nowIndex: number, newIndex: number): void;
        getChildIndex(v: View): number;
        removeChild(v: View): void;
        /**
         * 添加时间监听器
         */
        addTimer(timer: (dt: number) => void): void;
        /**
         * 移除所有时间监听器
         */
        cleanTimer(): void;
        constructor(c: HTMLCanvasElement);
        private init();
        private _lastTime;
        private run(a);
        private initEvent();
    }
    /**
     * View对象状态的表示枚举，分别是GHANGE表示对象需要重新绘制，SUCCESS表示对象已经完成重绘。
     */
    enum ViewType {
        CHANGE = 0,
        SUCCESS = 1,
    }
    /**
    * 布局器
    */
    interface Layout {
        margin: number;
        useLayout(): any;
    }
    /**
     * 显示对象的封装类，同时持有自我绘制能力，如需要自我绘制需为 onDraw: (ctx: CanvasRenderingContext2D) => void;字段赋值
     */
    class View {
        ignoreLayout: boolean;
        /**
         * 触摸开始
         */
        static readonly DOWN: string;
        /**
         * 触摸移动
         */
        static readonly MOVE: string;
        /**
         * 触摸抬起
         */
        static readonly UP: string;
        /**
         * 触摸开始
         */
        static readonly TOUCH_DOWN: string;
        /**
         * 触摸移动
         */
        static readonly TOUCH_MOVE: string;
        /**
         * 触摸抬起
         */
        static readonly TOUCH_UP: string;
        /**
         * 点击
         */
        static readonly MOUSE_DOWN: string;
        /**
         * 移动
         */
        static readonly MOUSE_MOVE: string;
        /**
         * 抬起
         */
        static readonly MOUSE_UP: string;
        /**
         * 鼠标悬浮事件
         */
        static readonly FLOAT_MOVE: string;
        /**
         * 鼠标悬浮移出
         */
        static readonly FLOAT_END: string;
        private _id;
        id: string;
        private _alpha;
        alpha: number;
        private _img;
        /**
         * 设置纹理背景
         */
        setBackGround(i: HTMLImageElement): void;
        /**
         * 获取在activity视图中的次序
         */
        getIndexForParents(): number;
        /**
         * 改变位置
         */
        changeIndexForParents(newIndex: number): void;
        /**
         * 显示对象左边距
         */
        left: number;
        /**
         * 显示对象上边距
         */
        top: number;
        /**
         * 显示对象右边距
         */
        readonly right: number;
        /**
         * 显示对象下边距
         */
        readonly bottom: number;
        private _nowType;
        private _canvas;
        private _touchListener;
        private _parent;
        private _container;
        private _floatMoveListener;
        private _mouseWheelListener;
        private _ctx;
        /**
         * 获取2d对象
         */
        readonly ctx: CanvasRenderingContext2D;
        readonly canvas: HTMLCanvasElement;
        /**
         * 父activity对象
         */
        readonly parent: Activity;
        readonly container: Container;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        addParent(a: Activity): boolean;
        addContainer(c: Container): boolean;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        removeParent(): void;
        /**
         * 宽
         */
        width: number;
        /**
         * 高
         */
        height: number;
        /**
         * 目前状态
         */
        nowType: ViewType;
        constructor();
        private init();
        /**
         * 添加鼠标点击与触摸事件
         */
        addTouchEventListener(listener: (e: TouchEvent) => boolean): void;
        /**
         * 添加鼠标悬浮事件,注float事件中检测对象必须由touchTpye描述事件状态
         */
        addFloatMoveEvent(listener: (e: TouchEvent) => boolean): void;
        /**
         * 添加鼠标滚轮事件
         */
        addMouseWheelEventListener(listener: (e: MouseWheelEvent) => boolean): void;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        onTouchEvent(e: TouchEvent): boolean;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        onFloatEvent(e: TouchEvent): boolean;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        onMouseWheelEvent(e: MouseWheelEvent): boolean;
        /**
         * 刷新视图
         */
        sUpdata(): void;
        /**
         * 绘制自己的字段，通过赋值,注意会优先绘制设置的背景，然后再绘制该项,请避免使用,但是需要赋值
         */
        onDraw: (ctx: CanvasRenderingContext2D) => void;
        /**
         * 此函数由activity控制操作，请避免使用
         */
        draw(ctx: CanvasRenderingContext2D): void;
    }
    class Container extends View implements iContainer {
        private _children;
        private _actionChild;
        private _layout;
        removeChildrenByClass(clazzs: Array<Function>): void;
        layout: Layout;
        upDataLayout(): void;
        readonly children: Array<View>;
        contianerDraw(ctx: CanvasRenderingContext2D): void;
        cleanChildren(): void;
        hasID(v: View): boolean;
        getViewByID(id: string): View;
        addChild(v: View): boolean;
        readonly maxIndex: number;
        changeChildIndex(nowIndex: number, newIndex: number): void;
        getChildIndex(v: View): number;
        removeChild(v: View): void;
        sUpdataViews(clazzs: Array<Function>): void;
        /**
         * 清除触发对象
         */
        cleanAction(): void;
        constructor();
        /**
         * 事件分发,不建议调用
         */
        issue(e: TouchEvent): boolean;
    }
}
declare module animations {
    interface iAnimations {
        over: (v: view.View) => void;
    }
    class Trans implements iAnimations {
        private runTime;
        over: (v: view.View) => void;
        play(startX: number, endX: number, startY: number, endY: number, time: number, v: view.View): void;
        private run(sX, sY, v, offX, endX, endY);
    }
    class Alpha implements iAnimations {
        private runTime;
        play(start: number, end: number, time: number, v: view.View): void;
        private run(speed, v, off, end);
        over: (v: view.View) => void;
    }
}
declare module widget {
    /**
     * 控制标尺类的数据量，BIGDATA表示大数据，SMALLDATA表示小数据
     */
    enum ScrollViewType {
        BIGDATA = 0,
        SMALLDATA = 1,
    }
    class Window extends view.Container {
        private _titleHeight;
        private _box;
        private _title;
        private _ipen;
        readonly box: view.Container;
        private _close;
        private _small;
        private _big;
        setCloseAction(fun: () => void): void;
        seTheme(title_bg: HTMLImageElement, close_bg: string, small_bg: string, big_bg: string, close_bg_press: string, small_bg_press: string, big_bg_press: any): void;
        private initBtn(btn);
        constructor(w: number, h: number);
    }
    class EasyLayout2 implements view.Layout {
        private _margin;
        private _container;
        float: string;
        maxWidth: number;
        constructor(c: view.iContainer);
        margin: number;
        private floatLeft();
        private floatRight();
        useLayout(): void;
    }
    class EasyLayout implements view.Layout {
        maxHeight: number;
        private _margin;
        private _container;
        constructor(c: view.iContainer);
        margin: number;
        useLayout(): void;
    }
    /**
     * 标尺类，可以产生标尺，如果添加了handler对象还可以进行标尺事件显示
     */
    class ScrollView extends view.Container {
        type: ScrollViewType;
        private _scrollButton;
        static SCROLL_EVENTS_TYPE_LINE: number;
        static SCROLL_EVENTS_TYPE_RECT: number;
        static SCROLL_WIDTH: number;
        LISTBTN_HEIGHT: number;
        LISTBTN_WIDTH: number;
        private _isShowEvents;
        isShowEvents: boolean;
        private _pen;
        private _scale;
        private _scrollOFF;
        private _bg;
        private _scroll_bg;
        private _scroll_bg_press;
        scrollBtnImg: string;
        scrollBtnImg_press: string;
        private _listButton;
        private _handler;
        scaleChangeAction: (scale: number) => void;
        listBtnAction: (index: number) => void;
        rulerClickAction: (scale: number) => void;
        scrollAction: (t: string, scale: number) => void;
        eventShowList: Array<any>;
        private _eventHandler;
        handler: iScrollViewEventHandler;
        borderColor: string;
        removeListBtn(): void;
        bgSRC: string;
        scrollbgSRC: string;
        scrollPressbgSRC: string;
        readonly fakeWidth: number;
        scale: number;
        constructor();
        onCreate(w: number): void;
    }
    /**
     * 提供简洁的下拉菜单使用方案，类似listView，创建时必须拥有已实现的iBtnHandler支持
     */
    class ListButton extends view.Container {
        private _handler;
        readonly handler: iBtnHandler;
        constructor(handler: iBtnHandler);
        initHW(): void;
        onCreate(): void;
    }
    interface iScrollViewEventHandler {
        getEventName(index: number): string;
        getMaxNum(): number;
        getEventColor(index: number): string;
        getEventScale(index: number): number;
        getEventType(index: number): number;
        getEventLength(index: number): number;
        target: ScrollView;
    }
    /**
     * ListButton的Handler
     */
    interface iBtnHandler {
        getMaxNum(): number;
        getBtnHight(): number;
        getBtnWidth(): number;
        getBtn(index: number): Button;
    }
    /**
     * 提供按钮功能
     */
    class Button extends view.View {
        _btn_bg: HTMLImageElement;
        _btn_bg_press: HTMLImageElement;
        private _clickFun;
        private _txt;
        private _txtColor;
        private _txtFont;
        private _pen;
        txt: string;
        txtColor: string;
        txtFont: number;
        addClickEvent(fun: () => void): void;
        constructor();
    }
}
