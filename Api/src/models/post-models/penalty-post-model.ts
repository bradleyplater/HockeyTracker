export interface PenaltyPostModel {
    gameId: string;
    playerId: string;
    type: string;
    duration: number;
    time: number; // In seconds
    teamId: string;
}
