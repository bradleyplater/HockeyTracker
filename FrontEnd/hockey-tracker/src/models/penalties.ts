export interface Penalty {
  id: number;
  gameId: string;
  playerId: string;
  type: string;
  duration: number;
  time: number;
}

export interface OpponentPenalty {
  id: number;
  gameId: string;
  playerFirstName: string;
  playerSurname: string;
  type: string;
  duration: number;
  time: number;
}

export type PenaltyDTO = Omit<Penalty, 'id'> & {
  teamId: string;
};

export type OpponentPenaltyDTO = Omit<OpponentPenalty, 'id'>;

export interface PenaltyPanel {
  offender: string;
  time: number; // in seconds
  type: string;
  duration: number;
  isOpponentPenalty: boolean;
}
