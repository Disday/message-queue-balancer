"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fib = void 0;
var process_1 = require("process");
var worker_threads_1 = require("worker_threads");
var fib = function (n) {
    if (n < 0 || !n)
        return -0;
    if (n <= 2) {
        return n - 1;
    }
    return (0, exports.fib)(n - 1) + (0, exports.fib)(n - 2);
};
exports.fib = fib;
var begin = process.hrtime.bigint();
var result = (0, exports.fib)(+process_1.argv[2]);
var end = process.hrtime.bigint();
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ result: result, time: Number(end - begin) / Math.pow(10, 9) });
