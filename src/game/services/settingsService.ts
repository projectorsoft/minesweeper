import { StorageService } from "../engine/managers/storageService";
import { GameMode, GameState } from "../enums";
import { Helpers } from "../helpers/helpers";
import { Settings, Statistics, StatisticsRecord } from "./settings";

export class SettingsService {
    public static readonly SettingsLocalStorageKey: string = 'Minesweeper_free_settings';
    public static readonly MinBestScoresNumber: number = 5;
    public static readonly MaxBestScoresNumber: number = 20;
    
    private _storageService: StorageService<Settings>;

    public get bestScoresNumber() {
        return this.get().bestScoresNumber ?? SettingsService.MaxBestScoresNumber;
    }
    public set bestScoresNumber(value: number) {
        if (value < SettingsService.MinBestScoresNumber || value > SettingsService.MaxBestScoresNumber)
            return;

        this.updateBestScoresNumber(value);
    }
    
    public constructor(storageService: StorageService<Settings>) {
        this._storageService = storageService;
    }

    public get(): Settings {
        let settings = this._storageService.get(SettingsService.SettingsLocalStorageKey) as Settings;

        if (!settings) {
            settings = this.create();
        }

        return settings;
    }

    public create(): Settings {
        let settings = new Settings();
        settings.statistics = new Statistics();

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);

        return settings;
    }

    public clearStatistics(): void {
        const settings = this.get();

        settings.statistics = new Statistics();

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    public updateLastGame(record: StatisticsRecord): void {
        let settings = this.get();

        if (!settings.statistics.lastGame)
            settings.statistics.lastGame = new StatisticsRecord();

        settings.statistics.lastGame.time = record.time;
        settings.statistics.lastGame.clicks = record.clicks;

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    public updateModeData(mode: GameMode, record: StatisticsRecord): void {
        let settings = this.get();
        record.date = Helpers.formatDate(new Date());
        record.mode = mode;

        switch (mode) {
            case GameMode.Easy:
                settings.statistics.easyModeBestTime = this.setStatisticsRecord(settings.statistics.easyModeBestTime, record);
            break;
            case GameMode.Medium:
                settings.statistics.mediumModeBestTime = this.setStatisticsRecord(settings.statistics.mediumModeBestTime, record);
            break;
            case GameMode.Difficult:
                settings.statistics.difficultModeBestTime = this.setStatisticsRecord(settings.statistics.difficultModeBestTime, record);
            break;
            case GameMode.Custom:
                settings.statistics.customModeBestTime = this.setStatisticsRecord(settings.statistics.customModeBestTime, record);
            break;
        }

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    public updateBestScores(mode: GameMode, record: StatisticsRecord): void {
        let settings = this.get();

        if (!settings.statistics.bestGames)
            settings.statistics.bestGames = [];

        record.date = Helpers.formatDate(new Date());
        record.mode = mode;
        record.name = settings.currentName ?? 'Unknown';

        settings.statistics.bestGames.push(record);
        settings.statistics.bestGames.sort(this.sortBestScores);
        settings.statistics.bestGames = settings.statistics.bestGames.slice(0, this.bestScoresNumber);

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    public updateName(name: string): void {
        if (!name)
            return;

        let settings = this.get();
        settings.currentName = name;

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    public updateScores(score: GameState): void {
        let settings = this.get();

        if (score === GameState.Won)
            settings.statistics.gamesWon++;
        else
            if (score === GameState.Lost)
                settings.statistics.gamesLost++;

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
    }

    private updateBestScoresNumber(value: number): void {
        const settings = this.get();

        settings.bestScoresNumber = value;
        settings.statistics.bestGames = settings.statistics.bestGames.slice(0, value);

        this._storageService.update(SettingsService.SettingsLocalStorageKey, settings);
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