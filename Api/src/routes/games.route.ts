import express from 'express';
import GamesController from '../controllers/games.controller';

const router = express.Router();

router.post('/create', GamesController.createGame);

export default router;
