import {Metric} from "./Metric";

export class License extends Metric {
    public weight: number = 0.2;

    constructor(url: string) {
        super(url);
    }

    calculateScore(): void {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now()
        this.latency = end - start;
        this.score = 0.2;
    }
}
