import { Goal, OpponentGoal } from './goal';
import { OpponentPenalty, Penalty } from './penalties';
import { Player } from './player';

export interface Game {
  id: string;
  opponentTeam: string;
  date: Date;
  type: 'cup' | 'challenge';
  isHome: boolean;
  players: Player[];
  teamCreatedById: string;
  goalsScored: number;
  goalsConceeded: number;
  goals: Goal[];
  opponentGoals: OpponentGoal[];
  penalties: Penalty[];
  opponentPenalties: OpponentPenalty[];
}

export type GameDto = Omit<
  Game,
  | 'id'
  | 'goals'
  | 'opponentGoals'
  | 'penalties'
  | 'opponentPenalties'
  | 'players'
> & {
  players: { id: string }[];
};
