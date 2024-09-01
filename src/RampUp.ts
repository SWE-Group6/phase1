import {Metric} from "./Metric";

export class RampUp extends Metric {
    public weight: number = 0.15;

    constructor() {
        super();
    }

    calculateScore(): number {
        this.score = 0; // temp value for now
        return this.score;
    }

    calculateLatency(): number {
        return 0;
    }
}
