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
const express_1 = require("express");
const validations_1 = require("./validations");
const utils_1 = require("../../utils");
const task_model_1 = __importDefault(require("../../models/task.model"));
const router = (0, express_1.Router)();
// Route to create a task
router.post('', validations_1.validateTask, utils_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    try {
        const newTask = new task_model_1.default({
            title,
            description,
            completed,
        });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err });
    }
}));
// Route to obtain the list with task pagination
router.get('', validations_1.validateList, utils_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, status } = req.query;
    const pageValue = parseInt(page) || 1;
    const limitValue = parseInt(limit) || 5;
    const statusValue = status || undefined;
    const completed = statusValue ?
        statusValue.includes('completed') ? true : false
        : undefined;
    const skip = (pageValue - 1) * limitValue;
    try {
        const totalItems = yield task_model_1.default.countDocuments(completed !== undefined ? { completed } : {});
        const data = yield task_model_1.default.find(completed !== undefined ? { completed } : {})
            .skip(skip)
            .limit(limitValue)
            .exec();
        res.status(200).json({
            pageValue,
            totalItems,
            totalPages: Math.ceil(totalItems / limitValue),
            data
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error getting tasks', error: err });
    }
}));
// Route to get a task by id
router.get('/:id', validations_1.validateId, utils_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield task_model_1.default.findById(id).exec();
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ message: 'Error getting task', error: err });
    }
}));
// Route to update a task by id
router.put('/:id', validations_1.validateUpdate, utils_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = yield task_model_1.default.findById(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        if (title)
            task.title = title;
        if (description)
            task.description = description;
        if (completed !== undefined)
            task.completed = completed;
        const updatedTask = yield task.save();
        res.status(200).json(updatedTask);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err });
    }
}));
// Route to delete a task by id
router.delete('/:id', validations_1.validateId, utils_1.handleValidationErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield task_model_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err });
    }
}));
exports.default = router;
