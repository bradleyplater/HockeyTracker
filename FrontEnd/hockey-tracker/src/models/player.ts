import { PlayerTeam } from './team';

export interface Player {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  number?: number;
  teams?: PlayerTeam[];
}

export type PlayerDTO = Omit<Player, 'id'>;
