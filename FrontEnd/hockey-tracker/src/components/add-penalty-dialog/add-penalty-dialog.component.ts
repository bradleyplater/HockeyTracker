import { Component, WritableSignal, inject } from '@angular/core';
import { AddGoalDialogComponent } from '../add-goal-dialog/add-goal-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Player } from '../../models/player';
import { Team } from '../../models/team';
import { PenaltyDTO, PenaltyPanel } from '../../models/penalties';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Penalties, penaltyDurations } from '../../contants/penalties';
import { PenaltiesService } from '../../services/penalties/penalties.service';
import { Game } from '../../models/game';
import { GamesSubject } from '../../subjects/games.subject';

@Component({
  selector: 'app-add-penalty-dialog',
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
  ],
  templateUrl: './add-penalty-dialog.component.html',
  styleUrl: './add-penalty-dialog.component.css',
})
export class AddPenaltyDialogComponent {
  constructor(
    private penaltyService: PenaltiesService,
    private gameSubject: GamesSubject
  ) {}

  readonly dialogRef = inject(MatDialogRef<AddGoalDialogComponent>);
  readonly data = inject<{
    players: Player[];
    game: Game;
    team: Team;
  }>(MAT_DIALOG_DATA);

  readonly penaltyTypes = Object.values(Penalties);
  readonly penaltyDurations = penaltyDurations;

  offender = new FormControl('');
  type = new FormControl('');
  duration = new FormControl(0);
  minute = new FormControl('');
  second = new FormControl('');

  createPenaltyForm = new FormGroup({
    offender: this.offender,
    type: this.type,
    duration: this.duration,
    minute: this.minute,
    second: this.second,
  });

  onSubmit() {
    //TODO: Use this dialog to determine if it is home pernalty or opponent penalty to remove duplication
    const submittedForm = this.createPenaltyForm.value;

    const peanltyTimeInSeconds =
      parseInt(submittedForm.minute!) * 60 + parseInt(submittedForm.second!);

    const createPenalty: PenaltyDTO = {
      playerId: submittedForm.offender as string,
      type: submittedForm.type as string,
      duration: submittedForm.duration as number,
      time: peanltyTimeInSeconds,
      gameId: this.data.game.id as string,
      teamId: this.data.team.id as string,
    };

    this.penaltyService.createPenalty(createPenalty).subscribe((penalty) => {
      console.log('CreatedPenalty: ', penalty);

      this.data.game.penalties.push(penalty);

      this.gameSubject.updateSelectedGame(this.data.game);

      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  getDisplayText(selectedId: string | null | undefined): string {
    if (selectedId) {
      return this.getPlayerNameById(selectedId);
    }

    return 'Unknown';
  }
}
