export class Helpers {
    public static getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static formatDate(date: Date): string {
        return `${date.getFullYear()}-${Helpers.zeroPad(date.getMonth() + 1, 2)}-${Helpers.zeroPad(date.getDate(), 2)} ${Helpers.zeroPad(date.getHours(), 2)}:${Helpers.zeroPad(date.getMinutes(), 2)}`;
    }

    public static zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
}