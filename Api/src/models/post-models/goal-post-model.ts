export interface GoalPostModel {
    gameId: string;
    scoredByPlayerId: string;
    assist1: string;
    assist2: string;
    time: number; // In seconds
    teamId: string;
    type: string;
}
