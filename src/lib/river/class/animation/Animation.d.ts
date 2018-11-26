import View from "../view/View";
export declare abstract class Animation {
    isForever: boolean;
    cell: number;
    private timeOff;
    step(dt: number): boolean;
    abstract run: (v: View) => boolean;
}
