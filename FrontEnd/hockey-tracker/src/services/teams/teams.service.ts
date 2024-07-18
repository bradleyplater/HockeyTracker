import { Injectable } from '@angular/core';
import { AddPlayerDTO, Team, TeamDTO } from '../../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(BASE_URL + '/teams');
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(BASE_URL + `/teams/${id}`);
  }

  createTeam(team: TeamDTO) {
    console.log(team);
    return this.http.post<TeamDTO>(BASE_URL + '/teams/create', team);
  }

  addPlayerToTeam(addPlayer: AddPlayerDTO) {
    return this.http.patch<Player>(BASE_URL + '/teams/addPlayer', addPlayer);
  }
}
