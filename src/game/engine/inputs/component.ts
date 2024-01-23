
export abstract class Component {
    protected _context!: CanvasRenderingContext2D;
    protected _parent: Component;
    protected _positionX: number = 0;
    protected _positionY: number = 0;
    protected _components: Component[] = [];

    public get parent(): Component {
        return this._parent;
    }
    public set parent(value: Component) {
        this._parent = value;
    }
    public get positionX(): number {
        return this._positionX;
    }
    public set positionX(value: number) {
        const parentPosX: number = this._parent ? this._parent.positionX : 0;
        this._positionX = parentPosX + value;
        this._components.forEach(input => {
            input._positionX += this._positionX;
            
            input._components.forEach(input => {
                input._positionX += this._positionX;
            });
        });
    }
    public get positionY(): number {
        return this._positionY;
    }
    public set positionY(value: number) {
        const parentPosY: number = this._parent ? this._parent.positionY : 0;
        this._positionY = parentPosY + value;

        this._components.forEach(input => {
            input._positionY += this._positionY;

            input._components.forEach(input => {
                input._positionY += this._positionY;
            });
        });
    }

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    protected abstract drawInternal(): void;

    public draw(): void {
        this.drawInternal();
    }
}