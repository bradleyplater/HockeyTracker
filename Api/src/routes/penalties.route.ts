import express from 'express';
import penaltiesController from '../controllers/penalties.controller';

const router = express.Router();

router.post('/create', penaltiesController.createPenalty);
router.post(
    '/create/opponentPenalty',
    penaltiesController.createOpponentPenalty
);

export default router;
