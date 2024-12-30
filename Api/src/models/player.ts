export interface Player {
    id: string;
    email: string;
    firstName: string;
    surname: string;
    number?: number;
    lastfivegames: LastFiveStats;
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

export interface LastFiveStats {
    goals: number;
    assists: number;
    pims: number;
}
