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
    playerFirstName: string;
    playerSurname: string;
    type: string;
    duration: number;
    time: number; // In seconds
    teamId: string;
}
