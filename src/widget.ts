module widget {

    class ScrollViewBtnHandler implements iBtnHandler {
        private _arr: Array<Button>;
        private _scrollView: ScrollView;
        constructor(r: ScrollView) {
            this._scrollView = r;
        }

        upDataList() {
            this._arr = new Array;

            for (var i = 0; i < this.getMaxNum(); i++) {
                this._arr[i] = new widget.Button();
                this._arr[i].width = this.getBtnWidth();
                this._arr[i].height = this.getBtnHight();
                this._arr[i].txt = this._scrollView.eventShowList[i].name;
                this._arr[i].txtColor = 'white';
                this._arr[i]._btn_bg.src = this._scrollView.scrollBtnImg
                this._arr[i]._btn_bg_press.src = this._scrollView.scrollBtnImg_press;
            }

        }

        getMaxNum(): number {
            return this._scrollView.eventShowList.length;
        }
        getBtnHight(): number {
            return this._scrollView.LISTBTN_HEIGHT;
        }
        getBtnWidth(): number {
            return this._scrollView.LISTBTN_WIDTH;
        }
        getBtn(index: number): Button {
            this._arr[index].addClickEvent(() => {
                this._scrollView.scale = this._scrollView.eventShowList[index].scale;
                this._scrollView.removeListBtn();
                if (this._scrollView.listBtnAction) {
                    this._scrollView.listBtnAction(index);
                }
            });
            return this._arr[index];
        }
    }

    /**
     * 控制标尺类的数据量，BIGDATA表示大数据，SMALLDATA表示小数据
     */
    export enum ScrollViewType {
        BIGDATA, SMALLDATA
    }

    export class Window extends view.Container {

        private _titleHeight: number = 30;
        private _box: view.Container;
        private _title: view.Container;
        private _ipen: iPen;

        get box(): view.Container {
            return this._box;
        }

        private _close: Button;
        private _small: Button;
        private _big: Button;

        setCloseAction(fun: () => void) {
            this._close.addClickEvent(fun)
        }

        seTheme(title_bg: HTMLImageElement, close_bg: string, small_bg: string, big_bg: string, close_bg_press: string, small_bg_press: string, big_bg_press) {
            this._title.setBackGround(title_bg);
            this._close._btn_bg.src = close_bg;
            this._close._btn_bg_press.src = close_bg_press;

            this._big._btn_bg.src = big_bg;
            this._big._btn_bg_press.src = big_bg_press;
            this._small._btn_bg.src = small_bg;
            this._small._btn_bg_press.src = small_bg_press;
        }

        private initBtn(btn: Button) {
            btn.txt = '';
            btn.height = this._title.height - 7;
            btn.width = 40;
        }

        constructor(w: number, h: number) {
            super();
            this._ipen = new iPen(this.canvas);

            this.onDraw = (ctx) => {
                this._ipen.readDraw('black', 1);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.rect(0, 0, this.width, this.height);
                this._ipen.drawOver();
            }

            this.layout = new widget.EasyLayout(this);
            this._title = new view.Container();
            this._box = new view.Container();

            this._title.height = this._titleHeight;
            this._close = new Button();
            this.initBtn(this._close);
            this._close.width = 45;

            this._big = new Button();
            this.initBtn(this._big);

            this._small = new Button();
            this.initBtn(this._small);

            var l = new EasyLayout2(this._title);
            l.float = 'right';
            this._title.layout = l;

            this.height = h + this._titleHeight;
            this._box.height = h;

            this._box.width = this.width = this._title.width = w;

            this._title.addChild(this._close);
            this._title.addChild(this._big);
            this._title.addChild(this._small);

            var offX = 0;
            var offY = 0;
            this._title.addTouchEventListener((e) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        offX = e.clientX - this.left;
                        offY = e.clientY - this.top;
                        break;
                    case view.View.MOVE:
                        this.left = e.clientX - offX;
                        this.top = e.clientY - offY;
                        break;
                }
                return true;
            })

            this.addChild(this._title);
            this.addChild(this._box);
            this._title.upDataLayout();
            this.upDataLayout();
        }
    }

    export class EasyLayout2 implements view.Layout {
        private _margin: number = 0;
        private _container: view.iContainer;
        float: string = 'right';
        maxWidth: number = 0;

        constructor(c: view.iContainer) {
            this._container = c;
        }

        set margin(n: number) {
            this._margin = n;
        }
        get margin(): number {
            return this._margin;
        }

        private floatLeft() {
            var top = this._margin;
            var left = this._margin;
            var maxHeight = 0;
            if (this.maxWidth <= 0) {
                this.maxWidth = this._container.width;
            }

            for (var i = 0; i < this._container.children.length; i++) {
                if (this._container.children[i].ignoreLayout) {
                    continue;
                }

                if (left + this._container.children[i].width > this.maxWidth) {
                    left = this._margin;
                    top += maxHeight + this._margin * 2;
                    maxHeight = this._container.children[i].height;
                }

                this._container.children[i].top = top;
                this._container.children[i].left = left;

                left = this._container.children[i].right + this._margin * 2;

                if (this._container.children[i].height > maxHeight) {
                    maxHeight = this._container.children[i].height;
                }

            }
        }

        private floatRight() {

            var maxHeight = 0;
            if (this.maxWidth <= 0) {
                this.maxWidth = this._container.width;
            }

            var top = this._margin;
            var right = this.maxWidth - this._margin;

            for (var i = 0; i < this._container.children.length; i++) {
                if (this._container.children[i].ignoreLayout) {
                    continue;
                }

                if (right - this._container.children[i].width < 0) {
                    right = this.maxWidth - this._margin;
                    top += maxHeight + this._margin * 2;
                    maxHeight = this._container.children[i].height;
                }

                this._container.children[i].top = top;
                this._container.children[i].left = right - this._container.children[i].width;

                right = this._container.children[i].left - this._margin * 2;

                if (this._container.children[i].height > maxHeight) {
                    maxHeight = this._container.children[i].height;
                }

            }
        }

        useLayout() {
            if (this._container.children.length > 0) {
                switch (this.float) {
                    default:
                    case 'left':
                        this.floatLeft();
                        break;
                    case 'right':
                        this.floatRight();
                        break;
                }
            }
        }
    }

    export class EasyLayout implements view.Layout {
        maxHeight: number = 0;
        private _margin: number = 0;
        private _container: view.iContainer;

        constructor(c: view.iContainer) {
            this._container = c;
        }

        set margin(n: number) {
            this._margin = n;
        }
        get margin(): number {
            return this._margin;
        }

        useLayout() {

            if (this._container.children.length > 0) {
                var top = this._margin;
                var left = this._margin;
                var maxWidth = 0;
                if (this.maxHeight <= 0) {
                    this.maxHeight = this._container.height;
                }

                for (var i = 0; i < this._container.children.length; i++) {
                    if (this._container.children[i].ignoreLayout) {
                        continue;
                    }


                    if (top + this._container.children[i].height >= this.maxHeight) {

                        top = this._margin;
                        left += maxWidth + this._margin * 2;
                        maxWidth = this._container.children[i].width;
                    }

                    this._container.children[i].top = top;
                    this._container.children[i].left = left;

                    top = this._container.children[i].bottom + this._margin * 2;

                    if (this._container.children[i].width > maxWidth) {
                        maxWidth = this._container.children[i].width;
                    }

                }
            }
        }
    }

    /**
     * 标尺类，可以产生标尺，如果添加了handler对象还可以进行标尺事件显示
     */
    export class ScrollView extends view.Container {
        type: ScrollViewType = ScrollViewType.SMALLDATA;
        private _scrollButton: view.View;
        static SCROLL_EVENTS_TYPE_LINE = 0;
        static SCROLL_EVENTS_TYPE_RECT = 1;
        static SCROLL_WIDTH = 35;
        LISTBTN_HEIGHT = 30;
        LISTBTN_WIDTH = 60;
        private _isShowEvents: boolean = false;
        get isShowEvents(): boolean {
            return this._isShowEvents;
        }
        set isShowEvents(b: boolean) {
            this._isShowEvents = b;
            this.sUpdata();
        }

        private _pen: iPen;
        private _scale: number = 0;
        private _scrollOFF: number = 0;

        private _bg: HTMLImageElement;
        private _scroll_bg: HTMLImageElement;
        private _scroll_bg_press: HTMLImageElement;

        scrollBtnImg: string;
        scrollBtnImg_press: string;


        private _listButton: ListButton;
        private _handler: ScrollViewBtnHandler;

        scaleChangeAction: (scale: number) => void;
        listBtnAction: (index: number) => void;
        rulerClickAction: (scale: number) => void;
        scrollAction: (t: string, scale: number) => void;


        eventShowList: Array<any> = [];

        private _eventHandler: iScrollViewEventHandler;

        get handler(): iScrollViewEventHandler {
            return this._eventHandler;
        }

        set handler(h: iScrollViewEventHandler) {
            this._eventHandler = h;
            h.target = this;
        }

        borderColor: string = 'blue';

        removeListBtn() {
            if (this._listButton.parent) {
                this._listButton.parent.removeChild(this._listButton);
            }
        }

        set bgSRC(src: string) {
            this._bg.src = src;
        }

        set scrollbgSRC(src: string) {
            this._scroll_bg.src = src;
        }

        set scrollPressbgSRC(src: string) {
            this._scroll_bg_press.src = src;
        }

        get fakeWidth(): number {
            return this.width - ScrollView.SCROLL_WIDTH
        }

        set scale(scale: number) {
            var s = scale < 0 ? 0 : (scale > 1 ? 1 : scale);
            this._scale = s;
            this._scrollButton.left = s * this.fakeWidth;
            this.sUpdata();

            if (this.scaleChangeAction) {
                this.scaleChangeAction(this._scale);
            }

        }

        get scale(): number {
            return this._scale;
        }

        constructor() {
            super();
            this._scrollButton = new view.View();
            this.height = this._scrollButton.width = this._scrollButton.height = ScrollView.SCROLL_WIDTH;
            this._pen = new iPen(this.canvas);
            this._bg = new Image();
            this._scroll_bg = new Image();
            this._scroll_bg_press = new Image();

            this._handler = new ScrollViewBtnHandler(this);
            this._listButton = new ListButton(this._handler);

            this.setBackGround(this._bg);
            this._scrollButton.setBackGround(this._scroll_bg);

            this.addChild(this._scrollButton);

            this.bgSRC = 'lib/img/RulerBg.png';
            this.scrollbgSRC = 'lib/img/btn1.png';
            this.scrollPressbgSRC = 'lib/img/btn1_press.png'
            this.scrollBtnImg = 'lib/img/btn2.png';
            this.scrollBtnImg_press = 'lib/img/btn2_press.png';

            this._scrollButton.addTouchEventListener((e) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        this._scrollButton.setBackGround(this._scroll_bg_press);
                        this._scrollOFF = e.clientX - this._scrollButton.left;
                        if (this.scrollAction) {
                            this.scrollAction(e.touchType, this._scale);
                        }

                        break;
                    case view.View.MOVE:
                        var left = e.clientX - this._scrollOFF;
                        left = left < 0 ? 0 : (left > this.fakeWidth ? this.fakeWidth : left);

                        if (this.type == ScrollViewType.SMALLDATA) {
                            var scale = left / this.fakeWidth;
                            this.scale = scale;
                        } else {
                            this._scrollButton.left = left;
                        }

                        if (this.scrollAction) {
                            this.scrollAction(e.touchType, this._scale);
                        }

                        break;
                    case view.View.UP:
                        this._scrollButton.setBackGround(this._scroll_bg);
                        if (this.type != ScrollViewType.SMALLDATA) {
                            var left = e.clientX - this._scrollOFF;
                            left = left < 0 ? 0 : (left > this.fakeWidth ? this.fakeWidth : left);
                            var scale = left / this.fakeWidth;
                            this.scale = scale;
                        }

                        if (this.scrollAction) {
                            this.scrollAction(e.touchType, this._scale);
                        }
                        break;
                }

                this._scrollButton.sUpdata();
                return true;
            })

            var b = true;
            this.addTouchEventListener((e) => {
                if (e.touchType == view.View.DOWN) {
                    b = true;
                }

                if (e.type == view.View.TOUCH_DOWN) {
                    var scale = e.offX / this.fakeWidth;
                    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
                    this.eventShowList = [];
                    for (var i = 0; i < this.handler.getMaxNum(); i++) {
                        var s = this.handler.getEventScale(i);
                        if (s > scale - 0.01 && s < scale + 0.01) {
                            var obj = { 'scale': s, 'name': this.handler.getEventName(i) };
                            this.eventShowList.push(obj);
                        }
                    }

                    if (this.eventShowList.length > 0) {
                        this._handler.upDataList();
                        this._listButton.onCreate();
                        this._listButton.top = this.top - this._listButton.height;
                        var x = e.offX - this._handler.getBtnWidth() / 2;
                        x = x < 0 ? 0 : x > this.width - this._handler.getBtnWidth() ? this.width - this._handler.getBtnWidth() : x;
                        if (!this._listButton.parent) {
                            this._listButton.left = x;
                            this.parent.addChild(this._listButton);
                            b = false;
                        }

                    } else {
                        this.removeListBtn();
                    }
                }

                if (b) {
                    switch (e.touchType) {
                        case view.View.UP:
                            var scale = e.offX / this.fakeWidth;
                            this.scale = scale;

                            if (this.rulerClickAction) {
                                this.rulerClickAction(scale);
                            }

                            break;
                    }
                }

                this._scrollButton.sUpdata();
                return true;
            })

            this.addFloatMoveEvent((e) => {
                if (!this.handler || !this.isShowEvents) {
                    return false;
                }

                switch (e.touchType) {
                    case view.View.MOVE:

                        var scale = e.offX / this.fakeWidth;
                        scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
                        this.eventShowList = [];
                        for (var i = 0; i < this.handler.getMaxNum(); i++) {
                            var s = this.handler.getEventScale(i);
                            if (s > scale - 0.01 && s < scale + 0.01) {
                                var obj = { 'scale': s, 'name': this.handler.getEventName(i) };
                                this.eventShowList.push(obj);
                            }
                        }

                        if (this.eventShowList.length > 0) {
                            this._handler.upDataList();
                            this._listButton.onCreate();
                            this._listButton.height = this._handler.getMaxNum() * this._handler.getBtnHight() + 1;
                            this._listButton.top = this.top - this._listButton.height;
                            var x = e.offX - this._handler.getBtnWidth() / 2;
                            x = x < 0 ? 0 : x > this.width - this._handler.getBtnWidth() ? this.width - this._handler.getBtnWidth() : x;
                            if (!this._listButton.parent) {
                                this._listButton.left = x;
                                this.parent.addChild(this._listButton);
                            }

                        } else {
                            this.removeListBtn();
                        }

                        break;
                }
                return true;
            })

            this._listButton.addFloatMoveEvent((e) => {
                switch (e.touchType) {
                    case view.View.FLOAT_END:
                        this.removeListBtn();
                        break;
                }
                return true;
            })

            this.onDraw = (ctx) => {
                if (this.handler && this.isShowEvents) {
                    for (var i = 0; i < this.handler.getMaxNum(); i++) {
                        A: switch (this.handler.getEventType(i)) {
                            case ScrollView.SCROLL_EVENTS_TYPE_LINE:
                                this._pen.readDraw(this.handler.getEventColor(i), 1);
                                var x = this.handler.getEventScale(i) * this.fakeWidth;
                                ctx.moveTo(x, 0);
                                ctx.lineTo(x, this.height);
                                this._pen.drawOver();
                                break A;
                            case ScrollView.SCROLL_EVENTS_TYPE_RECT:
                                this._pen.readDraw(this.handler.getEventColor(i), 5);
                                var x = this.handler.getEventScale(i) * this.fakeWidth;
                                ctx.moveTo(x, 0);
                                ctx.lineTo(x, this.height / 2);
                                ctx.fillStyle = this.handler.getEventColor(i);
                                ctx.fillRect(x, 0, this.handler.getEventLength(i) * this.fakeWidth, this.height / 2);
                                this._pen.drawOver();
                                break A;
                        }
                    }
                }

                this._pen.readDraw(this.borderColor, 2);
                ctx.rect(0, 0, this.width, this.height);
                this._pen.drawOver();

            }
        }

        onCreate(w: number) {
            this.width = w;
            this._scrollButton.left = this._scale * w;
            this.sUpdata();
        }
    }


    /**
     * 提供简洁的下拉菜单使用方案，类似listView，创建时必须拥有已实现的iBtnHandler支持
     */
    export class ListButton extends view.Container {

        private _handler: iBtnHandler;
        get handler(): iBtnHandler {
            return this._handler;
        }

        constructor(handler: iBtnHandler) {
            super();
            this._handler = handler;
            this.layout = new EasyLayout(this);
            this.initHW();
            this.onCreate();
        }

        initHW() {
            this.height = this._handler.getMaxNum() * this._handler.getBtnHight();
            this.width = this._handler.getBtnWidth();
        }

        onCreate() {

            this.cleanChildren();

            for (var i = 0; i < this._handler.getMaxNum(); i++) {
                var btn = this._handler.getBtn(i);
                btn.width = this._handler.getBtnWidth();
                btn.height = this._handler.getBtnHight();
                this.addChild(btn);
            }
            (<EasyLayout>this.layout).maxHeight = 0;
            this.upDataLayout();
        }
    }

    export interface iScrollViewEventHandler {
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
    export interface iBtnHandler {
        getMaxNum(): number;
        getBtnHight(): number;
        getBtnWidth(): number;
        getBtn(index: number): Button;

    }

    /**
     * 提供按钮功能
     */
    export class Button extends view.View {
        _btn_bg: HTMLImageElement;
        _btn_bg_press: HTMLImageElement;
        private _clickFun: () => void;
        private _txt: string = 'Button';
        private _txtColor: string = 'black';
        private _txtFont: number = 14;
        private _pen: iPen;


        set txt(s: string) {
            this._txt = s;
            this.sUpdata();
        }

        get txt(): string {
            return this._txt;
        }

        set txtColor(s: string) {
            this._txtColor = s;
            this.sUpdata();
        }

        get txtColor(): string {
            return this._txtColor;
        }

        set txtFont(n: number) {
            this._txtFont = n;
            this.sUpdata();
        }

        get txtFont(): number {
            return this._txtFont;
        }

        addClickEvent(fun: () => void) {
            this._clickFun = fun;
        }

        constructor() {
            super();
            this._pen = new iPen(this.canvas);
            this.width = 60;
            this.height = 30;

            this._btn_bg = new Image();
            this._btn_bg.src = 'src/lib/img/btn.png';

            this._btn_bg_press = new Image();
            this._btn_bg_press.src = 'src/lib/img/btn_press.png';

            this.setBackGround(this._btn_bg);

            this.onDraw = (ctx) => {
                this._pen.readDraw(this._txtColor, 1);
                ctx.font = this._txtFont + 'px SimHei';
                var w = ctx.measureText(this._txt).width;
                var x = (this.width - w) / 2 - 2;
                x = x > 0 ? x : 0;
                ctx.fillStyle = this._txtColor;
                ctx.fillText(this._txt, x, this.height / 2 + this._txtFont / 4, this.width);
                this._pen.drawOver();
            }

            this.addTouchEventListener((e) => {
                switch (e.touchType) {
                    case view.View.DOWN:
                        this.setBackGround(this._btn_bg_press);
                        break;
                    case view.View.UP:
                        this.setBackGround(this._btn_bg);

                        if (this._clickFun && e.target == this.parent.canvas && e.offX > this.left && e.offX < this.right && e.offY > this.top && e.offY < this.bottom) {
                            this._clickFun();
                        }
                        break;
                    default:
                        break;
                }
                return true;
            });
        }

    }
}
