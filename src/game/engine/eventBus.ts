import { IEventBus } from "./IEventBus";
import { ISubscriber } from "./ISubscriber";

export class EventBus implements IEventBus {
    private static _instance?: EventBus = undefined;
    private static _id: number  = 0;

    private _subscribers: ISubscriber = {};

    private constructor() {
    }

    public static getInstance(): IEventBus {
        if (!this._instance)
            this._instance = new EventBus();

        return this._instance;
    }

    public subscribe(event: string, callback: Function): void {
        const id = this.getNextId();

        if (!this._subscribers[event])
            this._subscribers[event] = {};

        this._subscribers[event][id] = callback;
    }

    public emit<T>(event: string, args?: T): void {
        const subscriber = this._subscribers[event];

        if (!subscriber)
            return;

        Object.keys(subscriber).forEach((key) => {
            subscriber[key](args);
        })
    }

    private getNextId(): number {
        return EventBus._id++;
    }
}