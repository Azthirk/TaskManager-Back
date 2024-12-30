import { body, query, param } from 'express-validator';

export const validateTask = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('The title must be text'),
    body('description')
        .optional()
        .isString().withMessage('The description must be text'),
    body('completed')
        .optional()
        .isBoolean().withMessage('The completed status must be a boolean value'),
];
    
export const validateList = [
    query('page')
        .notEmpty().withMessage('page is required')
        .isNumeric().withMessage('The page must be number'),
    query('limit')
        .notEmpty().withMessage('limit is required')
        .isNumeric().withMessage('The limit must be number'),
    query('status')
        .optional()
        .isString().withMessage('The status must be text')
        .isIn(['completed', 'pending']).withMessage('The status must be either "completed" or "pending"'),
];

export const validateId = [
    param('id')
        .isMongoId().withMessage('That id is not valid'),
];

export const validateUpdate = [
    param('id')
        .isMongoId().withMessage('That id is not valid'),
    body('title')
        .optional()
        .isString().withMessage('The title must be text'),
    body('description')
        .optional()
        .isString().withMessage('The description must be text'),
    body('completed')
        .optional()
        .isBoolean().withMessage('The completed status must be a boolean value'),
]