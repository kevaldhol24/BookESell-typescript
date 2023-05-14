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
exports.BookController = void 0;
const controller_1 = require("../base/controller");
class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pageIndex, pageSize, keyword } = req.query;
            return this.bookService
                .getBooks(Number(pageSize), Number(pageIndex), keyword ? String(keyword) : "")
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getAllBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.bookService
                .getAllBooks()
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.bookService
                .getById(Number(req.query.id))
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = req.body;
            return this.bookService
                .updateBook(book)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.createBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = req.body;
            return this.bookService
                .createBook(book)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            return this.bookService
                .deleteBook(Number(id))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.searchBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { keyword } = req.query;
            return this.bookService
                .searchBook(String(keyword !== null && keyword !== void 0 ? keyword : ""))
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.bookService = bookService;
    }
}
exports.BookController = BookController;
