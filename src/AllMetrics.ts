import { Metric } from "./Metric";
import { BusFactor } from "./BusFactor";
import { Correctness } from "./Correctness";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";
import { RampUp } from "./RampUp";
import { License } from "./License";

export class AllMetrics {
    // make an array of all metrics
    public metrics: Metric[] = [];
    private netScore: number = 0;
    private netScoreLatency: number = 0;

    constructor(url: string, version: string) {
        this.metrics.push(new BusFactor(url, version));
        this.metrics.push(new Correctness(url, version));
        this.metrics.push(new ResponsiveMaintainer(url, version));
        this.metrics.push(new RampUp(url, version));
        this.metrics.push(new License(url, version));

        this.metrics.forEach(metric => {
            metric.calculateScore(url, version);
        });
    }
    
    public calculateNetScore(): number {
        const start = performance.now();
        this.metrics.forEach(metric => {
            this.netScore += metric.getScore() * metric.weight;            
        });

        const end = performance.now();
        this.netScoreLatency = end - start;

        return this.netScore;
    }

    public getNetScoreLatency(): number {
        return this.netScoreLatency;
    }

    public getNetScore(): number {
        return this.netScore;
    }

}
