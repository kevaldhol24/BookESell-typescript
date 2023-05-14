"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagincationModel = void 0;
class PagincationModel {
    constructor(newResult) {
        this.pageIndex = newResult.pageIndex;
        this.pageSize = newResult.pageSize;
        this.totalPages = newResult.totalPages;
        this.items = newResult.items;
        this.totalItems = newResult.totalItems;
    }
}
exports.PagincationModel = PagincationModel;
