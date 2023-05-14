"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const middleware_1 = require("../base/middleware");
const order_repository_1 = require("../Order/order.repository");
const order_service_1 = require("../Order/order.service");
const order_controller_1 = require("../Order/order.controller");
const order_model_1 = require("../Order/order.model");
const orderRouter = express_1.default.Router();
const repo = new order_repository_1.OrderRepository();
const service = new order_service_1.OrderService(repo);
const controller = new order_controller_1.OrderController(service);
orderRouter.post("/", (0, celebrate_1.celebrate)(order_model_1.OrderSchema.add), (0, middleware_1.wrap)(controller.addOrder));
exports.default = orderRouter;
