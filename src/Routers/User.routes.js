"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const user_repository_1 = require("../User/user.repository");
const user_service_1 = require("../User/user.service");
const user_controller_1 = require("../User/user.controller");
const middleware_1 = require("../base/middleware");
const user_model_1 = require("../User/user.model");
const userRouter = express_1.default.Router();
const repo = new user_repository_1.UserRepository();
const service = new user_service_1.UserService(repo);
const controller = new user_controller_1.UserController(service);
/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         roleId:
 *           type: number
 *         role:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - id
 *         - email
 *         - firstName
 *         - lastName
 *         - roleId
 *         - role
 *         - password
 *       example:
 *         id: 1
 *         email: john.doe@example.com
 *         firstName: John
 *         lastName: Doe
 *         roleId: 2
 *         role: buyer
 *         password: secret
 */
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get a list of users
 *     description: Returns a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserModel'
 */
userRouter.get("/all", (0, middleware_1.wrap)(controller.getAllUsers));
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a paginated list of users
 *     description: Returns a paginated list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Index of the page to return
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items to return per page
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageIndex:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserModel'
 *                 totalItems:
 *                   type: integer
 *               example:
 *                 pageIndex: 0
 *                 pageSize: 1
 *                 totalPages: 4
 *                 items:
 *                   - id: 5
 *                     firstName: Keval
 *                     lastName: asdasd
 *                     email: bruce@wayne.com
 *                     roleId: 3
 *                     role: admin
 *                     password: 12345
 *                 totalItems: 4
 *
 */
userRouter.get("/", (0, celebrate_1.celebrate)(user_model_1.UserSchema.all), (0, middleware_1.wrap)(controller.getUsers));
userRouter.get("/byId", (0, celebrate_1.celebrate)(user_model_1.UserSchema.byId), (0, middleware_1.wrap)(controller.getUserById));
/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         key:
 *           type: string
 *           example: SUCCESS
 *         result:
 *           $ref: '#/components/schemas/UserModel'
 */
/**
 * Update a user.
 *
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       description: User object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
userRouter.put("/", (0, celebrate_1.celebrate)(user_model_1.UserSchema.update), (0, middleware_1.wrap)(controller.updateUser));
userRouter.post("/", (0, celebrate_1.celebrate)(user_model_1.UserSchema.add), (0, middleware_1.wrap)(controller.createUser));
userRouter.post("/login", (0, celebrate_1.celebrate)(user_model_1.UserSchema.login), (0, middleware_1.wrap)(controller.loginUser));
userRouter.delete("/", (0, celebrate_1.celebrate)(user_model_1.UserSchema.byId), (0, middleware_1.wrap)(controller.deleteUser));
userRouter.get("/roles", (0, middleware_1.wrap)(controller.getRoles));
exports.default = userRouter;
