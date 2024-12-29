import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../models/team';
import { PlayerStats } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class TeamSubject {
  private teamSubject = new BehaviorSubject<Team | null>(null);
  team$ = this.teamSubject.asObservable();

  private teamPlayerStatsSubject = new BehaviorSubject<PlayerStats[] | null>(
    null
  );

  playerStats$ = this.teamPlayerStatsSubject.asObservable();

  updateTeam(team: Team) {
    this.teamSubject.next(team);
  }

  updateFilteredPlayerStats(playerStats: PlayerStats[]) {
    this.teamPlayerStatsSubject.next(playerStats);
  }
}
