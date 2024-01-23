import { InputEvent } from "../enums";

export class TapHelper {
    private static _timerId: number = null;
    public static result: InputEvent;

    public static check(): void {
        if (!this._timerId) {
            this._timerId = window.setTimeout(() => { 
                this._timerId = null;
                this.result = InputEvent.OnTap;
            }, 400);
        } else {
            window.clearTimeout(this._timerId);
            this._timerId = null;
            this.result =  InputEvent.OnDoubleTap;
        }
    }

    public static onTouchStart(): void {
        this.result = InputEvent.OnTap;
        this._timerId = window.setTimeout(() => { 
            this._timerId = null;
            this.result = InputEvent.OnDoubleTap;
        }, 400);
    }

    public static onTouchEnd(): void {
        window.clearTimeout(this._timerId);
        this._timerId = null;
    }
}