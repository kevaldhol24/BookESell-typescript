"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    userId: { type: Number, required: true },
    cartIds: { type: [Number], required: true },
    orderDate: { type: Date, required: true },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
