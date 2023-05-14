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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const Cart_1 = __importDefault(require("../Database/Schema/Cart"));
const Order_1 = __importDefault(require("../Database/Schema/Order"));
const resultModel_1 = require("../base/resultModel");
const enum_1 = require("../utility/enum");
const User_1 = __importDefault(require("../Database/Schema/User"));
class OrderRepository {
    constructor() {
        this.addOrder = (orderDetails) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new order in the database
                // Delete the carts associated with the order from the Cart collection
                if (!(yield User_1.default.findOne({
                    id: orderDetails.userId,
                }))) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: "User is not available",
                    });
                }
                const maxIdOrder = yield Order_1.default.findOne({})
                    .sort({ id: -1 })
                    .select("id")
                    .exec();
                const newOrderId = maxIdOrder ? Number(maxIdOrder.id) + 1 : 1;
                const newOrder = new Order_1.default(Object.assign(Object.assign({}, orderDetails), { id: newOrderId, orderDate: new Date() }));
                const savedOrder = yield newOrder.save();
                yield Cart_1.default.deleteMany({ id: { $in: orderDetails.cartIds } });
                const result = new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.Ok,
                    key: enum_1.ErrorCode.Ok,
                    result: savedOrder,
                });
                return result;
            }
            catch (error) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.InternalServerError,
                    key: enum_1.ErrorCode.InternalServerError,
                });
            }
        });
    }
}
exports.OrderRepository = OrderRepository;
