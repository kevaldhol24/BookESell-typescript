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
exports.BookService = void 0;
class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
        this.bookRepository = bookRepository;
    }
    getBooks(pageSize, pageIndex, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.getBooks(pageSize, pageIndex, keyword);
        });
    }
    getById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.getById(bookId);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.getAllBooks();
        });
    }
    updateBook(bookDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.updateBook(bookDetail);
        });
    }
    createBook(bookDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.createBook(bookDetail);
        });
    }
    deleteBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.deleteBook(bookId);
        });
    }
    searchBook(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.searchBook(keyword);
        });
    }
}
exports.BookService = BookService;
