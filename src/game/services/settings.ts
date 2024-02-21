import { Theme } from "../enums";
import { Minesweeper } from "../minesweeper";

export class StatisticsRecord {
    time?: number = null;
    clicks?: number = null;
    date?: string = null;
    name?: string = null;
    mode?: number = null;
}

export class Statistics {
    public gamesWon: number = 0;
    public gamesLost: number = 0;
    public lastGame: StatisticsRecord = null;
    public easyModeBestTime: StatisticsRecord = null;
    public mediumModeBestTime: StatisticsRecord = null;
    public difficultModeBestTime: StatisticsRecord = null;
    public customModeBestTime: StatisticsRecord = null;
    public bestGames: StatisticsRecord[] = [];
}

export class Settings {
    public currentName: string = null;
    public bestScoresNumber: number = 10;
    public theme: Theme = Theme.Modern;
    public customBoardSizeX: number = Minesweeper.CustomBoardDefaultXSize;
    public customBoardSizeY: number = Minesweeper.CustomBoardDefaultYSize;
    public customBoardMinesNumber: number = Minesweeper.CustomBoardDefaultMinesNumber;
    public statistics: Statistics = null;
}