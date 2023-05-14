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
exports.CategoryController = void 0;
const controller_1 = require("../base/controller");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.getCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pageIndex, pageSize, keyword } = req.query;
            return this.categoryService
                .getCategories(Number(pageSize), Number(pageIndex), keyword ? String(keyword) : "")
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getAllCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.categoryService
                .getAllCategories()
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getCategoryById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            return this.categoryService
                .getCategoryById(Number(id))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.updateCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            return this.categoryService
                .updateCategory(category)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            return this.categoryService
                .createCategory(category)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            return this.categoryService
                .deleteCategory(Number(id))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.categoryService = categoryService;
    }
}
exports.CategoryController = CategoryController;
