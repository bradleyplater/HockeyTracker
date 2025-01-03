import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';
import { Team } from '../models/team';
import { Player } from '../models/player';
import * as PrismaHelper from '../Helpers/prismaHelpter';

const createTeam = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        let id = 'TM' + generateRandom6DigitNumber();

        const newTeam = await prisma.teams.create({
            data: {
                id,
                name,
            },
        });
        res.status(200).json(newTeam);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.teams.findMany();
        res.status(200).json(teams);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getTeamById = async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    try {
        const team = await prisma.teams.findUnique({
            where: {
                id: teamId,
            },
            include: {
                players: {
                    include: {
                        player: {
                            include: {
                                stats: {
                                    where: {
                                        teamId: teamId,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (team != null) {
            const response: Team = {
                id: teamId,
                name: team.name,
                hasLogo: team.hasLogo,
                players: team.players.map((player) => {
                    return {
                        id: player.playerId,
                        email: player.player.email,
                        firstName: player.player.firstName,
                        surname: player.player.surname,
                        number: player.playerNumber,
                        stats: player.player.stats.map((stats) => {
                            return {
                                id: stats.id,
                                playerId: stats.playerId,
                                seasonId: stats.seasonId,
                                goals: stats.numberOfGoals,
                                assists: stats.numberOfAssists,
                                gamesPlayed: stats.gamesPlayed,
                                pims: stats.pims,
                                points: stats.totalPoints,
                            };
                        }),
                    } as Player;
                }),
            };

            res.status(200).json(response);
        } else {
            res.status(404).json();
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const addPlayerToTeam = async (req: Request, res: Response) => {
    const {
        teamId,
        playerId,
        playerNumber,
    }: { teamId: string; playerId: string; playerNumber: number } = req.body;

    try {
        await prisma.teams.update({
            where: {
                id: teamId,
            },
            data: {
                players: {
                    create: {
                        player: { connect: { id: playerId } },
                        playerNumber: playerNumber,
                    },
                },
            },
        });

        const currentSeason = await PrismaHelper.getCurrentSeason(res);

        if (currentSeason) {
            await prisma.playerStats.create({
                data: {
                    id: crypto.randomUUID(),
                    playerId: playerId,
                    teamId: teamId,
                    seasonId: currentSeason.id,
                },
            });
        } else {
            res.status(500).json({ error: 'Current season is null' });
        }

        PrismaHelper.getPlayerById(playerId, res);
    } catch (e) {}
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    addPlayerToTeam,
};
