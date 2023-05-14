"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const path_1 = __importDefault(require("path"));
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book-E-Sell API",
            version: "1.0.0",
            description: "Welcome to the Bookstore API! This API provides endpoints to manage a bookstore's inventory, orders, and customer data.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
        ],
    },
    apis: [path_1.default.join(__dirname, "/Routers/*.ts")],
};
