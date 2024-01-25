import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors, GameMode } from "../enums";

export class SettingsPopup extends Popup {
    private _mode: GameMode = GameMode.Easy;
    private _easyModeBtn!: Button;
    private _mediumModeBtn!: Button;
    private _difficultModeBtn!: Button;
    private _customModeBtn!: Button;
    private _cancelBtn!: Button;
    private _saveBtn!: Button;

    public onModeChange: Function;
    public onCancel!: Function;
    public onSave!: Function;

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        this._visible = value;
        this._easyModeBtn.enabled = value;
        this._mediumModeBtn.enabled = value;
        this._difficultModeBtn.enabled = value;
        this._customModeBtn.enabled = value;
        this._cancelBtn.enabled = value;
        this._saveBtn.enabled = value;
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.onModeChange = (mode: GameMode) => null; //TODO: not necesseary anymore??!!
        this.onCancel = () => null;
        this.onSave = (mode: GameMode) => null;
    }
    
    protected drawPopupInternal(): void {
        Label.drawText(this._context, 
            'Game mode:', 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        this._components.forEach(component => component.draw());
    }

    protected createInputsInternal(): void {
        this._easyModeBtn = new Button(this._context);
        this._easyModeBtn.parent = this;
        this._easyModeBtn.positionX = Popup.padding;
        this._easyModeBtn.positionY = Popup.headerSize + Popup.padding + 15;
        this._easyModeBtn.text = "Easy";
        this._easyModeBtn.font = "bold 15px sans-serif";
        this._easyModeBtn.width = 340;
        this._easyModeBtn.checked = true;
        this._easyModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Easy);

        this._mediumModeBtn = new Button(this._context);
        this._mediumModeBtn.parent = this;
        this._mediumModeBtn.positionX = Popup.padding;
        this._mediumModeBtn.positionY = Popup.headerSize + Popup.padding + 65;
        this._mediumModeBtn.text = "Medium";
        this._mediumModeBtn.font = "bold 15px sans-serif";
        this._mediumModeBtn.width = 340;
        this._mediumModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Medium);

        this._difficultModeBtn = new Button(this._context);
        this._difficultModeBtn.parent = this;
        this._difficultModeBtn.positionX = Popup.padding;
        this._difficultModeBtn.positionY = Popup.headerSize + Popup.padding + 115;
        this._difficultModeBtn.text = "Difficult";
        this._difficultModeBtn.font = "bold 15px sans-serif";
        this._difficultModeBtn.width = 340;
        this._difficultModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Difficult);

        this._customModeBtn = new Button(this._context);
        this._customModeBtn.parent = this;
        this._customModeBtn.positionX = Popup.padding;
        this._customModeBtn.positionY = Popup.headerSize + Popup.padding + 165;
        this._customModeBtn.text = "Custom";
        this._customModeBtn.font = "bold 15px sans-serif";
        this._customModeBtn.width = 340;
        this._customModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Custom);

        this._cancelBtn = new Button(this._context);
        this._cancelBtn.parent = this;
        this._cancelBtn.positionX = Popup.padding;
        this._cancelBtn.positionY = Popup.headerSize + Popup.padding + 310;
        this._cancelBtn.text = "Cancel";
        this._cancelBtn.font = "bold 15px sans-serif";
        this._cancelBtn.width = 165;
        this._cancelBtn.height = 30;
        this._cancelBtn.onClick = this.cancel.bind(this);

        this._saveBtn = new Button(this._context);
        this._saveBtn.parent = this;
        this._saveBtn.positionX = 195;
        this._saveBtn.positionY = Popup.headerSize + Popup.padding + 310;
        this._saveBtn.text = "Save";
        this._saveBtn.font = "bold 15px sans-serif";
        this._saveBtn.width = 165;
        this._saveBtn.height = 30;
        this._saveBtn.onClick = this.save.bind(this);

        this._components.push(this._easyModeBtn);
        this._components.push(this._mediumModeBtn);
        this._components.push(this._difficultModeBtn);
        this._components.push(this._customModeBtn);
        this._components.push(this._cancelBtn);
        this._components.push(this._saveBtn);
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave)
            this.onSave(this._mode);
    }

    public changeGameMode(mode: GameMode): void {
        this._mode = mode;
        this.refreshButtonsState();
    }

    private refreshButtonsState(): void {
        switch(this._mode) {
            case GameMode.Easy:
                this._easyModeBtn.checked = true;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Medium:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = true;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Difficult:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = true;
                this._customModeBtn.checked = false;
                break;
            case GameMode.Custom:
                this._easyModeBtn.checked = false;
                this._mediumModeBtn.checked = false;
                this._difficultModeBtn.checked = false;
                this._customModeBtn.checked = true;
                break;
        }
    }
}