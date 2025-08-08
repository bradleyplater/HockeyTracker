import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';
import * as PrismaHelper from '../Helpers/prismaHelper';

const createPlayer = async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            surname,
            email,
        }: { firstName: string; surname: string; email: string } = req.body;

        let id = 'PLR' + generateRandom6DigitNumber();

        // Don't think this is needed can use games to create new player stats objects rather than having them default. should save database space and confusion

        const newPlayer = await prisma.players.create({
            data: {
                id,
                firstName: firstName.toLowerCase(),
                surname: surname.toLowerCase(),
                email: email.toLowerCase(),
            },
        });
        res.status(200).json(newPlayer);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
};

const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const teams = await prisma.players.findMany({
            include: {
                teams: {
                    include: {
                        team: true,
                    },
                },
            },
        });

        const transformedData = teams.map((player) => {
            return {
                id: player.id,
                email: player.email,
                firstName: player.firstName,
                surname: player.surname,
                teams: player.teams.map((teamRelation) => {
                    return {
                        playerNumber: teamRelation.playerNumber,
                        name: teamRelation.team.name,
                    };
                }),
            };
        });

        res.status(200).json(transformedData);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getPlayerById = async (req: Request, res: Response) => {
    PrismaHelper.getPlayerById(req.params.playerId, res);
};

export default {
    createPlayer,
    getAllPlayers,
    getPlayerById,
};
