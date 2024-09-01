import { Metric } from "./Metric";

export class NetScore extends Metric {
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
