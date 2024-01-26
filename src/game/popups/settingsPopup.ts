import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors, GameMode } from "../enums";

export class SettingsPopup extends Popup {
    private _mode: GameMode = GameMode.Easy;

    public onCancel!: Function;
    public onSave!: Function;

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        this._visible = value;

        this._components.forEach(cmp => cmp.enabled = value);
    }

    public constructor(context: CanvasRenderingContext2D) {
        super(context);

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
        const easyModeBtn = new Button(this._context);
        easyModeBtn.parent = this;
        easyModeBtn.positionX = Popup.padding;
        easyModeBtn.positionY = Popup.headerSize + Popup.padding + 15;
        easyModeBtn.text = "Easy";
        easyModeBtn.font = "bold 15px sans-serif";
        easyModeBtn.width = 340;
        easyModeBtn.checked = true;
        easyModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Easy);

        const mediumModeBtn = new Button(this._context);
        mediumModeBtn.parent = this;
        mediumModeBtn.positionX = Popup.padding;
        mediumModeBtn.positionY = Popup.headerSize + Popup.padding + 65;
        mediumModeBtn.text = "Medium";
        mediumModeBtn.font = "bold 15px sans-serif";
        mediumModeBtn.width = 340;
        mediumModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Medium);

        const difficultModeBtn = new Button(this._context);
        difficultModeBtn.parent = this;
        difficultModeBtn.positionX = Popup.padding;
        difficultModeBtn.positionY = Popup.headerSize + Popup.padding + 115;
        difficultModeBtn.text = "Difficult";
        difficultModeBtn.font = "bold 15px sans-serif";
        difficultModeBtn.width = 340;
        difficultModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Difficult);

        const customModeBtn = new Button(this._context);
        customModeBtn.parent = this;
        customModeBtn.positionX = Popup.padding;
        customModeBtn.positionY = Popup.headerSize + Popup.padding + 165;
        customModeBtn.text = "Custom";
        customModeBtn.font = "bold 15px sans-serif";
        customModeBtn.width = 340;
        customModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Custom);

        const cancelBtn = new Button(this._context);
        cancelBtn.parent = this;
        cancelBtn.positionX = Popup.padding;
        cancelBtn.positionY = Popup.headerSize + Popup.padding + 310;
        cancelBtn.text = "Cancel";
        cancelBtn.font = "bold 15px sans-serif";
        cancelBtn.width = 165;
        cancelBtn.height = 30;
        cancelBtn.onClick = this.cancel.bind(this);

        const saveBtn = new Button(this._context);
        saveBtn.parent = this;
        saveBtn.positionX = 195;
        saveBtn.positionY = Popup.headerSize + Popup.padding + 310;
        saveBtn.text = "Save";
        saveBtn.font = "bold 15px sans-serif";
        saveBtn.width = 165;
        saveBtn.height = 30;
        saveBtn.onClick = this.save.bind(this);

        this.addComponent('easyModeBtn', easyModeBtn);
        this.addComponent('mediumModeBtn', mediumModeBtn);
        this.addComponent('difficultModeBtn', difficultModeBtn);
        this.addComponent('customModeBtn', customModeBtn);
        this.addComponent('cancelBtn', cancelBtn);
        this.addComponent('saveBtn', saveBtn);
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
                (this.getComponent('easyModeBtn') as Button).checked = true;
                (this.getComponent('mediumModeBtn') as Button).checked = false;
                (this.getComponent('difficultModeBtn') as Button).checked = false;
                (this.getComponent('customModeBtn') as Button).checked = false;
                break;
            case GameMode.Medium:
                (this.getComponent('easyModeBtn') as Button).checked = false;
                (this.getComponent('mediumModeBtn') as Button).checked = true;
                (this.getComponent('difficultModeBtn') as Button).checked = false;
                (this.getComponent('customModeBtn') as Button).checked = false;
                break;
            case GameMode.Difficult:
                (this.getComponent('easyModeBtn') as Button).checked = false;
                (this.getComponent('mediumModeBtn') as Button).checked = false;
                (this.getComponent('difficultModeBtn') as Button).checked = true;
                (this.getComponent('customModeBtn') as Button).checked = false;
                break;
            case GameMode.Custom:
                (this.getComponent('easyModeBtn') as Button).checked = false;
                (this.getComponent('mediumModeBtn') as Button).checked = false;
                (this.getComponent('difficultModeBtn') as Button).checked = false;
                (this.getComponent('customModeBtn') as Button).checked = true;
                break;
        }
    }
}