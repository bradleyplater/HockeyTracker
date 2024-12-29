import { Component, WritableSignal, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Player } from '../../models/player';
import { GamesService } from '../../services/games/games.service';
import { Game, GameDto } from '../../models/game';

@Component({
  selector: 'app-create-game-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-game-dialog.component.html',
  styleUrl: './create-game-dialog.component.css',
})
export class CreateGameDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateGameDialogComponent>);
  readonly data = inject<{
    players: Player[];
    teamId: string;
    games: WritableSignal<Game[]>;
  }>(MAT_DIALOG_DATA);

  constructor(private gamesService: GamesService) {}

  readonly gameTypes = ['cup', 'challenge'];

  selectedPlayers = new FormControl([]);

  createGameForm = new FormGroup({
    opponentTeam: new FormControl(''),
    date: new FormControl(''),
    isHome: new FormControl(false),
    type: new FormControl(''),
    season: new FormControl(''),
    players: this.selectedPlayers,
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const submittedForm = this.createGameForm.value;

    const createGame: GameDto = {
      opponentTeam: submittedForm.opponentTeam as string,
      date: new Date(submittedForm.date as string),
      isHome: submittedForm.isHome as boolean,
      type: submittedForm.type as 'cup' | 'challenge',
      players: (submittedForm.players as string[])?.map((player) => {
        return { id: player };
      }),
      teamCreatedById: this.data.teamId,
      goalsScored: 0,
      goalsConceeded: 0,
      seasonId: submittedForm.season as string,
    };

    this.gamesService.createGame(createGame).subscribe((game) => {
      console.log('CreatedGame: ', game);
      this.data.games.update((value) => [...value, game]);
      this.dialogRef.close();
    });
  }

  submitForm(form: any): void {
    form.ngSubmit.emit();
  }

  getPlayerNameById(id: string): string {
    const player = this.data.players.find((p) => p.id === id);
    return player
      ? player.firstName.toTitleCase() + ' ' + player.surname.toTitleCase()
      : '';
  }

  getSelectedPlayersDisplayText(): string {
    const selectedIds = this.createGameForm.value.players || [];
    if (selectedIds.length === 0) {
      return '';
    }
    const playerName = this.getPlayerNameById(selectedIds[0]);
    if (selectedIds.length === 1) {
      return playerName;
    }
    const additionalCount = selectedIds.length - 1;
    const additionalText = additionalCount === 1 ? 'other' : 'others';
    return `${playerName} (+${additionalCount} ${additionalText})`;
  }
}
