abstract class Metric {
    score: number;
    latency: number;

    constructor() {
        this.score = 0;
        this.latency = 0;
    }

    getScore(): number {
        return this.score;
    }
    getLatency(): number {
        return this.latency;
    }
    abstract calculateScore(): number;

    abstract calculateLatency(): number;
}
