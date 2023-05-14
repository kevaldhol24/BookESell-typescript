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
exports.CartService = void 0;
class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
        this.getCart = (userId) => __awaiter(this, void 0, void 0, function* () {
            return this.cartRepository.getCart(userId);
        });
        this.addCart = (cartDetail) => __awaiter(this, void 0, void 0, function* () {
            return this.cartRepository.addCart(cartDetail);
        });
        this.updateCart = (cart) => __awaiter(this, void 0, void 0, function* () {
            return this.cartRepository.updateCart(cart);
        });
        this.deleteCart = (cartId) => __awaiter(this, void 0, void 0, function* () {
            return this.cartRepository.deleteCart(cartId);
        });
        this.cartRepository = cartRepository;
    }
}
exports.CartService = CartService;
