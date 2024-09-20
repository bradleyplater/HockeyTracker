import { Goal, OpponentGoal } from './goal';
import { Penalty } from './penalties';
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
}

export type GameDto = Omit<
  Game,
  'id' | 'goals' | 'opponentGoals' | 'penalties' | 'players'
> & {
  players: { id: string }[];
};
