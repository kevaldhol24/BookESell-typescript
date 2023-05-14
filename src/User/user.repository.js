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
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../Database/Schema/User"));
const paginationModel_1 = require("../base/paginationModel");
const resultModel_1 = require("../base/resultModel");
const constants_1 = require("../utility/constants");
const enum_1 = require("../utility/enum");
class UserRepository {
    constructor() {
        this.getById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ id: userId });
            return new resultModel_1.Result({
                code: user ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                key: user ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                result: user,
            });
        });
        this.updateUser = (userDetails) => __awaiter(this, void 0, void 0, function* () {
            const userRole = constants_1.roles.find((r) => r.id === userDetails.roleId);
            const roleId = userRole ? userDetails.roleId : constants_1.roles[1].id;
            const role = userRole ? userRole.name : constants_1.roles[1].name;
            return User_1.default.findOneAndUpdate({ id: userDetails.id }, Object.assign(Object.assign({}, userDetails), { role, roleId }))
                .then((result) => {
                return new resultModel_1.Result({
                    code: result ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.NotFound,
                    key: result ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.NotFound,
                    result: result
                        ? {
                            id: result.id,
                            email: userDetails.email,
                            firstName: userDetails.firstName,
                            lastName: userDetails.lastName,
                            role,
                            roleId,
                            password: userDetails.password,
                        }
                        : null,
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
                    error: e.code === 11000 ? "Please try with different email." : "",
                });
            });
        });
        this.createUser = (userDetail) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a user with the same email already exists
                const existingUser = yield User_1.default.findOne({ email: userDetail.email });
                if (existingUser) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.ConflictError,
                        key: enum_1.ErrorCode.Conflict,
                        error: "User already exist. Please login!",
                    });
                }
                const userRole = constants_1.roles.find((r) => r.id === userDetail.roleId);
                const roleId = userRole ? userDetail.roleId : constants_1.roles[1].id;
                const role = userRole ? userRole.name : constants_1.roles[1].name;
                // Get the current maximum ID value from the database and increment it by one
                const maxIdUser = yield User_1.default.findOne({})
                    .sort({ id: -1 })
                    .select("id")
                    .exec();
                const newUserId = maxIdUser ? Number(maxIdUser.id) + 1 : 1;
                // Create a new user object with the generated ID and input data
                const newUser = new User_1.default({
                    id: newUserId,
                    firstName: userDetail.firstName,
                    lastName: userDetail.lastName,
                    email: userDetail.email,
                    roleId,
                    role,
                    password: userDetail.password,
                });
                // Save the new user object to the database
                const savedUser = yield newUser.save();
                return new resultModel_1.Result({
                    code: enum_1.HttpStatusCode.Ok,
                    key: enum_1.ErrorCode.Ok,
                    result: savedUser,
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
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user with the specified ID exists
                // Delete the user from the database
                const user = yield User_1.default.findOne({ email, password });
                return new resultModel_1.Result({
                    code: user ? enum_1.HttpStatusCode.Ok : enum_1.HttpStatusCode.Unauthorized,
                    key: user ? enum_1.ErrorCode.Ok : enum_1.ErrorCode.Unauthorized,
                    error: user ? "" : "Credentials are not valid",
                    result: user,
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
    getUsers(pageSize, pageNumber, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageIndex = pageNumber - 1 < 0 ? 0 : pageNumber - 1;
            const query = keyword
                ? {
                    $or: [
                        { firstName: { $regex: keyword, $options: "i" } },
                        { lastName: { $regex: keyword, $options: "i" } },
                    ],
                }
                : {};
            const skip = pageIndex * pageSize;
            const items = yield User_1.default.find(query).skip(skip).limit(pageSize);
            const totalItems = yield User_1.default.countDocuments(query);
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
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield User_1.default.find({});
            return new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: userList,
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user with the specified ID exists
                const user = yield User_1.default.findOne({ id: userId });
                if (!user) {
                    return new resultModel_1.Result({
                        code: enum_1.HttpStatusCode.NotFound,
                        key: enum_1.ErrorCode.NotFound,
                        error: `User with ID ${userId} not found`,
                    });
                }
                // Delete the user from the database
                yield User_1.default.deleteOne({ id: userId });
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
exports.UserRepository = UserRepository;
