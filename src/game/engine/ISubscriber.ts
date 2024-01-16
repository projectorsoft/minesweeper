import { IEvent } from "./IEvent";

export interface ISubscriber {
    [key: string]: IEvent;
}
