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
exports.CartRepository = void 0;
const Book_1 = __importDefault(require("../Database/Schema/Book"));
const Cart_1 = __importDefault(require("../Database/Schema/Cart"));
const User_1 = __importDefault(require("../Database/Schema/User"));
const resultModel_1 = require("../base/resultModel");
const enum_1 = require("../utility/enum");
class CartRepository {
    constructor() {
        this.getCart = (id) => __awaiter(this, void 0, void 0, function* () {
            const carts = yield Cart_1.default.aggregate([
                { $match: { userId: id } },
                {
                    $lookup: {
                        from: "books",
                        localField: "bookId",
                        foreignField: "id",
                        as: "book",
                    },
                },
                {
                    $unwind: {
                        path: "$book",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        id: "$id",
                        bookId: "$bookId",
                        userId: "$userId",
                        quantity: "$quantity",
                        book: "$book",
                    },
                },
            ]);
            const result = new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: carts,
            });
            return result;
        });
        this.addCart = (cartDetail) => __awaiter(this, void 0, void 0, function* () {
            if (!!(yield Cart_1.default.findOne({
                userId: cartDetail.userId,
                bookId: cartDetail.bookId,
            }))) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.ConflictError,
                    key: enum_1.ErrorCode.Conflict,
                    error: "Book already added in cart",
                });
            }
            if (!(yield Book_1.default.findOne({
                id: cartDetail.bookId,
            })) ||
                !(yield User_1.default.findOne({
                    id: cartDetail.userId,
                }))) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.NotFound,
                    key: enum_1.ErrorCode.NotFound,
                    error: "Book or user is not available",
                });
            }
            const maxIdCart = yield Cart_1.default.findOne({})
                .sort({ id: -1 })
                .select("id")
                .exec();
            const newCartId = maxIdCart ? Number(maxIdCart.id) + 1 : 1;
            const newCart = new Cart_1.default(Object.assign(Object.assign({}, cartDetail), { id: newCartId }));
            const savedCart = yield newCart.save();
            const result = new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: savedCart,
            });
            return result;
        });
        this.updateCart = (cartDetail) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield Book_1.default.findOne({
                id: cartDetail.bookId,
            })) ||
                !(yield User_1.default.findOne({
                    id: cartDetail.userId,
                }))) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.NotFound,
                    key: enum_1.ErrorCode.NotFound,
                    error: "Book or user is not available",
                });
            }
            return Cart_1.default.findOneAndUpdate({ id: cartDetail.id }, Object.assign({}, cartDetail))
                .then((result) => {
                return new resultModel_1.Result({
                    code: result ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                    key: result ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                    result: {
                        id: cartDetail.id,
                        bookId: cartDetail.bookId,
                        quantity: cartDetail.quantity,
                        userId: cartDetail.userId,
                    },
                });
            })
                .catch((e) => {
                return new resultModel_1.Result({
                    code: e.code === 11000
                        ? enum_1.HttpStatusCode.ConflictError
                        : enum_1.HttpStatusCode.InternalServerError,
                    key: e.code === 11000
                        ? enum_1.ErrorCode.Conflict
                        : enum_1.ErrorCode.InternalServerError,
                    error: e,
                });
            });
        });
        this.deleteCart = (cartId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the book with the specified ID exists
                const cart = yield Cart_1.default.findOne({ id: cartId });
                if (!cart) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: `Cart with ID ${cartId} not found`,
                    });
                }
                // Delete the book from the database
                yield Cart_1.default.deleteOne({ id: cartId });
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.Ok,
                    key: enum_1.ErrorCode.Ok,
                    result: true,
                });
            }
            catch (error) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.InternalServerError,
                    key: enum_1.ErrorCode.InternalServerError,
                    error: error,
                });
            }
        });
    }
}
exports.CartRepository = CartRepository;
