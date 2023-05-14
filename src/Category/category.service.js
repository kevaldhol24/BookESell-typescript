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
exports.CategoryService = void 0;
class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.getAllCategories();
        });
    }
    getCategories(pageSize, pageIndex, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.getCategories(pageSize, pageIndex, keyword);
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.getById(categoryId);
        });
    }
    createCategory(categoryDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.createCategory(categoryDetail);
        });
    }
    updateCategory(categoryDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.updateCategory(categoryDetail);
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.deleteCategory(categoryId);
        });
    }
}
exports.CategoryService = CategoryService;
