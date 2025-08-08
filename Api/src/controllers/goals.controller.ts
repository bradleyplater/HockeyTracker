import { Request, Response } from 'express';
import { GoalPostModel } from '../models/post-models/goal-post-model';
import {
    genericExceptionHandler,
    getCurrentSeason,
    getGameById,
} from '../Helpers/prismaHelper';
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
            type,
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
                type,
            },
        });

        const game = await getGameById(gameId);
        const currentSeasonId = game?.seasonId;

        // Increments goal scorers individual stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [scoredByPlayerId].map((player) => player),
                },
                seasonId: currentSeasonId,
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
                seasonId: currentSeasonId,
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
                seasonId: currentSeasonId,
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
                seasonId: currentSeasonId,
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
        const {
            gameId,
            scoredByPlayerFirstName,
            scoredByPlayerSurname,
            time,
            type,
        } = req.body;

        // Add goal to goals table
        const goal = await prisma.opponentGoals.create({
            data: {
                id: crypto.randomUUID(),
                gameId,
                scoredByPlayerFirstName,
                scoredByPlayerSurname,
                time,
                type,
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
