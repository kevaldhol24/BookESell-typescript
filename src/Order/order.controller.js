"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const controller_1 = require("../base/controller");
class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
        this.addOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.orderService
                .addOrder(req.body)
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.orderService = orderService;
    }
}
exports.OrderController = OrderController;
