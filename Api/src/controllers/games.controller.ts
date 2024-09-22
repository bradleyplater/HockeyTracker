import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';
import { PostGameModel } from '../models/post-models/game-post-model';
import { genericExceptionHandler } from '../Helpers/prismaHelpter';

const createGame = async (req: Request, res: Response) => {
    try {
        const {
            teamCreatedById,
            opponentTeam,
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
                opponentTeam: opponentTeam,
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

const getAllGames = async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    try {
        if (teamId != null || teamId != undefined) {
            const games = await prisma.games.findMany({
                where: {
                    teamCreatedById: teamId,
                },
            });

            if (games.length > 0) {
                res.status(200).json(games);
            } else {
                res.status(404).json();
            }
        } else {
            res.status(400).json();
        }
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

const getGameById = async (req: Request, res: Response) => {
    const gameId = req.params.gameId;
    try {
        if (gameId != null || gameId != undefined) {
            const game = await prisma.games.findUnique({
                where: {
                    id: gameId,
                },
                include: {
                    goals: true,
                    opponentGoals: true,
                    players: true,
                    penalties: true,
                    opponentPenalties: true,
                },
            });
            if (game) {
                res.status(200).json(game);
            } else {
                res.status(404).json();
            }
        } else {
            res.status(400).json();
        }
    } catch (e) {
        genericExceptionHandler(e, res);
    }
};

export default {
    createGame,
    getAllGames,
    getGameById,
};
