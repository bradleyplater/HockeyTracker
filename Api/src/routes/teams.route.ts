import express from 'express';
import TeamsController from '../controllers/teams.controller';

const router = express.Router();

router.get('/', TeamsController.getAllTeams);
router.post('/create', TeamsController.createTeam);

export default router;
