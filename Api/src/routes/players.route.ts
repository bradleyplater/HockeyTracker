import express from 'express';
import PlayersController from '../controllers/players.controller';

const router = express.Router();

router.get('/', PlayersController.getAllPlayers);
router.get('/:playerId', PlayersController.getPlayerById);
router.post('/create', PlayersController.createPlayer);

export default router;
