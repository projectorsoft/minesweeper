export class Helpers {
    public static getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static formatDate(date: Date): string {
        return `${date.getFullYear()}-${Helpers.zeroPad(date.getMonth() + 1, 2)}-${Helpers.zeroPad(date.getDate(), 2)} ${Helpers.zeroPad(date.getHours(), 2)}:${Helpers.zeroPad(date.getMinutes(), 2)}`;
    }

    public static hasTouchScreen(): boolean {
        return 'ontouchstart' in window;
    }

    public static zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

    public static roundTimeToSeconds(miliseconds: number): number {
        return Math.floor(miliseconds / 1000);
    }

    public static formatMiliseconds(miliseconds: number): string {
        const seconds = Helpers.roundTimeToSeconds(miliseconds);
        const remainingMiliseconds = miliseconds - seconds * 1000;
        return `${seconds}.${remainingMiliseconds}`;
    }
}