import { Component } from '@angular/core';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { PlayersService } from '../../services/players/players.service';
import { PlayerSubject } from '../../subjects/players.subject';

import { Player } from '../../models/player';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [PlayersListComponent],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.css',
})
export class PlayersPageComponent {
  constructor(
    private playersService: PlayersService,
    private playersSubject: PlayerSubject
  ) {}

  players: Player[] = [];

  ngOnInit(): void {
    this.playersService
      .getAllPlayers()
      .subscribe((players) => this.playersSubject.updateplayers(players));
  }
}
