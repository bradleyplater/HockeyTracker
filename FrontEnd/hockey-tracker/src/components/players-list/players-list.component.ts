import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  effect,
  ChangeDetectorRef,
  Input,
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
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Subscription } from 'rxjs';
import { TeamSubject } from '../../subjects/teams.subject';
import { NgIf } from '@angular/common';
import { PlayerSubject } from '../../subjects/players.subject';

@Component({
  selector: 'players-list',
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
  ],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersListComponent {
  constructor(
    private playersService: PlayersService,
    private teamSubject: TeamSubject,
    private playerSubject: PlayerSubject,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.cdr.detectChanges();
    });
  }

  @Input() isForTeam?: boolean;

  playersList = signal([] as Player[]);
  team: Team | null = null;
  private subscription: Subscription = new Subscription();

  allPlayers: Player[] = [];
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    if (this.isForTeam) {
      this.subscription = this.teamSubject.team$.subscribe((team) => {
        if (team && team.players) {
          this.team = team;
          this.playersList.set(team.players);
          this.cdr.detectChanges();
        }
      });
    } else {
      this.subscription = this.playerSubject.player$.subscribe((players) => {
        if (players) {
          this.playersList.set(players);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    this.playersService.getAllPlayers().subscribe((players) => {
      this.allPlayers = players;

      const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
        data: {
          allPlayers: this.allPlayers,
          teamPlayers: this.playersList,
          teamId: this.team?.id,
        },
        width: '600px',
        height: '300px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    });
  }
}
