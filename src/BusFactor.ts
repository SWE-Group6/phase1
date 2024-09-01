import { Metric } from "./Metric";
export class BusFactor extends Metric {
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