export interface Penalty {
  id: number;
  gameId: string;
  playerId: string;
  type: string;
  duration: number;
  time: number;
}

export type PenaltyDTO = Omit<Penalty, 'id'> & {
  teamId: string;
};

export interface PenaltyPanel {
  offender: string;
  time: number; // in seconds
  type: string;
  duration: number;
}
