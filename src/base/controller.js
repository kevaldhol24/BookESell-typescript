"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseController = void 0;
const enum_1 = require("../utility/enum");
const errorResult_1 = require("./errorResult");
class BaseController {
    constructor() {
        this.headers = {
            "Access-Control-Allow-Origin": "*",
            Server: "FooServer",
            "Strict-Transport-Security": "max-age=31536000",
            "X-Content-Type-Options": "nosniff",
            "X-XSS-Protection": "1; mode=block",
            "x-frame-options": "SAMEORIGIN",
        };
    }
    sendResult(res, result) {
        res.set(this.headers);
        return res.status(result.code).json(result);
    }
    sendErrorResult(res) {
        const result = new errorResult_1.ErrorResult(enum_1.ErrorCode.InternalServerError);
        res.set(this.headers);
        return res.status(enum_1.HttpStatusCode.InternalServerError).json(result);
    }
}
exports.baseController = new BaseController();
