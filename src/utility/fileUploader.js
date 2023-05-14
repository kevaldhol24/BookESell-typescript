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
exports.uploadImage = void 0;
const axios_1 = __importDefault(require("axios"));
function uploadImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        formData.append("upload_preset", "ml_default");
        formData.append("cloud_name", "book-e-sell");
        formData.append("file", file);
        console.log("fileDataform", formData);
        const response = yield axios_1.default.post("https://api.cloudinary.com/v1_1/book-e-sell/image/upload", formData);
        return response.url;
    });
}
exports.uploadImage = uploadImage;
