import { Request, Response } from 'express';
import {
    OpponentPenaltyPostModel,
    PenaltyPostModel,
} from '../models/post-models/penalty-post-model';
import {
    genericExceptionHandler,
    getCurrentSeason,
} from '../Helpers/prismaHelpter';
import { prisma } from '../server';

const createPenalty = async (req: Request, res: Response) => {
    try {
        const {
            gameId,
            playerId,
            type,
            duration,
            time,
            teamId,
        }: PenaltyPostModel = req.body;

        // Validate PenaltyPostModel

        // Add penalty to penalties table
        const goal = await prisma.penalties.create({
            data: {
                playerId: playerId,
                type,
                duration,
                gameId,
                time,
            },
        });

        const currentSeason = await getCurrentSeason(res);

        // Increments penalties individual stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [playerId].map((player) => player),
                },
                seasonId: currentSeason?.id,
                teamId: null,
            },
            data: {
                pims: { increment: duration },
            },
        });

        // Increments penalties team stats for season
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: [playerId].map((player) => player),
                },
                seasonId: currentSeason?.id,
                teamId: teamId,
            },
            data: {
                pims: { increment: duration },
            },
        });

        res.status(201).json(goal);
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

const createOpponentPenalty = async (req: Request, res: Response) => {
    try {
        const {
            gameId,
            playerFirstName,
            playerSurname,
            type,
            duration,
            time,
        }: OpponentPenaltyPostModel = req.body;

        // Validate PenaltyPostModel

        // Add penalty to opponent penalties table
        const penalty = await prisma.opponentPenalties.create({
            data: {
                playerFirstName,
                playerSurname,
                type,
                duration,
                gameId,
                time,
            },
        });
        res.status(201).json(penalty);
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

export default {
    createPenalty,
    createOpponentPenalty,
};
