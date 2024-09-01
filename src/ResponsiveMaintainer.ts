import { Metric } from "./Metric";

export class ResponsiveMaintainer extends Metric {
    public weight: number = 0.25;
    constructor(url: string, version: string) {
        super(url, version);
    }
    calculateScore(): number {
        const start = performance.now();

        const end = performance.now();
        this.latency = end - start;
        return 0;
    }

}
