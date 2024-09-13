import { Metric } from "./Metric";
export class BusFactor extends Metric {
    public weight: number = 0.25;
    constructor(url: string) {
        super(url);
    }

    calculateScore(): void {
        console.log("Calculating BusFactor");
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        this.score = 0.16;
    }
}