import {Metric} from "./Metric";

export class Correctness extends Metric{
    public weight: number = 0.15;
    constructor(url: string, version: string) {
        super(url, version);
    }

    calculateScore(url: string, version: string): void {
        console.log("Calculating Correctness");
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        this.score = 1;
    }
}