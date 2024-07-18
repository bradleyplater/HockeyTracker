import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerSubject {
  private playerSubject = new BehaviorSubject<Player[] | null>(null);
  player$ = this.playerSubject.asObservable();

  updateplayers(player: Player[]) {
    this.playerSubject.next(player);
  }
}
