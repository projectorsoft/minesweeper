import { StorageService } from "../engine/managers/storageService";
import { GameMode, GameState } from "../enums";
import { Helpers } from "../helpers/helpers";
import { Statistics, StatisticsRecord } from "./statistics";

export class StatisticsService {
    public static readonly StatisticsLocalStorageKey: string = 'MinesweeperStartistics';
    public static readonly MinBestScoresNumber: number = 5;
    public static readonly MaxBestScoresNumber: number = 20;
    
    private _storageService: StorageService<Statistics>;

    public get bestScoresNumber() {
        return this.get().bestScoresNumber ?? StatisticsService.MaxBestScoresNumber;
    }
    public set bestScoresNumber(value: number) {
        if (value < StatisticsService.MinBestScoresNumber || value > StatisticsService.MaxBestScoresNumber)
            return;

        this.updateBestScoresNumber(value);
    }
    
    public constructor(storageService: StorageService<Statistics>) {
        this._storageService = storageService;
    }

    private updateBestScoresNumber(value: number): void {
        const localStatistics = this.get();

        localStatistics.bestScoresNumber = value;
        localStatistics.bestGames = localStatistics.bestGames.slice(0, value);

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, localStatistics);
    }

    public get(): Statistics {
        let statistics = this._storageService.get(StatisticsService.StatisticsLocalStorageKey) as Statistics;

        if (!statistics) {
            statistics = this.create();
        }

        return statistics;
    }

    public create(): Statistics {
        let statistics = new Statistics();

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, statistics);

        return statistics;
    }

    public clear(): void {
        const localStatistics = this.get();

        let statistics = new Statistics();
        statistics.currentName = localStatistics.currentName;

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, statistics);
    }

    public updateLastGame(record: StatisticsRecord): void {
        let statistics = this.get();

        if (!statistics.lastGame)
            statistics.lastGame = new StatisticsRecord();

        statistics.lastGame.time = record.time;
        statistics.lastGame.clicks = record.clicks;

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, statistics);
    }

    public updateModeData(mode: GameMode, record: StatisticsRecord): void {
        let localStatistics = this.get();
        record.date = Helpers.formatDate(new Date());
        record.mode = mode;

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

    public updateBestScores(mode: GameMode, record: StatisticsRecord): void {
        let localStatistics = this.get();

        if (!localStatistics.bestGames)
            localStatistics.bestGames = [];

        record.date = Helpers.formatDate(new Date());
        record.mode = mode;
        record.name = localStatistics.currentName ?? 'Unknown';

        localStatistics.bestGames.push(record);
        localStatistics.bestGames.sort(this.sortBestScores);
        localStatistics.bestGames = localStatistics.bestGames.slice(0, this.bestScoresNumber);

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, localStatistics);
    }

    public updateName(name: string): void {
        if (!name)
            return;

        let localStatistics = this.get();
        localStatistics.currentName = name;

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, localStatistics);
    }

    public updateScores(score: GameState): void {
        let localStatistics = this.get();

        if (score === GameState.Won)
            localStatistics.gamesWon++; 
        else
            if (score === GameState.Lost)
                localStatistics.gamesLost++; 

        this._storageService.update(StatisticsService.StatisticsLocalStorageKey, localStatistics);
    }

    private setStatisticsRecord(localStatistics: StatisticsRecord, record: StatisticsRecord): StatisticsRecord {
        if (!localStatistics)
            localStatistics = new StatisticsRecord();

        if (!localStatistics.time || record.time <= localStatistics.time) {
            localStatistics.time = record.time;
            localStatistics.clicks = record.clicks;
            localStatistics.date = record.date;
        }

        return localStatistics;
    }

    private sortBestScores(a: StatisticsRecord, b: StatisticsRecord): number {
        let result = a.time - b.time;

        if (result === 0)
            result = a.clicks - b.clicks;
 
        if (result === 0)
            result = (3 -a.mode) - (3 - b.mode);

        return result;
    }
}