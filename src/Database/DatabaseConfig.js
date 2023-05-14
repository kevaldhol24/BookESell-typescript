"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    const MONGOURI = process.env.MONGOURI;
    mongoose_1.default
        .connect(MONGOURI)
        .then(() => {
        console.log("Database Connection Successfull...Yahhh!");
    })
        .catch((error) => {
        console.log("Database Connection failed.");
        console.log("Error is ", error);
    });
};
exports.connectDatabase = connectDatabase;
