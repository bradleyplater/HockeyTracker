export interface PenaltyPostModel {
    gameId: string;
    playerId: string;
    type: string;
    duration: number;
    time: number; // In seconds
    teamId: string;
}

export interface OpponentPenaltyPostModel {
    gameId: string;
    firstName: string;
    surname: string;
    type: string;
    duration: number;
    time: number; // In seconds
    teamId: string;
}
