import { Request, Response } from 'express';
import { prisma } from '../server';
import { generateRandom6DigitNumber } from '../Helpers/idHelpers';

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

export default {
    createTeam,
    getAllTeams,
};
