import {Metric} from "./Metric";

export class Correctness extends Metric{

    constructor() {
        super();
    }

    calculateScore(): number {
        return 0;
    }

    calculateLatency(): number {
        return 0;
    }
}