import express from 'express';
import GamesController from '../controllers/games.controller';

const router = express.Router();
router.get('/team/:teamId', GamesController.getAllGames);
router.get('/:gameId', GamesController.getGameById);
router.post('/create', GamesController.createGame);

export default router;
