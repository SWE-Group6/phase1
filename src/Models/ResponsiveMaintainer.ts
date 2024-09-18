import { Metric } from "./Metric";

export class ResponsiveMaintainer extends Metric {
    public weight: number = 0.25;
    constructor(url: string) {
        super(url);
    }
    calculateScoreGithub(): void {
        console.log("Calculating ResponsiveMaintainer");
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        this.score = 0.10;
    }

    calculateScoreNPM(): void {
        console.log("Calculating ResponsiveMaintainer");
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        this.score = 0.10;
    }

}
