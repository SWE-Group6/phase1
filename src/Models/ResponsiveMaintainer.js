"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveMaintainer = void 0;
var Metric_1 = require("./Metric");
var ResponsiveMaintainer = /** @class */ (function (_super) {
    __extends(ResponsiveMaintainer, _super);
    function ResponsiveMaintainer(url, version) {
        var _this = _super.call(this, url, version) || this;
        _this.weight = 0.25;
        return _this;
    }
    ResponsiveMaintainer.prototype.calculateScore = function () {
        console.log("Calculating ResponsiveMaintainer");
        var start = performance.now();
        var end = performance.now();
        this.latency = end - start;
        this.score = 10;
    };
    return ResponsiveMaintainer;
}(Metric_1.Metric));
exports.ResponsiveMaintainer = ResponsiveMaintainer;
