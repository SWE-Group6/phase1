export abstract class Metric {
    protected score: number;
    protected latency: number;
    url: string;
    version: string;
    abstract weight: number;

    constructor(url: string, version: string) {
        this.score = 0;
        this.latency = 0;
        this.url = url;
        this.version = version;
    }

    getScore(): number {
        return this.score;
    }
    getLatency(): number {
        return this.latency;
    }
    abstract calculateScore(url: string, version: string): void;
}
