import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamSubject {
  private teamSubject = new BehaviorSubject<Team | null>(null);
  team$ = this.teamSubject.asObservable();

  updateTeam(team: Team) {
    this.teamSubject.next(team);
  }
}
