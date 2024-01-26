import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";
import { Statistics, StatisticsRecord } from "../services/statistics";
import { StatisticsService } from "../services/statisticsService";

export class StatisticsPopup extends Popup {
    private _statisticsService: StatisticsService;
    private _statistics: Statistics;

    public onClose!: Function;

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this._components.forEach(cmp => cmp.enabled = value);

        if (value)
            this._statistics = this._statisticsService.getStatistics();
    }

    public constructor(context: CanvasRenderingContext2D,
        statisticsService: StatisticsService) {
        super(context);

        this._statisticsService = statisticsService;
        this._statistics = this._statisticsService.getStatistics();

        this.onClose = () => null;
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
            `Time: ${ this._statistics.lastGame ? this._statistics.lastGame.time : 0 }s`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 25, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Clicks: ${ this._statistics.lastGame ? this._statistics.lastGame.clicks : 0 }`, 
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
            `Easy: ${ this._statistics.easyModeBestTime ? this.formatRecord(this._statistics.easyModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 100, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Medium: ${ this._statistics.mediumModeBestTime ? this.formatRecord(this._statistics.mediumModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 125, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Difficult: ${ this._statistics.difficultModeBestTime ? this.formatRecord(this._statistics.difficultModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 150, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Custom: ${ this._statistics.customModeBestTime ? this.formatRecord(this._statistics.customModeBestTime) : 'none' }`, 
            this.positionX + Popup.Padding, 
            this.positionY + Popup.HeaderSize + Popup.Padding + 175, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });
        
        this._components.forEach(cmp => cmp.draw());
    }

    protected createInputsInternal(): void {
        const closeBtn = new Button(this._context);
        closeBtn.parent = this;
        closeBtn.positionX = Popup.Padding;
        closeBtn.positionY = 270;
        closeBtn.text = "Close";
        closeBtn.font = "bold 15px sans-serif";
        closeBtn.width = 240;
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
            return `${record.time}s (${record.clicks}) clicks at ${record.date}`;

        return 'none';
    }
}