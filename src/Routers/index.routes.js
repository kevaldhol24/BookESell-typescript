"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_routes_1 = __importDefault(require("./User.routes"));
const Category_routes_1 = __importDefault(require("./Category.routes"));
const Book_routes_1 = __importDefault(require("./Book.routes"));
const Cart_routes_1 = __importDefault(require("./Cart.routes"));
const Order_routes_1 = __importDefault(require("./Order.routes"));
const router = express_1.default.Router();
router.use("/user", User_routes_1.default);
router.use("/category", Category_routes_1.default);
router.use("/book", Book_routes_1.default);
router.use("/cart", Cart_routes_1.default);
router.use("/order", Order_routes_1.default);
exports.default = router;
