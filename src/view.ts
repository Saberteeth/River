/**
 * view工具模型，目前提供 Activity, view 两个核心继承类，一个TouchEvent事件类， ViewType视图状态枚举。
 */
module view {


    /**
     * 继承至Event，作为增强字段作用。
     */
    export interface TouchEvent extends Event {
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

    export interface iContainer {
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
        upDataLayout();
        /**
         * 刷新子对象
         */
        sUpdataViews(clazzs: Array<Function>)
        /**
        * 交换两个点位置
        */
        changeChildIndex(nowIndex: number, newIndex: number);
        /**
         * 是否存在ID
         */
        hasID(v: View): boolean
        /**
         * 根据ID获得视图，注意该id有包含关系的，即在不同的container可以拥有相同的id
         */
        getViewByID(id: string): View
        /**
         * 添加显示对象
         */
        addChild(v: View): boolean
        /**
         * 获取最大子对象位置，如果没有就返回-1
         */
        maxIndex: number
        /**
        * 交换两个点位置
        */
        changeChildIndex(nowIndex: number, newIndex: number)
        /**
        * 移除显示对象
        */
        removeChild(v: View)
        /**
         * 获取对象在子类中的叠放次序，既索引
         */
        getChildIndex(v: View): number 

        removeChildrenByClass(clazzs: Array<Function>);
    }


    /**
     * 核心界面控制器，类似于Android中的Activity对象，拥有对添加其中的View对象的控制作用，
     * 并实际控制核心显示canvas的绘制，以及touch等事件分发。
     */
    export class Activity implements iContainer {
        private _children: Array<View>;
        private _activityView: View;
        private _lastFloatView: View;
        private _canvas: HTMLCanvasElement;
        private _ctx: CanvasRenderingContext2D;
        private _timers: Array<(dt: number) => void>;
        private _layout: Layout;

        get children(): Array<View> {
            return this._children;
        }
    
        set layout(l: Layout) {
            this._layout = l;
        }

        get layout(): Layout {
            return this._layout;
        }

        get width(): number {
            return this._canvas.width;
        }

        get height(): number {
            return this._canvas.height;
        }
        /**
         * 获取注入的canvas对象
         */
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }
      
        upDataLayout() {
            if (this._layout) {
                this.layout.useLayout();
            }
        }
      
        sUpdataViews(clazzs: Array<Function>) {
            A: for (var x = 0; x < this._children.length; x++) {
                for (var y = 0; y < clazzs.length; y++) {
                    if (this._children[x].constructor == clazzs[y]) {
                        this._children[x].sUpdata();
                        clazzs.splice(y, 1);
                        continue A;
                    }
                }
            }
        }

        removeChildrenByClass(clazzs: Array<Function>) {
            A:for (var x = 0; x < this._children.length; x++) {
                for (var y = 0; y < clazzs.length; y++) {
                    if (this._children[x].constructor == clazzs[y]) {
                        this._children.splice(x, 1);
                        x--;
                        continue A;
                    }
                }
            }
        }
       
        hasID(v: View): boolean {
            for (var i = 0; i < this._children.length; i++) {
                if (v.id && v.id == this._children[i].id) {
                    console.log(v.id + '已经被使用');
                    return true;
                }
            }
            return false;
        }
      
        getViewByID(id: string): View {
            for (var i = 0; i < this._children.length; i++) {
                if (id && id == this._children[i].id) {
                    return this._children[i];
                }
            }
        }

        addChild(v: View): boolean {
            if (!this.hasID(v) && v.addParent(this)) {
                this._children.push(v);
                v.nowType = view.ViewType.CHANGE;
                return true;
            }

            return false;
        }
        
        get maxIndex(): number {
            return this._children.length - 1;
        }
       
        changeChildIndex(nowIndex: number, newIndex: number) {
            var index = newIndex;
            if (index < 0) {
                index = 0;
            } else if (index >= this._children.length) {
                index = this._children.length - 1;
            }

            var child = this._children.splice(nowIndex, 1);
            this._children.splice(index, 0, child[0]);
        }
       
        getChildIndex(v: View): number {
            for (var i = 0; i < this._children.length; i++) {
                if (v == this._children[i]) {
                    return i;
                }
            }

            return -1;
        }
       
        removeChild(v: View) {
            if (v.parent)
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i] == v) {
                        var child = this._children.splice(i, 1);
                        child[0].removeParent();
                    }
                }
        }
        /**
         * 添加时间监听器
         */
        addTimer(timer: (dt: number) => void) {
            this._timers.push(timer);
        }

        /**
         * 移除所有时间监听器
         */
        cleanTimer() {
            this._timers.splice(0, this._timers.length);
        }


        constructor(c: HTMLCanvasElement) {
            this._canvas = c;
            this._timers = new Array;
            this._ctx = c.getContext('2d');
            this._children = new Array;
            this.init();
        }

        private init() {
            this.initEvent();
            this.run(this);
        }

        private _lastTime: number = 0;
        private run(a: Activity) {

            a._ctx.clearRect(0, 0, a._canvas.width, a._canvas.height);
            for (var i = 0; i < a._children.length; i++) {
                var child = a._children[i];
                if (child.nowType == ViewType.CHANGE) {
                    if (child instanceof Container) {
                        (<Container>child).contianerDraw(child.canvas.getContext('2d'));
                    } else {
                        child.draw(child.canvas.getContext('2d'));
                    }
                }

                this._ctx.drawImage(child.canvas, child.left, child.top);
            }

            requestAnimationFrame((rt: number) => {
                var dt = rt - this._lastTime;
                this._lastTime = rt;

                for (var i = 0; i < this._timers.length; i++) {
                    this._timers[i](dt);
                }

                a.run(a);
            })
        }

        private initEvent() {

            window.ondragstart = () => {
                return false;
            };

            window.addEventListener('mousewheel', (e: MouseWheelEvent) => {

                if (e.target == this._canvas) {
                    for (var i = this._children.length - 1; i >= 0; i--) {
                        var child = this._children[i];
                        if (e.offsetX > child.left && e.offsetX < child.right && e.offsetY > child.top && e.offsetY < child.bottom) {
                            if (this._children[i].onMouseWheelEvent(e)) {
                                break;
                            }
                        }
                    }
                }
            })

            window.addEventListener(view.View.MOUSE_DOWN, (e: TouchEvent) => {
                e.offX = e.offsetX;
                e.offY = e.offsetY;

                switch (e.type) {
                    case view.View.MOUSE_DOWN:
                    case view.View.TOUCH_DOWN:
                        e.touchType = view.View.DOWN;
                        break;
                    case view.View.MOUSE_MOVE:
                    case view.View.TOUCH_MOVE:
                        e.touchType = view.View.MOVE;
                        break;
                    case view.View.MOUSE_UP:
                    case view.View.TOUCH_UP:
                        e.touchType = view.View.UP;
                        break;
                }

                //e.touchType
                if (e.target == this._canvas)
                    for (var i = this._children.length - 1; i >= 0; i--) {
                        var child = this._children[i];
                        if (e.offsetX > child.left && e.offsetX < child.right && e.offsetY > child.top && e.offsetY < child.bottom) {
                            if (child instanceof Container) {
                                if (child.issue(e)) {
                                    this._activityView = child;
                                    return;
                                } else {
                                    continue;
                                }
                            } else {
                                if (child.onTouchEvent(e)) {
                                    this._activityView = child;
                                    return;
                                }
                            }
                        }
                    }
            });

            window.addEventListener(view.View.TOUCH_DOWN, (e: TouchEvent) => {

                e.clientX = e.changedTouches[0].clientX + document.body.scrollLeft;
                e.clientY = e.changedTouches[0].clientY + document.body.scrollTop;
                e.offX = e.clientX - this.canvas.offsetLeft;
                e.offY = e.clientY - this.canvas.offsetTop;
                e.offsetX = e.offX;
                e.offsetY = e.offY;
                
                switch (e.type) {
                    case view.View.MOUSE_DOWN:
                    case view.View.TOUCH_DOWN:
                        e.touchType = view.View.DOWN;
                        break;
                    case view.View.MOUSE_MOVE:
                    case view.View.TOUCH_MOVE:
                        e.touchType = View.MOVE;
                        break;
                    case view.View.MOUSE_UP:
                    case view.View.TOUCH_UP:
                        e.touchType = view.View.UP;
                        break;
                }


                if (e.target == this._canvas) {
                    e.preventDefault();
                    for (var i = this._children.length - 1; i >= 0; i--) {
                        var child = this._children[i];
                        if (e.offsetX > child.left && e.offsetX < child.right && e.offsetY > child.top && e.offsetY < child.bottom) {
                            if (child instanceof Container) {
                                if (child.issue(e)) {
                                    this._activityView = child;
                                    return;
                                } else {
                                    continue;
                                }
                            } else {
                                if (child.onTouchEvent(e)) {
                                    this._activityView = child;
                                    return;
                                }
                            }
                        }
                    }
                }
            })

            window.addEventListener(View.MOUSE_MOVE, (e: TouchEvent) => {
                e.offX = e.offsetX;
                e.offY = e.offsetY;
                switch (e.type) {
                    case View.MOUSE_DOWN:
                    case View.TOUCH_DOWN:
                        e.touchType = View.DOWN;
                        break;
                    case View.MOUSE_MOVE:
                    case View.TOUCH_MOVE:
                        e.touchType = View.MOVE;
                        break;
                    case View.MOUSE_UP:
                    case View.TOUCH_UP:
                        e.touchType = View.UP;
                        break;
                }

                if (this._activityView) {
                    if (this._activityView instanceof Container) {
                        (<Container>this._activityView).issue(e);
                        return;
                    }

                    this._activityView.onTouchEvent(e);
                    return;
                }

                if (e.target == this._canvas) {

                    for (var i = this._children.length - 1; i >= 0; i--) {
                        var child = this._children[i];
                        if (e.offsetX > child.left && e.offsetX < child.right && e.offsetY > child.top && e.offsetY < child.bottom) {
                            if (child.onFloatEvent(e)) {
                                break;
                            } else {
                                child = null;
                            }
                        } else {
                            child = null;
                        }
                    }

                    if (this._lastFloatView != child) {
                        if (this._lastFloatView) {
                            e.touchType = View.FLOAT_END;
                            this._lastFloatView.onFloatEvent(e);
                            this._lastFloatView = null;
                        }

                        if (child) {
                            this._lastFloatView = child;
                        }
                    }
                }
            });

            window.addEventListener(view.View.TOUCH_MOVE, (e: TouchEvent) => {
                e.clientX = e.changedTouches[0].clientX + document.body.scrollLeft;;
                e.clientY = e.changedTouches[0].clientY + document.body.scrollTop;;
                e.offX = e.clientX - this.canvas.offsetLeft;
                e.offY = e.clientY - this.canvas.offsetTop;
                e.offsetX = e.offX;
                e.offsetY = e.offY;

                switch (e.type) {
                    case view.View.MOUSE_DOWN:
                    case view.View.TOUCH_DOWN:
                        e.touchType = view.View.DOWN;
                        break;
                    case view.View.MOUSE_MOVE:
                    case view.View.TOUCH_MOVE:
                        e.touchType = view.View.MOVE;
                        break;
                    case view.View.MOUSE_UP:
                    case view.View.TOUCH_UP:
                        e.touchType = view.View.UP;
                        break;
                }

                if (this._activityView) {
                    e.preventDefault();
                    if (this._activityView instanceof Container) {
                        (<Container>this._activityView).issue(e);
                    } else {
                        this._activityView.onTouchEvent(e);
                    }
                }

            })

            window.addEventListener(view.View.MOUSE_UP, (e: TouchEvent) => {
                e.offX = e.offsetX;
                e.offY = e.offsetY;
                switch (e.type) {
                    case view.View.MOUSE_DOWN:
                    case view.View.TOUCH_DOWN:
                        e.touchType = view.View.DOWN;
                        break;
                    case view.View.MOUSE_MOVE:
                    case view.View.TOUCH_MOVE:
                        e.touchType = view.View.MOVE;
                        break;
                    case view.View.MOUSE_UP:
                    case view.View.TOUCH_UP:
                        e.touchType = view.View.UP;
                        break;
                }

                if (this._activityView) {

                    if (this._activityView instanceof Container) {
                        (<Container>this._activityView).issue(e);
                        (<Container>this._activityView).cleanAction();
                    } else {
                        this._activityView.onTouchEvent(e);
                    }

                    this._activityView = null;

                }
            });

            window.addEventListener(view.View.TOUCH_UP, (e: TouchEvent) => {
                e.clientX = e.changedTouches[0].clientX + document.body.scrollLeft;
                e.clientY = e.changedTouches[0].clientY + document.body.scrollTop;
                e.offX = e.clientX - this.canvas.offsetLeft;
                e.offY = e.clientY - this.canvas.offsetTop;
                e.offsetX = e.offX;
                e.offsetY = e.offY;

                switch (e.type) {
                    case view.View.MOUSE_DOWN:
                    case view.View.TOUCH_DOWN:
                        e.touchType = view.View.DOWN;
                        break;
                    case view.View.MOUSE_MOVE:
                    case view.View.TOUCH_MOVE:
                        e.touchType = view.View.MOVE;
                        break;
                    case view.View.MOUSE_UP:
                    case view.View.TOUCH_UP:
                        e.touchType = view.View.UP;
                        break;
                }

                if (this._activityView) {
                    e.preventDefault();
                    if (this._activityView instanceof Container) {
                        (<Container>this._activityView).issue(e);
                        (<Container>this._activityView).cleanAction();
                    } else {
                        this._activityView.onTouchEvent(e);
                    }

                    this._activityView = null;
                }
            })
        }
    }
    /**
     * View对象状态的表示枚举，分别是GHANGE表示对象需要重新绘制，SUCCESS表示对象已经完成重绘。
     */
    export enum ViewType {
        CHANGE = 0, SUCCESS = 1
    }

    /**
    * 布局器
    */
    export interface Layout {
        margin: number;
        useLayout();
    }

    /**
     * 显示对象的封装类，同时持有自我绘制能力，如需要自我绘制需为 onDraw: (ctx: CanvasRenderingContext2D) => void;字段赋值
     */
    export class View {

        ignoreLayout: boolean = false;
        /**
         * 触摸开始
         */
        static get DOWN(): string {
            return 'down';
        }
        /**
         * 触摸移动
         */
        static get MOVE(): string {
            return 'move';
        }
        /**
         * 触摸抬起
         */
        static get UP(): string {
            return 'up';
        }

        /**
         * 触摸开始
         */
        static get TOUCH_DOWN(): string {
            return 'touchstart';
        }
        /**
         * 触摸移动
         */
        static get TOUCH_MOVE(): string {
            return 'touchmove';
        }
        /**
         * 触摸抬起
         */
        static get TOUCH_UP(): string {
            return 'touchend';
        }
        /**
         * 点击
         */
        static get MOUSE_DOWN(): string {
            return 'mousedown';
        }
        /**
         * 移动
         */
        static get MOUSE_MOVE(): string {
            return 'mousemove';
        }
        /**
         * 抬起
         */
        static get MOUSE_UP(): string {
            return 'mouseup';
        }
        /**
         * 鼠标悬浮事件
         */
        static get FLOAT_MOVE(): string {
            return 'mousemove';
        }
        /**
         * 鼠标悬浮移出
         */
        static get FLOAT_END(): string {
            return 'end';
        }

        private _id: string = null;
        get id(): string {
            return this._id;
        }
        set id(id: string) {
            this._id = id;
        }

        private _alpha: number = 1;
        set alpha(a: number) {
            this._alpha = a;
            this.sUpdata();
        }
        get alpha(): number {
            return this._alpha;
        }

        private _img: HTMLImageElement;
        /**
         * 设置纹理背景
         */
        setBackGround(i: HTMLImageElement) {
            this._img = i;
            this.sUpdata();
        }

        /**
         * 获取在activity视图中的次序
         */
        getIndexForParents(): number {
            if (this.parent) {
                return this.parent.getChildIndex(this);
            }

            return -1;
        }

        /**
         * 改变位置
         */
        changeIndexForParents(newIndex: number) {
            if (this.parent) {
                var now = this.parent.getChildIndex(this);
                this.parent.changeChildIndex(now, newIndex);
            }
        }

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
        get right(): number {
            return this.left + this.width;
        }

        /**
         * 显示对象下边距
         */
        get bottom(): number {
            return this.top + this.height;
        }

        
        private _nowType: ViewType;
        private _canvas: HTMLCanvasElement;
        private _touchListener: (e: TouchEvent) => boolean;
        private _parent: Activity;
        private _container: Container;
        private _floatMoveListener: (e: TouchEvent) => boolean;
        private _mouseWheelListener: (e: MouseWheelEvent) => boolean;
        private _ctx: CanvasRenderingContext2D;

      

        /**
         * 获取2d对象
         */
        get ctx(): CanvasRenderingContext2D {
            return this._ctx;
        }

        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }

        /**
         * 父activity对象
         */
        get parent(): Activity {
            if (this.container) {
                return this.container.parent;
            }

            return this._parent;
        }

        get container(): Container {
            return this._container;
        }

        /**
         * 此函数由activity控制操作，请避免使用
         */
        addParent(a: Activity): boolean {
            if (!this._parent) {
                this._parent = a;
                return true;
            }

            return false;
        }

        addContainer(c: Container): boolean {
            if (!this._container) {
                this._container = c;
                return true;
            }

            return false;
        }

        /**
         * 此函数由activity控制操作，请避免使用
         */
        removeParent() {
            this._parent = null;
            this._container = null;
        }

        /**
         * 宽
         */
        get width(): number {
            return this._canvas.width;
        }

        /**
         * 高
         */
        get height(): number {
            return this._canvas.height;
        }

        set width(w: number) {
            this._canvas.width = w;
        }

        set height(h: number) {
            this._canvas.height = h;
        }

        /**
         * 目前状态
         */
        get nowType(): ViewType {
            return this._nowType;
        }

        set nowType(vt: ViewType) {

            if (this._container && vt == view.ViewType.CHANGE) {
                this._container.nowType = view.ViewType.CHANGE;
            }
            this._nowType = vt;
        }

        constructor() {
            this.init();
        }

        private init() {
            this._canvas = document.createElement('canvas');
            this._ctx = this._canvas.getContext('2d');
            this.left = 0;
            this.top = 0;
        }

        /**
         * 添加鼠标点击与触摸事件
         */
        addTouchEventListener(listener: (e: TouchEvent) => boolean) {
            this._touchListener = listener;
        }

        /**
         * 添加鼠标悬浮事件,注float事件中检测对象必须由touchTpye描述事件状态
         */
        addFloatMoveEvent(listener: (e: TouchEvent) => boolean) {
            this._floatMoveListener = listener;
        }

        /**
         * 添加鼠标滚轮事件
         */
        addMouseWheelEventListener(listener: (e: MouseWheelEvent) => boolean) {
            this._mouseWheelListener = listener;
        }

        /**
         * 此函数由activity控制操作，请避免使用
         */
        onTouchEvent(e: TouchEvent): boolean {
            if (this._touchListener)
                return this._touchListener(e);
            else
                return false;
        }

        /**
         * 此函数由activity控制操作，请避免使用
         */
        onFloatEvent(e: TouchEvent): boolean {
            if (this._floatMoveListener)
                return this._floatMoveListener(e);
            else
                return false;
        }

        /**
         * 此函数由activity控制操作，请避免使用
         */
        onMouseWheelEvent(e: MouseWheelEvent): boolean {
            if (this._mouseWheelListener) {
                return this._mouseWheelListener(e);
            } else {
                return false;
            }
        }

        /**
         * 刷新视图
         */
        sUpdata() {
            this.nowType = ViewType.CHANGE;
        }

        /**
         * 绘制自己的字段，通过赋值,注意会优先绘制设置的背景，然后再绘制该项,请避免使用,但是需要赋值
         */
        onDraw: (ctx: CanvasRenderingContext2D) => void;

        /**
         * 此函数由activity控制操作，请避免使用
         */
        draw(ctx: CanvasRenderingContext2D) {

            ctx.clearRect(0, 0, this.width, this.height);
            ctx.globalAlpha = this.alpha;
            if (this._img) {
                if (this._img.complete) {
                    ctx.drawImage(this._img, 0, 0, this.width, this.height);
                } else {
                    this.nowType = view.ViewType.CHANGE;
                    return;
                }
            }

            if (this.onDraw)
                this.onDraw(ctx);

            this.nowType = view.ViewType.SUCCESS;

        }
    }


    export class Container extends View implements iContainer {
        private _children: Array<View>;
        private _actionChild: View;

        private _layout: Layout;

        removeChildrenByClass(clazzs: Array<Function>) {
            A: for (var x = 0; x < this._children.length; x++) {
                for (var y = 0; y < clazzs.length; y++) {
                    if (this._children[x].constructor == clazzs[y]) {
                        this._children.splice(x, 1);
                        x--;
                        continue A;
                    }
                }
            }
        }
        set layout(l: Layout) {
            this._layout = l;
        }

        get layout(): Layout {
            return this._layout;
        }

        upDataLayout() {
            if (this._layout) {
                this._layout.useLayout();
            }
        }

        get children(): Array<View> {
            return this._children;
        }

        contianerDraw(ctx: CanvasRenderingContext2D) {
            this.draw(ctx);
            for (var i = 0; i < this._children.length; i++) {
                var child = this._children[i];
                if (child.nowType == ViewType.CHANGE) {
                    if (child instanceof Container) {
                        child.contianerDraw(child.canvas.getContext('2d'));
                    } else {
                        child.draw(child.canvas.getContext('2d'));
                    }
                }

                this.ctx.drawImage(child.canvas, child.left, child.top);
            }
        }

        cleanChildren() {
            this._children.splice(0,this._children.length);
        }
      
        hasID(v: View): boolean {
            for (var i = 0; i < this._children.length; i++) {
                if (v.id && v.id == this._children[i].id) {
                    return true;
                }
            }
            return false;
        }

       
        getViewByID(id: string): View {
            for (var i = 0; i < this._children.length; i++) {
                if (id && id == this._children[i].id) {
                    return this._children[i];
                }
            }
        }

        addChild(v: View): boolean {
            if (!this.hasID(v) && v.addParent(this.parent) && v.addContainer(this)) {
                this._children.push(v);
                v.nowType = view.ViewType.CHANGE;
                this.nowType = view.ViewType.CHANGE;
                return true;
            }

            return false;
        }

        get maxIndex(): number {
            var index = this._children.length - 1;
            if (index > 0) {
                return this._children.length - 1;
            } else {
                return 0;
            }

        }

        changeChildIndex(nowIndex: number, newIndex: number) {
            var index = newIndex;
            if (index < 0) {
                index = 0;
            } else if (index >= this._children.length) {
                index = this._children.length - 1;
            }

            var child = this._children.splice(nowIndex, 1);
            this._children.splice(index, 0, child[0]);
        }
       
        getChildIndex(v: View): number {
            for (var i = 0; i < this._children.length; i++) {
                if (v == this._children[i]) {
                    return i;
                }
            }

            return -1;
        }
       
        removeChild(v: View) {
            if (v.parent)
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i] == v) {
                        var child = this._children.splice(i, 1);
                        child[0].removeParent();
                    }
                }

            this.nowType = view.ViewType.CHANGE;
        }
      
        sUpdataViews(clazzs: Array<Function>) {
            A: for (var x = 0; x < this._children.length; x++) {
                for (var y = 0; y < clazzs.length; y++) {
                    if (this._children[x].constructor == clazzs[y]) {
                        this._children[x].sUpdata();
                        clazzs.splice(y, 1);
                        continue A;
                    }
                }
            }
        }

        /**
         * 清除触发对象
         */
        cleanAction() {

            if (this._actionChild instanceof Container) {

                if (this._actionChild == this) {

                } else {
                    (<Container>this._actionChild).cleanAction();
                }
            }

            this._actionChild = null;
        }

        constructor() {
            super();
            this._children = new Array;
        }

        /**
         * 事件分发,不建议调用
         */
        issue(e: TouchEvent): boolean {
            e.offX -= this.left;
            e.offY -= this.top;

            if (this._actionChild) {
                if (this._actionChild instanceof Container) {

                    if (this._actionChild == this) {
                        e.offX += this.left;
                        e.offY += this.top;
                        return this.onTouchEvent(e);
                    }

                    return (<Container>this._actionChild).issue(e);
                } else {
                    return this._actionChild.onTouchEvent(e);
                }
            }

            for (var i = this._children.length - 1; i >= 0; i--) {
                var child = this._children[i];
                if (e.offX > child.left && e.offX < child.right && e.offY > child.top && e.offY < child.bottom) {
                    if (child instanceof Container) {
                        if ((<Container>child).issue(e)) {
                            this._actionChild = child;
                            return true;
                        } else {
                            continue;
                        }
                    } else {
                        if (child.onTouchEvent(e)) {
                            this._actionChild = child;
                            return true;
                        } else {
                            continue;
                        }
                    }
                }
            }

            e.offX += this.left;
            e.offY += this.top;
            if (this.onTouchEvent(e)) {
                this._actionChild = this;
                return true;
            }

            return false;
        }
    }

}

module animations {

    export interface iAnimations {
        over: (v: view.View) => void;
    }

    export class Trans implements iAnimations {
        private runTime: number = 0;
        over: (v: view.View) => void;
        play(startX: number, endX: number, startY: number, endY: number, time: number, v: view.View) {
            if (this.runTime == 0) {
                var offX = endX - startX;
                var offY = endY - startY;

                var sX = offX / (time / 10);
                var sY = offY / (time / 10);

                v.left = startX;
                v.top = startY;
                this.run(sX, sY, v, offX, endX, endY);
            }
        }

        private run(sX: number, sY: number, v: view.View, offX: number, endX: number, endY: number) {
            setTimeout(() => {
                v.top += sY;
                v.left += sX;
                this.runTime += sX;

                if (Math.abs(this.runTime) >= Math.abs(offX)) {
                    v.top = endY;
                    v.left = endX;
                    this.runTime = 0;
                    if (this.over) {
                        this.over(v);
                    }
                    return;
                }

                this.run(sX, sY, v, offX, endX, endY);
            }, 10)
        }
    }

    export class Alpha implements iAnimations {
        private runTime: number = 0;

        play(start: number, end: number, time: number, v: view.View) {
            if (this.runTime == 0) {
                var off = end - start;
                var speed = off / (time / 10);
                v.alpha = start;
                this.run(speed, v, off, end);
            }
        }

        private run(speed: number, v: view.View, off: number, end: number) {
            setTimeout(() => {
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

        over: (v: view.View) => void;

    }
}