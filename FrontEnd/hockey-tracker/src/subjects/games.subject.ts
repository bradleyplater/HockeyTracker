import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GamesSubject {
  private gamesSubject = new BehaviorSubject<Game[] | null>(null);
  games$ = this.gamesSubject.asObservable();

  private selectedGameSubject = new BehaviorSubject<Game | null>(null);
  selectedGame$ = this.selectedGameSubject.asObservable();

  updategames(games: Game[]) {
    this.gamesSubject.next(games);
  }

  updateSelectedGame(game: Game) {
    this.selectedGameSubject.next(game);
  }
}
