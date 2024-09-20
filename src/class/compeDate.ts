export class CompeDate extends Date {
    readonly rawString: string;

    constructor(rawString: string) {
        let [month, other] = rawString.split('/');
        let [day, other2] = other.split(/\s/);
        let [hour, minute, second] = other2.split(':');
        super();

        this.setUTCMonth(Number(month) - 1, Number(day));
        this.setUTCHours(Number(hour) - 9, Number(minute), Number(second));
        
        this.rawString = rawString;
    }
}