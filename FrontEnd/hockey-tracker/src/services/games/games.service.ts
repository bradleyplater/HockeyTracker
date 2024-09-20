import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameDto } from '../../models/game';
import { map } from 'rxjs';
const BASE_URL = 'http://localhost:8080/api/v1';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  createGame(game: GameDto) {
    console.log(game);
    return this.http
      .post<Game>(BASE_URL + '/games/create', game)
      .pipe(map(this.mapGameDate));
  }

  getGamesByTeamId(teamId: string) {
    return this.http
      .get<Game[]>(BASE_URL + `/games/team/${teamId}`)
      .pipe(map(this.mapGameDatesArray));
  }

  getGameById(gameId: string) {
    return this.http
      .get<Game>(BASE_URL + `/games/${gameId}`)
      .pipe(map(this.mapGameDate));
  }

  private mapGameDate(game: Game): Game {
    game.date = new Date(game.date);
    return game;
  }

  private mapGameDatesArray(games: Game[]): Game[] {
    return games.map((game) => {
      game.date = new Date(game.date);
      return game;
    });
  }
}
