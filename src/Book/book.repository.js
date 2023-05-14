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
exports.BookRepository = void 0;
const Book_1 = __importDefault(require("../Database/Schema/Book"));
const Cart_1 = __importDefault(require("../Database/Schema/Cart"));
const Category_1 = __importDefault(require("../Database/Schema/Category"));
const paginationModel_1 = require("../base/paginationModel");
const resultModel_1 = require("../base/resultModel");
const enum_1 = require("../utility/enum");
class BookRepository {
    constructor() {
        this.getBooks = (pageSize, pageNumber, keyword) => __awaiter(this, void 0, void 0, function* () {
            const pageIndex = pageNumber - 1 < 0 ? 0 : pageNumber - 1;
            const query = keyword
                ? {
                    $or: [
                        { name: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                    ],
                }
                : {};
            const skip = pageIndex * pageSize;
            const items = yield Book_1.default.find(query).skip(skip).limit(pageSize);
            const totalItems = yield Book_1.default.countDocuments(query);
            const result = new paginationModel_1.PagincationModel({
                pageIndex,
                pageSize,
                items,
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
            });
            return new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result,
            });
        });
        this.getById = (bookId) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.default.findOne({ id: bookId });
            return new resultModel_1.Result({
                code: book ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                key: book ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                result: book,
            });
        });
        this.getAllBooks = () => __awaiter(this, void 0, void 0, function* () {
            const bookList = yield Book_1.default.find({});
            return new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: bookList,
            });
        });
        this.updateBook = (bookDetails) => __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findOne({ id: bookDetails.categoryId });
            if (!category) {
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.NotFound,
                    key: enum_1.ErrorCode.NotFound,
                    error: `Category with id ${bookDetails.categoryId} not found.`,
                });
            }
            return Book_1.default.findOneAndUpdate({ id: bookDetails.id }, Object.assign(Object.assign({}, bookDetails), { category: category === null || category === void 0 ? void 0 : category.name }))
                .then((result) => {
                return new resultModel_1.Result({
                    code: result ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                    key: result ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                    result: result
                        ? Object.assign(Object.assign({}, bookDetails), { category: category === null || category === void 0 ? void 0 : category.name }) : null,
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
                    error: e.code === 11000 ? "Book with same name already exist." : "",
                });
            });
        });
        this.createBook = (bookDetail) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a book with the same name already exists
                const existingBook = yield Book_1.default.findOne({ name: bookDetail.name });
                if (existingBook) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.ConflictError,
                        key: enum_1.ErrorCode.Conflict,
                        error: "Book with same name already exist. Please choose a different name!",
                    });
                }
                // Get the current maximum ID value from the database and increment it by one
                const maxIdBook = yield Book_1.default.findOne({})
                    .sort({ id: -1 })
                    .select("id")
                    .exec();
                const newBookId = maxIdBook ? Number(maxIdBook.id) + 1 : 1;
                const category = yield Category_1.default.findOne({ id: bookDetail.categoryId });
                if (!category) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: `Category with id ${bookDetail.categoryId} not found.`,
                    });
                }
                // Create a new book object with the generated ID and input data
                const newBook = new Book_1.default({
                    id: newBookId,
                    name: bookDetail.name,
                    description: bookDetail.description,
                    price: bookDetail.price,
                    categoryId: bookDetail.categoryId,
                    category: category.name,
                    base64image: bookDetail.base64image,
                });
                // Save the new book object to the database
                const savedBook = yield newBook.save();
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.Ok,
                    key: enum_1.ErrorCode.Ok,
                    result: savedBook,
                });
            }
            catch (error) {
                return new resultModel_1.Result({
                    code: error.code === 11000
                        ? enum_1.HttpStatusCode.ConflictError
                        : enum_1.HttpStatusCode.InternalServerError,
                    key: error.code === 11000
                        ? enum_1.ErrorCode.Conflict
                        : enum_1.ErrorCode.InternalServerError,
                    error: error.code === 11000 ? "Confilct" : "",
                });
            }
        });
        this.deleteBook = (bookId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the book with the specified ID exists
                const book = yield Book_1.default.findOne({ id: bookId });
                if (!book) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: `Book with ID ${bookId} not found`,
                    });
                }
                if ((yield Cart_1.default.find({ bookId: bookId })).length > 0) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.Forbidden,
                        key: enum_1.ErrorCode.Forbidden,
                        error: `Foreign key error, Book added in user's cart`,
                    });
                }
                // Delete the book from the database
                yield Book_1.default.deleteOne({ id: bookId });
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
        this.searchBook = (keyword) => __awaiter(this, void 0, void 0, function* () {
            const query = keyword
                ? {
                    $or: [
                        { name: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                    ],
                }
                : {};
            const items = yield Book_1.default.find(query);
            return new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: items,
            });
        });
    }
}
exports.BookRepository = BookRepository;
