import { Prisma } from '@prisma/client';
import { PlayerStats } from '../models/player';
import { prisma } from '../server';
import { Response } from 'express';

export async function getPlayerById(playerId: string, res: Response) {
    try {
        const player = await prisma.players.findUnique({
            where: {
                id: playerId,
            },
            include: {
                teams: {
                    include: {
                        team: true,
                    },
                },
                stats: {
                    include: {
                        season: true,
                    },
                },
            },
        });

        if (player) {
            const transformedData = {
                id: player.id,
                email: player.email,
                firstName: player.firstName,
                surname: player.surname,
                teams: player.teams.map((teamRelation) => {
                    return {
                        id: teamRelation.teamId,
                        playerNumber: teamRelation.playerNumber,
                        name: teamRelation.team.name,
                    };
                }),
                stats: player.stats.map((stat) => {
                    return {
                        id: stat.id,
                        seasonName: stat.season.name,
                        seasonId: stat.season.id,
                        goals: stat.numberOfGoals,
                        assists: stat.numberOfAssists,
                        gamesPlayed: stat.gamesPlayed,
                        pims: stat.pims,
                        totalPoints: stat.totalPoints,
                    } as PlayerStats;
                }),
            };
            res.status(200).json(transformedData);
        } else {
            res.status(404).json();
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export async function getCurrentSeason(res: Response) {
    try {
        const currentDate = new Date();

        let seasons = await prisma.season.findMany();

        seasons = seasons.filter((season) => {
            if (
                currentDate > season.startDate &&
                currentDate < season.endDate
            ) {
                return season;
            }
        });

        return {
            id: seasons[0].id,
            name: seasons[0].name,
            startDate: seasons[0].startDate,
            endDate: seasons[0].endDate,
        };
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export async function genericExceptionHandler(
    exception: unknown,
    res: Response
) {
    if (
        exception instanceof Prisma.PrismaClientKnownRequestError ||
        exception instanceof Prisma.PrismaClientValidationError
    ) {
        if (
            exception instanceof Prisma.PrismaClientKnownRequestError &&
            exception.code == 'P2003'
        ) {
            res.status(400).json();
        } else if (
            exception instanceof Prisma.PrismaClientKnownRequestError &&
            exception.code == 'P2025'
        ) {
            res.status(404).json();
        } else {
            res.status(500).json({ error: exception.message });
        }
    } else {
        res.status(500).json({ error: exception });
    }
}
