import { Metric } from "./Metric";
import { BusFactor } from "./BusFactor";
import { Correctness } from "./Correctness";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";
import { RampUp } from "./RampUp";
import { License } from "./License";
import * as fs from 'fs';

export class AllMetrics {
    // make an array of all metrics
    public metrics: Metric[] = [];
    private netScore: number = 0;
    private netScoreLatency: number = 0;

    constructor(url: string) {
        this.metrics.push(new BusFactor(url));
        this.metrics.push(new Correctness(url));
        this.metrics.push(new ResponsiveMaintainer(url));
        this.metrics.push(new RampUp(url));
        this.metrics.push(new License(url));

        this.metrics.forEach(metric => {
            metric.calculateScore();
        });
    }
    
    public calculateNetScore(): number {
        const start = performance.now();
        this.metrics.forEach(metric => {
            //print the class name and the details to console.log by typecasting in to the concrete class
            console.log(metric.constructor.name);
            console.log("Score: " + metric.getScore());
            console.log("Weight: " + metric.weight);
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
