import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";
import { Helpers } from "../helpers/helpers";
import { Settings, StatisticsRecord } from "../services/settings";
import { SettingsService } from "../services/settingsService";

export class StatisticsPopup extends Popup {
    private _settingsService: SettingsService;
    private _settings: Settings;

    public onClose: Function = () => null;

    public override set visible(value: boolean) {
        this._visible = value;

        if (value)
            this._settings = this._settingsService.get();
    }

    public constructor(context: CanvasRenderingContext2D,
        settingsService: SettingsService) {
        super(context);

        this._settingsService = settingsService;
        this._settings = this._settingsService.get();
    }

    protected drawPopupInternal(): void {
        Label.drawText(this._context, 
            'LAST GAME:', 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Time: ${ this._settings.statistics.lastGame ? Helpers.roundTimeToSeconds(this._settings.statistics.lastGame.time) : 0 }s`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 25, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Clicks: ${ this._settings.statistics.lastGame ? this._settings.statistics.lastGame.clicks : 0 }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 50, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            'BEST GAMES:', 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 75, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Easy: ${ this._settings.statistics.easyModeBestTime ? this.formatRecord(this._settings.statistics.easyModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 100, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Medium: ${ this._settings.statistics.mediumModeBestTime ? this.formatRecord(this._settings.statistics.mediumModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 125, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Difficult: ${ this._settings.statistics.difficultModeBestTime ? this.formatRecord(this._settings.statistics.difficultModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 150, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Custom: ${ this._settings.statistics.customModeBestTime ? this.formatRecord(this._settings.statistics.customModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 175, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            'SCORES:', 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 200, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Won: ${ this._settings.statistics.gamesWon ? this._settings.statistics.gamesWon : 0 }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 225, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Lost: ${ this._settings.statistics.gamesLost ? this._settings.statistics.gamesLost : 0 }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 250, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });
        
        this._components.forEach(cmp => cmp.draw());
    }

    protected clickInternal(x: number, y: number): void {
    }
    protected mouseMoveInternal(x: number, y: number): void {
    }

    protected createInputsInternal(): void {
        const closeBtn = new Button(this._context);
        closeBtn.parent = this;
        closeBtn.positionX = Popup.Padding;
        closeBtn.positionY = 330;
        closeBtn.text = "Close";
        closeBtn.font = "bold 15px sans-serif";
        closeBtn.width = 280;
        closeBtn.height = 30;
        closeBtn.onClick = this.close.bind(this);

        this.addComponent('closeBtn', closeBtn);
    }

    private close(): void {
        if (this.onClose)
            this.onClose();
    }

    private isEmptyRecord(record: StatisticsRecord): boolean {
        return !record.time && !record.clicks && !record.date;
    }

    private formatRecord(record: StatisticsRecord): string {
        if (!this.isEmptyRecord(record))
            return `${Helpers.roundTimeToSeconds(record.time)}s (${record.clicks}) clicks at ${record.date}`;

        return 'none';
    }
}