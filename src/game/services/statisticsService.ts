import { StorageService } from "../engine/managers/storageService";
import { GameMode } from "../enums";
import { Helpers } from "../helpers/helpers";
import { Statistics, StatisticsRecord } from "./statistics";

export class StatisticsService {
    public static readonly StatisticsLocalStorageKey: string = 'MinesweeperStartistics';

    private _storageService: StorageService<Statistics>;
    
    public constructor(storageService: StorageService<Statistics>) {
        this._storageService = storageService;
    }

    public getStatistics(): Statistics {
        let statistics = this._storageService.get(StatisticsService.StatisticsLocalStorageKey) as Statistics;

        if (!statistics) {
            statistics = this.createStatistics();
        }

        return statistics;
    }

    public createStatistics(): Statistics {
        let statistics = new Statistics();

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, statistics);

        return statistics;
    }

    public updateLastGameStatistics(record: StatisticsRecord): void {
        let statistics = this.getStatistics();

        if (!statistics.lastGame)
            statistics.lastGame = new StatisticsRecord();

        statistics.lastGame.time = record.time;
        statistics.lastGame.clicks = record.clicks;

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, statistics);
    }

    public setModeStatistics(mode: GameMode, record: StatisticsRecord): void {
        let localStatistics = this.getStatistics();

        switch (mode) {
            case GameMode.Easy:
                localStatistics.easyModeBestTime = this.setStatisticsRecord(localStatistics.easyModeBestTime, record);
            break;
            case GameMode.Medium:
                localStatistics.mediumModeBestTime = this.setStatisticsRecord(localStatistics.mediumModeBestTime, record);
            break;
            case GameMode.Difficult:
                localStatistics.difficultModeBestTime = this.setStatisticsRecord(localStatistics.difficultModeBestTime, record);
            break;
            case GameMode.Custom:
                localStatistics.customModeBestTime = this.setStatisticsRecord(localStatistics.customModeBestTime, record);
            break;
        }

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, localStatistics);
    }

    public clear(): void {
        this._storageService.clear(StatisticsService.StatisticsLocalStorageKey);
    }

    private setStatisticsRecord(localStatistics: StatisticsRecord, record: StatisticsRecord): StatisticsRecord {
        if (!localStatistics)
            localStatistics = new StatisticsRecord();

        if (!localStatistics.time || record.time <= localStatistics.time) {
            localStatistics.time = record.time;
            localStatistics.clicks = record.clicks;
            localStatistics.date = Helpers.formatDate(new Date());
        }

        return localStatistics;
    }
}