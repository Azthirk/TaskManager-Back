import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Function to handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};