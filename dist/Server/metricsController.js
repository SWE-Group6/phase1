"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = void 0;
const Package_1 = require("../Models/Package");
const getMetrics = (req, res) => {
    const { url, version } = req.query;
    if (typeof url !== 'string' || typeof version !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }
    const pkg = new Package_1.Package(url, version);
    const metrics = pkg.getMetrics();
    res.json(metrics);
};
exports.getMetrics = getMetrics;
