import express from 'express';
import penaltiesController from '../controllers/penalties.controller';

const router = express.Router();

router.post('/create', penaltiesController.createPenalty);

export default router;
