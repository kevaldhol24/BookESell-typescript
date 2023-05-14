"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const celebrate_1 = require("celebrate");
const joi_1 = __importDefault(require("joi"));
exports.CartSchema = {
    add: {
        [celebrate_1.Segments.BODY]: {
            bookId: joi_1.default.number().required(),
            userId: joi_1.default.number().required(),
            quantity: joi_1.default.number().required(),
        },
    },
    update: {
        [celebrate_1.Segments.BODY]: {
            id: joi_1.default.number().required(),
            bookId: joi_1.default.number().required(),
            userId: joi_1.default.number().required(),
            quantity: joi_1.default.number().required(),
        },
    },
    byId: {
        [celebrate_1.Segments.QUERY]: {
            id: joi_1.default.number().required(),
        },
    },
    get: {
        [celebrate_1.Segments.QUERY]: {
            userId: joi_1.default.number().required(),
        },
    },
};
