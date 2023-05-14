"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const celebrate_1 = require("celebrate");
exports.BookSchema = {
    add: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            price: celebrate_1.Joi.number().required(),
            categoryId: celebrate_1.Joi.number().required(),
            base64image: celebrate_1.Joi.any().required(),
        }),
    },
    update: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            id: celebrate_1.Joi.number().required(),
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            price: celebrate_1.Joi.number().required(),
            categoryId: celebrate_1.Joi.number().required(),
            base64image: celebrate_1.Joi.any().required(),
        }),
    },
    byId: {
        [celebrate_1.Segments.QUERY]: {
            id: celebrate_1.Joi.number().required(),
        },
    },
    all: {
        [celebrate_1.Segments.QUERY]: {
            pageSize: celebrate_1.Joi.number().required(),
            pageIndex: celebrate_1.Joi.number().required(),
            keyword: celebrate_1.Joi.string(),
        },
    },
    search: {
        [celebrate_1.Segments.QUERY]: {
            keyword: celebrate_1.Joi.string().required(),
        },
    },
};
