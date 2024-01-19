import { Button } from "../engine/inputs/button";
import { Label } from "../engine/inputs/label";
import { Point } from "../engine/point";
import { Popup } from "../engine/popup";
import { Colors } from "../enums";
import { Statistics, StatisticsRecord } from "../services/statistics";
import { StatisticsService } from "../services/statisticsService";

export class StatisticsPopup extends Popup {
    private _statisticsService: StatisticsService;
    private _statistics: Statistics;
    private _closeBtn!: Button;

    public onClose!: Function;

    public constructor(context: CanvasRenderingContext2D,
        statisticsService: StatisticsService) {
        super(context);

        this._statisticsService = statisticsService;
        this._statistics = this._statisticsService.getStatistics();
        this.createInputs();

        this.onClose = () => null;
    }

    protected drawInternal(): void {
        Label.drawText(this._context, 
            'Last game:', 
            this.position.x + 20, 
            this.position.y + 50, { 
            size: 15,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Time: ${ this._statistics.lastGame ? this._statistics.lastGame.time : 0 }s`, 
            this.position.x + 20, 
            this.position.y + 75, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Clicks: ${ this._statistics.lastGame ? this._statistics.lastGame.clicks : 0 }`, 
            this.position.x + 20, 
            this.position.y + 100, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            'Best games:', 
            this.position.x + 20, 
            this.position.y + 145, { 
            size: 15,
            align: 'left',
            bold: true,
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Easy: ${ this._statistics.easyModeBestTime ? this.formatRecord(this._statistics.easyModeBestTime) : 'none' }`, 
            this.position.x + 20, 
            this.position.y + 170, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Medium: ${ this._statistics.mediumModeBestTime ? this.formatRecord(this._statistics.mediumModeBestTime) : 'none' }`, 
            this.position.x + 20, 
            this.position.y + 195, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Difficult: ${ this._statistics.difficultModeBestTime ? this.formatRecord(this._statistics.difficultModeBestTime) : 'none' }`, 
            this.position.x + 20, 
            this.position.y + 220, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });

        Label.drawText(this._context, 
            `Custom: ${ this._statistics.customModeBestTime ? this.formatRecord(this._statistics.customModeBestTime) : 'none' }`, 
            this.position.x + 20, 
            this.position.y + 245, { 
            size: 13,
            align: 'left',
            color: Colors.DarkGrey
        });
        
        this._closeBtn.draw();
    }

    private createInputs(): void {
        const x = this.position.x + this.width;
        const y = this.position.y + this.height - 40;

        this._closeBtn = new Button(this._context, new Point(x - 90, y));
        this._closeBtn.text = "Close";
        this._closeBtn.font = "bold 15px sans-serif";
        this._closeBtn.width = 80;
        this._closeBtn.height = 25;
        this._closeBtn.onClick = this.close.bind(this);
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