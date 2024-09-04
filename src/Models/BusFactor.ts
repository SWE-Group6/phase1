import { Metric } from "./Metric";
export class BusFactor extends Metric {
    public weight: number = 0.25;
    constructor(url: string, version: string) {
        super(url, version);
    }

    calculateScore(url: string, version: string): void {
        console.log("Calculating BusFactor");
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        this.score = 16;
    }
}