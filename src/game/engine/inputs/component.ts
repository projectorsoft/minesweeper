import { ComponentAlign } from "@/game/enums";

export abstract class Component {
    protected _context!: CanvasRenderingContext2D;
    protected _width: number = 100;
    protected _height: number = 40;
    protected _parent: Component;
    protected _positionX: number = 0;
    protected _positionY: number = 0;
    protected _enabled: boolean = true;
    protected _visible: boolean = true;
    private _componentlAlign: ComponentAlign = ComponentAlign.Start;
    protected _components: Map<string, Component> = new Map<string, Component>();

    public roundedCorners: boolean = false;

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }
    public get parent(): Component {
        return this._parent;
    }
    public set parent(value: Component) {
        this._parent = value;
    }
    public get positionX(): number {
        const parentPosX: number = this._parent ? this._parent.positionX : 0;

        if (this._componentlAlign === ComponentAlign.Start)
            return parentPosX + this._positionX;
        else {
            const parentWidth: number = this._parent ? this._parent.width : 0;
            return parentWidth - this._positionX - this._width;
        }
    }
    public set positionX(value: number) {
        this._positionX = value;
    }
    public get positionY(): number {
        const parentPosY: number = this._parent ? this._parent.positionY : 0;

        return parentPosY + this._positionY;
    }
    public set positionY(value: number) {
        this._positionY = value;
    }
    public get enabled(): boolean {
        return this.isEnabled();
    }
    public set enabled(value: boolean) {
        this._enabled = value;
    }
    public get visible(): boolean {
        return this.isVisible();
    }
    public set visible(value: boolean) {
        this._visible = value;
    }
    public get componentlAlign(): ComponentAlign {
        return this._componentlAlign;
    }
    public set componentlAlign(value: ComponentAlign) {
        this._componentlAlign = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    protected abstract drawInternal(): void;
    protected abstract clickInternal(x: number, y: number): void;
    protected abstract mouseMoveInternal(x: number, y: number): void;

    public draw(): void {
        if (!this.isVisible())
            return;

        this.drawInternal();
    }

    public click(x: number, y: number): void {
        if (!this.isVisible())
            return;
    
        if (!this.isEnabled())
            return;

        this.clickInternal(x, y);
    }

    public mouseMove(x: number, y: number): void {
        if (!this.isVisible())
            return;
    
        if (!this.isEnabled())
            return;

        this.mouseMoveInternal(x, y);
    }

    public addComponent(name: string, component: Component): void {
        if (this._components.has(name))
            throw `Component with name '${name}' already exists!`;

        this._components.set(`${name}`, component);
    }

    public getComponent(name: string): Component | undefined {
        return this._components.get(name);
    }

    protected isEnabled(): boolean {
        if (!this._parent)
            return this._enabled;

        if (!this._parent.isEnabled())
            return false;

        return this._enabled;
    }

    protected isVisible(): boolean {
        if (!this._parent)
            return this._visible;

        if (!this._parent.isVisible())
            return false;

        return this._visible;
    }
}