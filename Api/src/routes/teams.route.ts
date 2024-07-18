import express from 'express';
import TeamsController from '../controllers/teams.controller';

const router = express.Router();

router.get('/', TeamsController.getAllTeams);
router.get('/:teamId', TeamsController.getTeamById);
router.post('/create', TeamsController.createTeam);
router.patch('/addPlayer', TeamsController.addPlayerToTeam);

export default router;
