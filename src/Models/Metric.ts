export abstract class Metric {
    protected score: number;
    protected latency: number;
    url: string;
    abstract weight: number;

    constructor(url: string) {
        this.score = 0;
        this.latency = 0;
        this.url = url;
    }

    getScore(): number {
        return this.score;
    }
    getLatency(): number {
        return this.latency;
    }
    abstract calculateScore(): void;
}
