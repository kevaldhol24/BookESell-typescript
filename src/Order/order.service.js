"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.addOrder = (order) => {
            return this.orderRepository.addOrder(order);
        };
        this.orderRepository = orderRepository;
    }
}
exports.OrderService = OrderService;
