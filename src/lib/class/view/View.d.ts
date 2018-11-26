import ViewType from '../../enum/ViewType';
import Container from '../view/Container';
import Activity from '../../class/view/Activity';
import { Animation } from '../animation/Animation';
import TouchEvent from "../../interface/TouchEvent";
/**
 * 显示对象的封装类，同时持有自我绘制能力，如需要自我绘制需为 onDraw: (ctx: CanvasRenderingContext2D) => void;字段赋值
 */
export default class View {
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
    animations: Animation[];
    addAnimations(a: Animation): void;
    /**
     * 设置纹理背景
     */
    setBackGround(i: HTMLImageElement): void;
    /**
     * 获取在activity视图中的次序
     */
    getIndexForParents: () => number;
    /**
     * 改变位置
     */
    changeIndexForParents(newIndex: number): void;
    _left: number;
    _top: number;
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
    right: number;
    /**
     * 显示对象下边距
     */
    bottom: number;
    private _nowType;
    private _canvas;
    private _touchListener;
    private _activity;
    private _container;
    private _floatMoveListener;
    private _mouseWheelListener;
    private _ctx;
    /**
     * 获取2d对象
     */
    readonly ctx: CanvasRenderingContext2D | null;
    readonly canvas: HTMLCanvasElement;
    /**
     * 获得顶层activity对象。
     */
    readonly activity: Activity | null;
    /**
     * 获得承载该view的容器对象。
     */
    readonly container: Container | Activity | null;
    /**
     * 此函数由activity控制操作，请避免使用
     */
    addActivity(a: Activity | null): boolean;
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
    ignoreLayout: boolean;
    constructor();
    private init;
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
    onDraw: (ctx: CanvasRenderingContext2D | null) => void;
    /**
     * 此函数由activity控制操作，请避免使用
     */
    draw(ctx: CanvasRenderingContext2D | null): void;
}
