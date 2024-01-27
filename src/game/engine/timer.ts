export class  Timer {
    private _name: string;
    private _timerId: number = 0;
    private _startDate: Date = new Date();
    private _remaining: number;
    private _timeout: number;
    private _handler: Function;
    private _isInterval: boolean;

    public paused: boolean = false;

    public get timerId(): number {
        return this._timerId;
    }

    public constructor(name: string, handler: Function, timeout: number, isInterval: boolean = false) {
        this._name = name;
        this._handler = handler;
        this._timeout = timeout;
        this._remaining = timeout;
        this._isInterval = isInterval;

        this.start();
    }

    public pause(): void {
        clearTimeout(this._timerId);
        this._remaining -= (new Date().getTime() - this._startDate.getTime());
        //console.log(this._name, this._remaining);

        this.paused = true;
    }

    public start() {
        this._startDate = new Date();
        
        if (this._isInterval)
            this.createInterval();
        else
            this.createTimeout();

        this.paused = false;
    }

    private createTimeout() {
        this._timerId = window.setTimeout(() => {
            this._remaining = this._timeout;
            this._handler();
        }, this._timeout);
    }

    private createInterval() {
        this._timerId = window.setInterval(() => {
            this._remaining = this._timeout;
            this._handler();
        }, this._timeout);
    }
}