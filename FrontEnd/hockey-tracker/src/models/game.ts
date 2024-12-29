import { Goal, OpponentGoal } from './goal';
import { OpponentPenalty, Penalty } from './penalties';
import { Player } from './player';
import { Team } from './team';

export interface Game {
  id: string;
  opponentTeam: string;
  date: Date;
  type: 'cup' | 'challenge';
  isHome: boolean;
  players: Player[];
  teamCreatedBy: Team;
  goalsScored: number;
  goalsConceeded: number;
  goals: Goal[];
  opponentGoals: OpponentGoal[];
  penalties: Penalty[];
  opponentPenalties: OpponentPenalty[];
  seasonId: string;
}

export type GameDto = Omit<
  Game,
  | 'id'
  | 'goals'
  | 'opponentGoals'
  | 'penalties'
  | 'opponentPenalties'
  | 'players'
  | 'teamCreatedBy'
> & {
  players: { id: string }[];
  teamCreatedById: string;
};
