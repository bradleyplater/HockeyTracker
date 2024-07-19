import express from 'express';
import GoalsController from '../controllers/goals.controller';

const router = express.Router();

router.post('/create', GoalsController.createGoal);

export default router;
