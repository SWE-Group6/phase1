"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = void 0;
const Package_1 = require("../Models/Package");
const getMetrics = (req, res) => {
    //make version optional in query params
    const { url, version } = req.query;
    // print the type of url and version
    console.log(typeof url, typeof version);
    //print url and version
    console.log(url, version);
    if (typeof url !== 'string') {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
    }
    const pkg = new Package_1.Package(url);
    const metrics = pkg.getMetrics();
    res.send(JSON.stringify(metrics));
};
exports.getMetrics = getMetrics;
