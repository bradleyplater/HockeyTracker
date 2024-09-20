import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  effect,
  ChangeDetectorRef,
  Input,
  Signal,
} from '@angular/core';
import { Player } from '../../models/player';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PlayersService } from '../../services/players/players.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import '../../extensions/stringExtensions';
import { Team } from '../../models/team';
import { Subscription } from 'rxjs';
import { TeamSubject } from '../../subjects/teams.subject';
import { CommonModule, NgIf } from '@angular/common';
import { PlayerSubject } from '../../subjects/players.subject';
import { CreateGameDialogComponent } from '../create-game-dialog/create-game-dialog.component';
import { GamesService } from '../../services/games/games.service';
import { GamesSubject } from '../../subjects/games.subject';
import { Game } from '../../models/game';

@Component({
  selector: 'games-list',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    NgIf,
    CommonModule,
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {
  constructor(
    private gamesService: GamesService,
    private teamSubject: TeamSubject,
    private gamesSubject: GamesSubject,
    private cdr: ChangeDetectorRef
  ) {}
  private subscription: Subscription = new Subscription();

  readonly dialog = inject(MatDialog);
  team: Team | null = null;
  gamesList = signal([] as Game[]);

  ngOnInit() {
    this.teamSubject.team$.subscribe((team) => {
      if (team && team.players) {
        this.team = team;
        this.cdr.detectChanges();
      }
    });

    this.gamesSubject.games$.subscribe((games) => {
      this.gamesList.set(games as Game[]);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGameDialogComponent, {
      data: {
        players: this.team?.players,
        teamId: this.team?.id,
        games: this.gamesList,
      },

      width: '600px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
