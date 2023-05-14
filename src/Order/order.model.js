"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const celebrate_1 = require("celebrate");
const joi_1 = __importDefault(require("joi"));
exports.OrderSchema = {
    add: {
        [celebrate_1.Segments.BODY]: {
            userId: joi_1.default.number().required(),
            cartIds: joi_1.default.array().items(joi_1.default.number()).required(),
        },
    },
};
