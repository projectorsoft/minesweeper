export interface IEventBus {
    subscribe(event: string, callback: Function): void;
    emit<T>(event: string, args?: T): void;
}