import {Metric} from "./Metric";

export class License extends Metric {
    public weight: number;

    constructor() {
        super();
    }

    calculateScore(): number {
        this.score = 0; // temp value
        return this.score;
    }

    calculateLatency(): number {
        return 0;
    }
}
