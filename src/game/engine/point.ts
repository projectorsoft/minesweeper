export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static isEqual(obj1: Point, obj2: Point): boolean {
        return obj1.x === obj2.x &&
            obj1.y === obj2.y;
    }
}