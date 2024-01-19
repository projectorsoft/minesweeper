export class StatisticsRecord {
    time?: number = null;
    clicks?: number = null;
    date?: string = null;
}

export class Statistics {
    public lastGame: StatisticsRecord = null;
    public easyModeBestTime: StatisticsRecord = null;
    public mediumModeBestTime: StatisticsRecord = null;
    public difficultModeBestTime: StatisticsRecord = null;
    public customModeBestTime: StatisticsRecord = null;
}