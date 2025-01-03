export interface Goal {
  id: string;
  scoredByPlayerId: string;
  assist1: string;
  assist2: string;
  type: string;
  time: number; // in seconds
}

export interface OpponentGoal {
  id: string;
  scoredByPlayerFirstName: string;
  scoredByPlayerSurname: string;
  type: string;
  time: number; // in seconds
}

export interface GoalPanel {
  scoredBy: string;
  assist1: string;
  assist2: string;
  time: number; // in seconds
  isOpponentGoal: boolean;
  scoreTracker?: ScoreTrack;
}

export interface ScoreTrack {
  goalsScored: number;
  goalsConceeded: number;
  leadingTeam: string;
}

export interface GoalDTO {
  scoredByPlayerId: string;
  assist1: string;
  assist2: string;
  time: number; // in seconds
  type: string;
  teamId: string;
  gameId: string;
}

export interface OpponentGoalDTO {
  scoredByPlayerFirstName: string;
  scoredByPlayerSurname: string;
  time: number; // in seconds
  type: string;
  gameId: string;
}
