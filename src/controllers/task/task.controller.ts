import { Router, Request, Response } from 'express';
import { validateTask, validateList, validateId, validateUpdate } from './validations';
import { handleValidationErrors } from '../../utils';
import Task from '../../models/task.model';

const router = Router();

// Route to create a task
router.post('', validateTask, handleValidationErrors, async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
});

// Route to obtain the list with task pagination
router.get('', validateList, handleValidationErrors, async (req: Request, res: Response) => {
    const { page, limit, status } = req.query;

    const pageValue = parseInt(page as string) || 1;
    const limitValue = parseInt(limit as string) || 5;
    const statusValue = status as string || undefined;

    const completed = statusValue ?
        statusValue.includes('completed') ? true : false
    : undefined;

    const skip = (pageValue - 1) * limitValue; 
  
    try {
        const totalItems = await Task.countDocuments(completed !== undefined ? { completed } : {});
        const data = await Task.find(completed !== undefined ? { completed } : {})
            .skip(skip)     
            .limit(limitValue)   
            .exec();
  
        res.status(200).json({
            pageValue,
            totalItems,
            totalPages: Math.ceil(totalItems / limitValue),
            data
      });
    } catch (err) {
        res.status(500).json({ message: 'Error getting tasks', error: err });
    }
});

// Route to get a task by id
router.get('/:id', validateId, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).exec();
        if (!task){
            res.status(404).json({ message: 'Task not found' })
            return
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error getting task', error: err });
    }
});

// Route to update a task by id
router.put('/:id', validateUpdate, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (completed !== undefined) task.completed = completed;

        const updatedTask = await task.save();
        
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err });
    }
});

// Route to delete a task by id
router.delete('/:id', validateId, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err });
    }
});

export default router;
