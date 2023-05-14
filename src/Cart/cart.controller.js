"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const controller_1 = require("../base/controller");
class CartController {
    constructor(cartService) {
        this.cartService = cartService;
        this.getCart = (req, res) => {
            return this.cartService
                .getCart(Number(req.query.userId))
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        };
        this.addcart = (req, res) => {
            return this.cartService
                .addCart(req.body)
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        };
        this.updateCart = (req, res) => {
            return this.cartService
                .updateCart(req.body)
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        };
        this.deleteCart = (req, res) => {
            return this.cartService
                .deleteCart(Number(req.query.id))
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        };
        this.cartService = cartService;
    }
}
exports.CartController = CartController;
