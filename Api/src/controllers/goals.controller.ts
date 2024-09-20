import { Request, Response } from 'express';
import { GoalPostModel } from '../models/post-models/goal-post-model';
import {
    genericExceptionHandler,
    getCurrentSeason,
} from '../Helpers/prismaHelpter';
import { prisma } from '../server';

const createGoal = async (req: Request, res: Response) => {
    try {
        const {
            gameId,
            scoredByPlayerId,
            assist1,
            assist2,
            time,
            teamId,
        }: GoalPostModel = req.body;

        // Validate GoalPostModel

        // Add goal to goals table
        const goal = await prisma.goals.create({
            data: {
                id: crypto.randomUUID(),
                scoredByPlayerId: scoredByPlayerId,
                assist1,
                assist2,
                gameId,
                time,
            },
        });

        const currentSeason = await getCurrentSeason(res);

        // Increments goal scorers individual stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [scoredByPlayerId].map((player) => player),
                },
                seasonId: currentSeason?.id,
                teamId: null,
            },
            data: {
                numberOfGoals: { increment: 1 },
                totalPoints: { increment: 1 },
            },
        });

        // Increments goal scorers team stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [scoredByPlayerId].map((player) => player),
                },
                seasonId: currentSeason?.id,
                teamId: teamId,
            },
            data: {
                numberOfGoals: { increment: 1 },
                totalPoints: { increment: 1 },
            },
        });

        // Increments assists individual stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [
                        ensureAssistIsEmptyStringWhenNull(assist1),
                        ensureAssistIsEmptyStringWhenNull(assist2),
                    ],
                },
                seasonId: currentSeason?.id,
                teamId: null,
            },
            data: {
                numberOfAssists: { increment: 1 },
                totalPoints: { increment: 1 },
            },
        });

        // Increments assists team stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [
                        ensureAssistIsEmptyStringWhenNull(assist1),
                        ensureAssistIsEmptyStringWhenNull(assist2),
                    ],
                },
                seasonId: currentSeason?.id,
                teamId: teamId,
            },
            data: {
                numberOfAssists: { increment: 1 },
                totalPoints: { increment: 1 },
            },
        });

        // Increments games goals scored
        await prisma.games.update({
            where: {
                id: gameId,
            },
            data: {
                goalsScored: {
                    increment: 1,
                },
            },
        });

        res.status(201).json(goal);
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

const createOpponentGoal = async (req: Request, res: Response) => {
    try {
        const { gameId, scoredByPlayerFirstName, scoredByPlayerSurname, time } =
            req.body;

        // Add goal to goals table
        const goal = await prisma.opponentGoals.create({
            data: {
                id: crypto.randomUUID(),
                gameId,
                scoredByPlayerFirstName,
                scoredByPlayerSurname,
                time,
            },
        });

        // Increments games goals scored
        await prisma.games.update({
            where: {
                id: gameId,
            },
            data: {
                goalsConceeded: {
                    increment: 1,
                },
            },
        });

        res.status(201).json(goal);
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

function ensureAssistIsEmptyStringWhenNull(assist: string) {
    return assist == null ? '' : assist;
}

export default {
    createGoal,
    createOpponentGoal,
};
