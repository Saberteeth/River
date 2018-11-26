import View from "./View";
import iContainer from "../../interface/iContainer";
import iLayout from "../../interface/iLayout";
import TouchEvent from "../../interface/TouchEvent";
export default class Container extends View implements iContainer {
    private _children;
    private _actionChild;
    private _layout;
    removeChildrenByClass(clazzs: Array<Function>): void;
    layout: iLayout;
    upDataLayout(): void;
    readonly children: Array<View>;
    contianerDraw(ctx: CanvasRenderingContext2D | null): void;
    cleanChildren(): void;
    hasID(v: View): boolean;
    getViewByID(id: string): View | null;
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
