import { GameMode } from "../enums";

export class StatisticsRecord {
    time?: number = null;
    clicks?: number = null;
    date?: string = null;
    name?: string = null;
    mode?: number = null;
}

export class Statistics {
    public currentName: string = null;
    public gamesWon: number = 0;
    public gamesLost: number = 0;
    public lastGame: StatisticsRecord = null;
    public easyModeBestTime: StatisticsRecord = null;
    public mediumModeBestTime: StatisticsRecord = null;
    public difficultModeBestTime: StatisticsRecord = null;
    public customModeBestTime: StatisticsRecord = null;
    public bestGames: StatisticsRecord[] = [];
    public bestScoresNumber: number = 10;
}