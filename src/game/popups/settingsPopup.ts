import { Alert } from "../engine/inputs/alert";
import { Button } from "../engine/inputs/button";
import { CheckBox } from "../engine/inputs/checkBox";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { AlertType, Colors, GameMode } from "../enums";
import { SettingsService } from "../services/settingsService";

export class SettingsPopup extends Popup {
    private _mode: GameMode = GameMode.Easy;
    private _luckyGuess: boolean = false;
    private _allowQuestionMark: boolean = true;

    public onCancel: Function = () => null;
    public onSave: Function = (mode: GameMode, luckyGuess: boolean, allowQuestionMark: boolean) => null;
    public onStatisticsCleard: Function = () => null;

    public constructor(context: CanvasRenderingContext2D,
        settingsService: SettingsService) {
        super(context, settingsService);

        this._settingsService = settingsService;
    }
    
    protected drawPopupInternal(): void {
        Label.drawText(this._context, 
            'GAME MODE:', 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            'STATISTICS:', 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 225, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        this._components.forEach(component => component.draw());
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    protected createInputsInternal(): void {
        const easyModeBtn = new Button(this._context);
        easyModeBtn.parent = this;
        easyModeBtn.positionX = Popup.Padding;
        easyModeBtn.positionY = Popup.HeaderSize + Popup.Padding + 15;
        easyModeBtn.text = "Easy";
        easyModeBtn.font = "bold 15px sans-serif";
        easyModeBtn.width = 340;
        easyModeBtn.checked = true;
        easyModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Easy);

        const mediumModeBtn = new Button(this._context);
        mediumModeBtn.parent = this;
        mediumModeBtn.positionX = Popup.Padding;
        mediumModeBtn.positionY = Popup.HeaderSize + Popup.Padding + 65;
        mediumModeBtn.text = "Medium";
        mediumModeBtn.font = "bold 15px sans-serif";
        mediumModeBtn.width = 340;
        mediumModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Medium);

        const difficultModeBtn = new Button(this._context);
        difficultModeBtn.parent = this;
        difficultModeBtn.positionX = Popup.Padding;
        difficultModeBtn.positionY = Popup.HeaderSize + Popup.Padding + 115;
        difficultModeBtn.text = "Difficult";
        difficultModeBtn.font = "bold 15px sans-serif";
        difficultModeBtn.width = 340;
        difficultModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Difficult);

        const customModeBtn = new Button(this._context);
        customModeBtn.parent = this;
        customModeBtn.positionX = Popup.Padding;
        customModeBtn.positionY = Popup.HeaderSize + Popup.Padding + 165;
        customModeBtn.text = "Custom";
        customModeBtn.font = "bold 15px sans-serif";
        customModeBtn.width = 340;
        customModeBtn.onClick = this.changeGameMode.bind(this, GameMode.Custom);

        const clearStatisticsBtn = new Button(this._context);
        clearStatisticsBtn.parent = this;
        clearStatisticsBtn.positionX = Popup.Padding;
        clearStatisticsBtn.positionY = Popup.HeaderSize + Popup.Padding + 240;
        clearStatisticsBtn.text = "Clear statistics";
        clearStatisticsBtn.font = "bold 15px sans-serif";
        clearStatisticsBtn.width = 340;
        clearStatisticsBtn.onClick = this.clearStatistics.bind(this);

        const luckyGuessCheck = new CheckBox(this._context);
        luckyGuessCheck.parent = this;
        luckyGuessCheck.positionX = Popup.Padding;
        luckyGuessCheck.positionY = Popup.HeaderSize + Popup.Padding + 290;
        luckyGuessCheck.text = "Safe first click";
        luckyGuessCheck.font = "bold 15px sans-serif";
        luckyGuessCheck.width = 20;
        luckyGuessCheck.height = 20;
        luckyGuessCheck.onClick = this.setLuckyGuess.bind(this);
        luckyGuessCheck.createComponents();

        const allowQuestionMarkCheck = new CheckBox(this._context);
        allowQuestionMarkCheck.parent = this;
        allowQuestionMarkCheck.positionX = 195;
        allowQuestionMarkCheck.positionY = Popup.HeaderSize + Popup.Padding + 290;
        allowQuestionMarkCheck.text = "Allow question mark";
        allowQuestionMarkCheck.font = "bold 15px sans-serif";
        allowQuestionMarkCheck.width = 20;
        allowQuestionMarkCheck.height = 20;
        allowQuestionMarkCheck.checked = true;
        allowQuestionMarkCheck.onClick = this.setAllowQuestionMark.bind(this);
        allowQuestionMarkCheck.createComponents();

        const cancelBtn = new Button(this._context);
        cancelBtn.parent = this;
        cancelBtn.positionX = Popup.Padding;
        cancelBtn.positionY = Popup.HeaderSize + Popup.Padding + 325;
        cancelBtn.text = "Cancel";
        cancelBtn.font = "bold 15px sans-serif";
        cancelBtn.width = 165;
        cancelBtn.height = 30;
        cancelBtn.backgroundColor = Colors.Danger;
        cancelBtn.highlightColor = Colors.RedHighlight;
        cancelBtn.onClick = this.cancel.bind(this);

        const saveBtn = new Button(this._context);
        saveBtn.parent = this;
        saveBtn.positionX = 195;
        saveBtn.positionY = Popup.HeaderSize + Popup.Padding + 325;
        saveBtn.text = "Save";
        saveBtn.font = "bold 15px sans-serif";
        saveBtn.width = 165;
        saveBtn.height = 30;
        saveBtn.backgroundColor = Colors.Success;
        saveBtn.highlightColor = Colors.GreenHighlight;
        saveBtn.onClick = this.save.bind(this);

        const alert = new Alert(this._context);
        alert.text = 'Statistics have been cleard';

        this.addComponent('easyModeBtn', easyModeBtn);
        this.addComponent('mediumModeBtn', mediumModeBtn);
        this.addComponent('difficultModeBtn', difficultModeBtn);
        this.addComponent('customModeBtn', customModeBtn);
        this.addComponent('luckyGuessCheck', luckyGuessCheck);
        this.addComponent('allowQuestionMarkCheck', allowQuestionMarkCheck);
        this.addComponent('clearStatisticsBtn', clearStatisticsBtn);
        this.addComponent('cancelBtn', cancelBtn);
        this.addComponent('saveBtn', saveBtn);
        this.addComponent('alert', alert);
    }

    private cancel(): void {
        if (this.onCancel)
            this.onCancel();
    }

    private save(): void {
        if (this.onSave)
            this.onSave(this._mode, this._luckyGuess, this._allowQuestionMark);
    }

    private clearStatistics(): void {
        this._settingsService.clearStatistics();

        const alert = (this.getComponent('alert') as Alert);
        alert.type = AlertType.Success;
        alert.visible = true;

        if (this.onStatisticsCleard)
            this.onStatisticsCleard();
    }

    private setLuckyGuess(): void {
        this._luckyGuess = (this.getComponent('luckyGuessCheck') as CheckBox).checked;
    }

    public changeLuckyGuess(value: boolean): void {
        this._luckyGuess = value;
        (this.getComponent('luckyGuessCheck') as CheckBox).checked = value;
    }

    private setAllowQuestionMark(): void {
        this._allowQuestionMark = (this.getComponent('allowQuestionMarkCheck') as CheckBox).checked;
    }

    public changeAllowQuestionMark(value: boolean): void {
        this._allowQuestionMark = value;
        (this.getComponent('allowQuestionMarkCheck') as CheckBox).checked = value;
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