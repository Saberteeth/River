import river from '../class';
declare module widget {
    /**
     * 提供按钮功能
     */
    class Button extends river.View {
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
export default widget;
