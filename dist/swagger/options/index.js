"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'API for managing tasks',
        },
    },
    servers: [
        {
            url: process.env.MONGO_URI
        },
    ],
    apis: ['./src/swagger/info/*.ts', './src/models/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = specs;
