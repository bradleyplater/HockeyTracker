import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import TeamsRouter from './routes/teams.route';
import PlayersRouter from './routes/players.route';
import GamesRouter from './routes/games.route';
import GoalsRouter from './routes/goals.route';
import PenaltiesRouter from './routes/penalties.route';

import cors from 'cors';

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
    app.use(express.json());
    app.use(cors());

    // Register API routes
    app.use('/api/v1/teams', TeamsRouter);
    app.use('/api/v1/players', PlayersRouter);
    app.use('/api/v1/games', GamesRouter);
    app.use('/api/v1/goals', GoalsRouter);
    app.use('/api/v1/penalties', PenaltiesRouter);

    // Catch unregistered routes
    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
