import { NumberValueAccessor } from '@angular/forms';
import { PlayerTeam } from './team';

export interface Player {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  number?: number;
  teams?: PlayerTeam[];
  stats?: PlayerStats[];
  lastFiveGames?: LastFiveStats;
}

export interface LastFiveStats {
  goals: number;
  assists: number;
  pims: number;
}

export interface PlayerStats {
  playerId: string;
  seasonId: string;
  goals: number;
  assists: number;
  gamesPlayed: number;
  pims: number;
  points: number;
  teamId: string;
}

export interface PlayerStatsTable {
  playerName: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  penalties: number;
  points: number;
  pointsPerGame: number;
}

export type PlayerDTO = Omit<Player, 'id'>;
