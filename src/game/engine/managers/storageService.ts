export class StorageService<T> {
    public constructor() {
    }

    public get(key: string): T | null {
        return JSON.parse(localStorage.getItem(key)) as T | null;
    }

    public update(key: string, data: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.log('Cannot update statictiscs.');
        }
    }

    public isSupported(): boolean {
        if (!window.localStorage)
            return false;

        return true;
    }

    public keyExists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public clear(key: string): void {
        localStorage.removeItem(key);
    }
}