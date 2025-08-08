import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';
import { PostGameModel } from '../models/post-models/game-post-model';
import { genericExceptionHandler } from '../Helpers/prismaHelper';
import { getGameById as getGame } from '../Helpers/prismaHelper';
import { connect } from 'http2';

interface PlayerStatsEntry {
    playerId: string;
    seasonId: string;
    teamId: string | null;
}

const createGame = async (req: Request, res: Response) => {
    try {
        const {
            teamCreatedById,
            opponentTeam,
            isHome,
            players,
            date,
            type,
            seasonId,
        }: PostGameModel = req.body;

        let id = 'GME' + generateRandom6DigitNumber();

        // Validate input here

        const newGame = await prisma.games.create({
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
                seasonId: seasonId,
            },
        });

        // Fetch existing player stats for null team and specific team
        const existingStats = await prisma.playerStats.findMany({
            where: {
                OR: [{ teamId: null }, { teamId: teamCreatedById }],
                playerId: {
                    in: players.map((player) => player.id),
                },
                seasonId: seasonId,
            },
        });

        const existingStatsMap = new Map(
            existingStats.map((stat) => [
                `${stat.playerId}-${stat.teamId}`,
                stat,
            ])
        );

        // Identify players needing new stats entries
        const newStatsEntries: PlayerStatsEntry[] = [];

        players.forEach((player) => {
            const playerId = player.id;
            const playerTeamKey = `${playerId}-${teamCreatedById}`;
            const playerNullTeamKey = `${playerId}-null`;

            if (!existingStatsMap.has(playerTeamKey)) {
                newStatsEntries.push({
                    playerId,
                    seasonId,
                    teamId: teamCreatedById,
                });
            }

            if (!existingStatsMap.has(playerNullTeamKey)) {
                newStatsEntries.push({
                    playerId,
                    seasonId,
                    teamId: null,
                });
            }
        });

        // remove duplication
        const existingKeys = new Set(
            existingStats.map(
                (stat) => `${stat.playerId}-${stat.seasonId}-${stat.teamId}`
            )
        );

        const uniqueNewStats = newStatsEntries.filter(
            (entry) =>
                !existingKeys.has(
                    `${entry.playerId}-${entry.seasonId}-${entry.teamId}`
                )
        );

        // Create new stats entries if necessary
        if (uniqueNewStats.length > 0) {
            await prisma.playerStats.createMany({
                data: uniqueNewStats.map((entry) => ({
                    ...entry,
                    numberOfGoals: 0,
                    numberOfAssists: 0,
                    gamesPlayed: 0,
                    pims: 0,
                    totalPoints: 0,
                })),
            });
        }

        // Update stats for null team
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: players.map((player) => player.id),
                },
                seasonId: seasonId,
                teamId: null,
            },
            data: {
                gamesPlayed: { increment: 1 },
            },
        });

        // Update stats for specific team
        await prisma.playerStats.updateMany({
            where: {
                playerId: {
                    in: players.map((player) => player.id),
                },
                seasonId: seasonId,
                teamId: teamCreatedById,
            },
            data: {
                gamesPlayed: { increment: 1 },
            },
        });

        res.status(200).json(newGame);
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
            const game = await getGame(gameId);
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
