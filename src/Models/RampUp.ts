import {Metric} from "./Metric";

export class RampUp extends Metric {
    public weight: number = 0.15;

    constructor(url: string) {
        super(url);
    }

    calculateScoreGithub(): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }

    calculateScoreNPM(): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }
}
