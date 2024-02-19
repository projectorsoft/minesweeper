import { Helpers } from "./helpers";

export class ClockHelper {
    public static formatFlagsNumber(value: number): string {
		if (value < -99)
			return '-99';

		return value < 0 && value > -10 
            ? `-0${Math.abs(value)}` 
            : Helpers.zeroPad(value, 3);
    }
}