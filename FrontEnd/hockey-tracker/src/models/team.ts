import { Player } from './player';

export interface Team {
  id: string;
  name: string;
  hasLogo?: boolean;
  players?: Player[];
}

export type TeamDTO = Omit<Team, 'id'>;

export interface PlayerTeam {
  id: string;
  name: string;
  playerNumber: number;
}

export interface AddPlayerDTO {
  playerId: string;
  teamId: string;
  playerNumber: number;
}
