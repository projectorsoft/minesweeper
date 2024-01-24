import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";
import { Statistics, StatisticsRecord } from "../services/statistics";
import { StatisticsService } from "../services/statisticsService";

export class StatisticsPopup extends Popup {
    private _statisticsService: StatisticsService;
    private _statistics: Statistics;
    private _closeBtn!: Button;

    public onClose!: Function;

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this._closeBtn.enabled = value;

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
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Time: ${ this._statistics.lastGame ? this._statistics.lastGame.time : 0 }s`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 25, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Clicks: ${ this._statistics.lastGame ? this._statistics.lastGame.clicks : 0 }`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 50, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            'BEST GAMES:', 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 75, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Easy: ${ this._statistics.easyModeBestTime ? this.formatRecord(this._statistics.easyModeBestTime) : 'none' }`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 100, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Medium: ${ this._statistics.mediumModeBestTime ? this.formatRecord(this._statistics.mediumModeBestTime) : 'none' }`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 125, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Difficult: ${ this._statistics.difficultModeBestTime ? this.formatRecord(this._statistics.difficultModeBestTime) : 'none' }`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 150, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });

        Label.drawText(this._context, 
            `Custom: ${ this._statistics.customModeBestTime ? this.formatRecord(this._statistics.customModeBestTime) : 'none' }`, 
            this.positionX + Popup.padding, 
            this.positionY + Popup.headerSize + Popup.padding + 175, { 
            size: 13,
            align: 'left',
            color: Colors.Black
        });
        
        this._closeBtn.draw();
    }

    protected createInputsInternal(): void {
        this._closeBtn = new Button(this._context);
        this._closeBtn.parent = this;
        this._closeBtn.positionX = Popup.padding;
        this._closeBtn.positionY = 270;
        this._closeBtn.text = "Close";
        this._closeBtn.font = "bold 15px sans-serif";
        this._closeBtn.width = 240;
        this._closeBtn.height = 30;
        this._closeBtn.onClick = this.close.bind(this);

        this._components.push(this._closeBtn);
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