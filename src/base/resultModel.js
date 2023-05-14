"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(newResult) {
        this.code = newResult.code;
        this.key = newResult.key;
        this.error = newResult.error;
        this.result = newResult.result;
    }
}
exports.Result = Result;
