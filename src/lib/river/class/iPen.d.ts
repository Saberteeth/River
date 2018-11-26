/**
 * Canvas辅助类
 */
export default class iPen {
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
     * 准备绘图
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
