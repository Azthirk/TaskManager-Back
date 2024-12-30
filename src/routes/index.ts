import { Router } from 'express';
import task from '../controllers/task/task.controller';

const router = Router();

router.use('/tasks', task);

export default router;
