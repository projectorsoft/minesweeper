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
    NotStarted = 0,
    Started = 1,
    Won = 2,
    Lost = 3
}

export enum GameMode {
    Easy = 0,
    Medium = 1,
    Difficult = 2,
    Custom = 3
}

export enum Asset {
    SpritesImg = 'spritesIsmg',
    SettingsImgSvg = 'settingsImgSvg',
    NewImgSvg = 'newImgSvg',
    StatisticsImgSvg = 'statisticsImgSvg',
    SmileImgSvg = 'smileImgSvg',
    SadImgSvg = 'sadImgSvg',
    PauseImgSvg = 'pauseImgSvg',
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
    VeryDarkGrey = 'rgb(45, 45, 47)',
    White = 'rgb(255, 255, 255)',
    DarkPurple = 'rgb(61, 56, 71)',
    Success = 'rgb(81, 163, 81)',
    Danger = 'rgb(189, 53, 47)',
    Warning = 'rgb(248, 148, 7)',
    Info = 'rgb(47, 149, 179)',
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
    Missed = 7,
    Win = 8,
    Lost = 9
}

export enum InputEvent {
    OnClick = 'onClick',
    OnMouseMove = 'onMouseMove',
    OnTap = 'onTap',
    OnDoubleTap = 'onDoubleTap'
}

export enum FontFamily {
    SansSerif = 'sans-serif',
    PixelCode = 'pixelCode'
}

export enum AlertType {
    Success = 0,
    Danger = 1,
    Warning = 2,
    Info = 3
}