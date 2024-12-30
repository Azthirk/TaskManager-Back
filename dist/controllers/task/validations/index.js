"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateId = exports.validateList = exports.validateTask = void 0;
const express_validator_1 = require("express-validator");
exports.validateTask = [
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('The title must be text'),
    (0, express_validator_1.body)('description')
        .optional()
        .isString().withMessage('The description must be text'),
    (0, express_validator_1.body)('completed')
        .optional()
        .isBoolean().withMessage('The completed status must be a boolean value'),
];
exports.validateList = [
    (0, express_validator_1.query)('page')
        .notEmpty().withMessage('page is required')
        .isNumeric().withMessage('The page must be number'),
    (0, express_validator_1.query)('limit')
        .notEmpty().withMessage('limit is required')
        .isNumeric().withMessage('The limit must be number'),
    (0, express_validator_1.query)('status')
        .optional()
        .isString().withMessage('The status must be text')
        .isIn(['completed', 'pending']).withMessage('The status must be either "completed" or "pending"'),
];
exports.validateId = [
    (0, express_validator_1.param)('id')
        .isMongoId().withMessage('That id is not valid'),
];
exports.validateUpdate = [
    (0, express_validator_1.param)('id')
        .isMongoId().withMessage('That id is not valid'),
    (0, express_validator_1.body)('title')
        .optional()
        .isString().withMessage('The title must be text'),
    (0, express_validator_1.body)('description')
        .optional()
        .isString().withMessage('The description must be text'),
    (0, express_validator_1.body)('completed')
        .optional()
        .isBoolean().withMessage('The completed status must be a boolean value'),
];
