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
exports.CategoryRespository = void 0;
const Book_1 = __importDefault(require("../Database/Schema/Book"));
const Category_1 = __importDefault(require("../Database/Schema/Category"));
const paginationModel_1 = require("../base/paginationModel");
const resultModel_1 = require("../base/resultModel");
const enum_1 = require("../utility/enum");
class CategoryRespository {
    constructor() {
        this.getById = (categoryId) => __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findOne({ id: categoryId });
            return new resultModel_1.Result({
                code: category ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                key: category ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                result: category,
            });
        });
        this.updateCategory = (categoryDetails) => __awaiter(this, void 0, void 0, function* () {
            return Category_1.default.findOneAndUpdate({ id: categoryDetails.id }, Object.assign({}, categoryDetails))
                .then((result) => {
                return new resultModel_1.Result({
                    code: result ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                    key: result ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                    result,
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
                    error: e.code === 11000 ? "Category already exist" : "",
                });
            });
        });
        this.createCategory = (categoryDetail) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a category with the same name already exists
                const existingCategory = yield Category_1.default.findOne({
                    name: categoryDetail.name,
                });
                if (existingCategory) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.ConflictError,
                        key: enum_1.ErrorCode.Conflict,
                        error: "Category already exists.",
                    });
                }
                // Get the current maximum ID value from the database and increment it by one
                const maxIdCategory = yield Category_1.default.findOne({})
                    .sort({ id: -1 })
                    .select("id")
                    .exec();
                const newCategoryId = maxIdCategory ? Number(maxIdCategory.id) + 1 : 1;
                // Create a new category object with the generated ID and input data
                const newCategory = new Category_1.default({
                    id: newCategoryId,
                    name: categoryDetail.name,
                });
                // Save the new category object to the database
                const savedCategory = yield newCategory.save();
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.Ok,
                    key: enum_1.ErrorCode.Ok,
                    result: savedCategory,
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
    getCategories(pageSize, pageNumber, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageIndex = pageNumber - 1 < 0 ? 0 : pageNumber - 1;
            const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
            const skip = pageIndex * pageSize;
            const items = yield Category_1.default.find(query).skip(skip).limit(pageSize);
            const totalItems = yield Category_1.default.countDocuments(query);
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
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_1.default.find({});
            return new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: categories,
            });
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the category with the specified ID exists
                const category = yield Category_1.default.findOne({ id: categoryId });
                if (!category) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: `Category with ID ${categoryId} not found`,
                    });
                }
                if ((yield Book_1.default.find({ categoryId })).length > 0) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.Forbidden,
                        key: enum_1.ErrorCode.Forbidden,
                        error: `Foreign key error, Books found with this category.`,
                    });
                }
                // Delete the category from the database
                yield Category_1.default.deleteOne({ id: categoryId });
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
exports.CategoryRespository = CategoryRespository;
