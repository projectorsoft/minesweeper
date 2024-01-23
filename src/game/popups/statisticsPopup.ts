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
            'Last game:', 
            this.positionX + 20, 
            this.positionY + 50, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Time: ${ this._statistics.lastGame ? this._statistics.lastGame.time : 0 }s`, 
            this.positionX + 20, 
            this.positionY + 75, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Clicks: ${ this._statistics.lastGame ? this._statistics.lastGame.clicks : 0 }`, 
            this.positionX + 20, 
            this.positionY + 100, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            'Best games:', 
            this.positionX + 20, 
            this.positionY + 145, { 
            size: 14,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Easy: ${ this._statistics.easyModeBestTime ? this.formatRecord(this._statistics.easyModeBestTime) : 'none' }`, 
            this.positionX + 20, 
            this.positionY + 170, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Medium: ${ this._statistics.mediumModeBestTime ? this.formatRecord(this._statistics.mediumModeBestTime) : 'none' }`, 
            this.positionX + 20, 
            this.positionY + 195, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Difficult: ${ this._statistics.difficultModeBestTime ? this.formatRecord(this._statistics.difficultModeBestTime) : 'none' }`, 
            this.positionX + 20, 
            this.positionY + 220, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Custom: ${ this._statistics.customModeBestTime ? this.formatRecord(this._statistics.customModeBestTime) : 'none' }`, 
            this.positionX + 20, 
            this.positionY + 245, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });
        
        this._closeBtn.draw();
    }

    protected createInputsInternal(): void {
        this._closeBtn = new Button(this._context);
        this._closeBtn.parent = this;
        this._closeBtn.positionX = 100;
        this._closeBtn.positionY = 265;
        this._closeBtn.text = "Close";
        this._closeBtn.font = "bold 15px sans-serif";
        this._closeBtn.width = 90;
        this._closeBtn.height = 25;
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