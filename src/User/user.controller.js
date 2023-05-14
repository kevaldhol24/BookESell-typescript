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
exports.UserController = void 0;
const controller_1 = require("../base/controller");
const resultModel_1 = require("../base/resultModel");
const enum_1 = require("../utility/enum");
const constants_1 = require("../utility/constants");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            return this.userService
                .loginUser(email, password)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pageIndex, pageSize, keyword } = req.query;
            return this.userService
                .getUsers(Number(pageSize), Number(pageIndex), keyword ? String(keyword) : "")
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            return this.userService
                .getbyId(Number(id))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.userService
                .getAllUsers()
                .then((result) => controller_1.baseController.sendResult(res, result))
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            return this.userService
                .updateUser(user)
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            return this.userService
                .createUser(Object.assign({}, user))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            return this.userService
                .deleteUser(Number(id))
                .then((result) => {
                return controller_1.baseController.sendResult(res, result);
            })
                .catch((e) => {
                return controller_1.baseController.sendErrorResult(res);
            });
        });
        this.getRoles = (req, res) => {
            const result = new resultModel_1.Result({
                code: enum_1.HttpStatusCode.Ok,
                key: enum_1.ErrorCode.Ok,
                result: constants_1.roles,
            });
            return controller_1.baseController.sendResult(res, result);
        };
        this.userService = userService;
    }
}
exports.UserController = UserController;
