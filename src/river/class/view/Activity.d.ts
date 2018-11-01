import iContainer from '../../interface/iContainer';
import iLayout from '../../interface/iLayout';
import View from './View';
/**
   * 核心界面控制器，类似于Android中的Activity对象，拥有对添加其中的View对象的控制作用，
   * 并实际控制核心显示canvas的绘制，以及touch等事件分发。
   */
export default class Activity implements iContainer {
    private _children;
    private _activityView;
    private _lastFloatView;
    private _canvas;
    private _ctx;
    private _timers;
    private _layout;
    readonly children: Array<View>;
    layout: iLayout;
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
    getViewByID(id: string): View | null;
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
    private init;
    private _lastTime;
    private run;
    private initEvent;
}
