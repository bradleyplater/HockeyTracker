export interface Player {
    id: string;
    email: string;
    firstName: string;
    surname: string;
    number?: number;
}

export interface PlayerStats {
    id: string;
    seasonId: string;
    seasonName: string;
    teamId?: string | undefined;
    goals: number;
    assists: number;
    gamesPlayed: number;
    pims: number;
    totalPoints: number;
}
