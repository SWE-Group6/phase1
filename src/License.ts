import {Metric} from "./Metric";

export class License extends Metric {
    public weight: number = 0.2;

    constructor(url: string, version: string) {
        super(url, version);
    }

    calculateScore(url: string, version: string): number {
        const start = performance.now();
        const end = performance.now()
        this.latency = end - start;
        return 0;
    }
}
