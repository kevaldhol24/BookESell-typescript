"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const celebrate_1 = require("celebrate");
exports.UserSchema = {
    byId: {
        [celebrate_1.Segments.QUERY]: {
            id: celebrate_1.Joi.number().required(),
        },
    },
    login: {
        [celebrate_1.Segments.BODY]: {
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string(),
        },
    },
    all: {
        [celebrate_1.Segments.QUERY]: {
            pageSize: celebrate_1.Joi.number().required(),
            pageIndex: celebrate_1.Joi.number().required(),
            keyword: celebrate_1.Joi.string(),
        },
    },
    add: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().email().required(),
            firstName: celebrate_1.Joi.string().required().max(50),
            lastName: celebrate_1.Joi.string().required().max(50),
            roleId: celebrate_1.Joi.number().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    },
    update: {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            id: celebrate_1.Joi.number().required(),
            email: celebrate_1.Joi.string().email().required(),
            firstName: celebrate_1.Joi.string().required().max(50),
            lastName: celebrate_1.Joi.string().required().max(50),
            roleId: celebrate_1.Joi.number().required(),
            role: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    },
};
