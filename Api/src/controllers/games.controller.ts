import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';
import { PostGameModel } from '../models/post-models/game-post-model';
import { genericExceptionHandler } from '../Helpers/prismaHelpter';

const createGame = async (req: Request, res: Response) => {
    try {
        const {
            teamCreatedById,
            opponentTeamName,
            isHome,
            players,
            date,
            type,
        }: PostGameModel = req.body;

        let id = 'GME' + generateRandom6DigitNumber();

        // Validate input here

        const newTeam = await prisma.games.create({
            data: {
                id,
                teamCreatedById: teamCreatedById,
                opponentTeam: opponentTeamName,
                isHome: isHome,
                players: {
                    connect: players,
                },
                goalsConceeded: 0,
                goalsScored: 0,
                date: date,
                type: type,
            },
        });
        res.status(200).json(newTeam);
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

export default {
    createGame,
};
