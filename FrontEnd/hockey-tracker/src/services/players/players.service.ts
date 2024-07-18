import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player, PlayerDTO } from '../../models/player';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(BASE_URL + '/players');
  }

  createPlayer(player: PlayerDTO) {
    return this.http.post<PlayerDTO>(BASE_URL + '/players/create', player);
  }
}
