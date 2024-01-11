export enum FieldType {
    Blank = 0,
    Flagged = 1,
    Tentative = 2
}

export enum FieldState {
    Covered = 0,
    Uncovered = 1
}

export enum GameState {
    Started = 0,
    Won = 1,
    Lost = 2
}

export enum GameMode {
    Easy = 0,
    Medium = 1,
    Difficult = 2
}

export enum Asset {
    FieldsImg = 'fieldsIsmg',
    PixelCodeFont = 'pixelCodeFont'
}

export enum Colors {
    Blue = 'rgb(0, 0, 255)',
    Green = 'rgb(0, 130, 0)',
    Red = 'rgb(255, 0, 0)',
    LightBlue = 'rgb(67, 132, 222)',
    DarkBlue = 'rgb(0, 0, 100)',
    Brown = 'rgb(88, 57, 39)',
    Cyan = 'rgb(0, 180, 255)',
    Black = 'rgb(0, 0, 0)',
    Gray = 'rgb(130, 130, 130)',
    LightGray = 'rgb(225, 225, 225)',
    DarkGrey = 'rgb(74, 82, 92)',
    White = 'rgb(255, 255, 255)'
}

export enum MouseButtons {
    Left = 0,
    Right = 2
}

export enum Sprite {
    Uncovered = 0,
    Covered = 1,
    Marked = 2,
    Empty = 3,
    Danger = 4,
    Mine = 5,
    Flagged = 6,
    Missed = 7
}