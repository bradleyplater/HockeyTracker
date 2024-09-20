import { Component, WritableSignal, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Player } from '../../models/player';
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
import { GoalDTO, GoalPanel, ScoreTrack } from '../../models/goal';
import { GoalsService } from '../../services/goals/goals.service';
import { Team } from '../../models/team';
import { GoalsSubject } from '../../subjects/goals.subject';

@Component({
  selector: 'app-add-goal-dialog',
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
  templateUrl: './add-goal-dialog.component.html',
  styleUrl: './add-goal-dialog.component.css',
})
export class AddGoalDialogComponent {
  constructor(
    private goalsService: GoalsService,
    private goalsSubject: GoalsSubject
  ) {}

  readonly dialogRef = inject(MatDialogRef<AddGoalDialogComponent>);
  readonly data = inject<{
    players: Player[];
    gameId: string;
    team: Team;
    goalsList: WritableSignal<GoalPanel[]>;
  }>(MAT_DIALOG_DATA);

  scoredBy = new FormControl('');
  assist1 = new FormControl('');
  assist2 = new FormControl('');
  minute = new FormControl('');
  second = new FormControl('');

  createGoalForm = new FormGroup({
    scoredBy: this.scoredBy,
    assist1: this.assist1,
    assist2: this.assist2,
    minute: this.minute,
    second: this.second,
  });

  onSubmit() {
    //TODO: Use this dialog to determine if it is home goal or opponent goal to remove duplication
    const submittedForm = this.createGoalForm.value;

    const goalTimeInSeconds =
      parseInt(submittedForm.minute!) * 60 + parseInt(submittedForm.second!);

    const createGoal: GoalDTO = {
      scoredByPlayerId: submittedForm.scoredBy as string,
      assist1: submittedForm.assist1 as string,
      assist2: submittedForm.assist2 as string,
      time: goalTimeInSeconds,
      gameId: this.data.gameId as string,
      teamId: this.data.team.id as string,
    };

    this.goalsService.createGame(createGoal).subscribe((goal) => {
      console.log('CreatedGoal: ', goal);

      const goalScorer = this.data.team?.players!.find(
        (player) => player.id === goal.scoredByPlayerId
      );
      const assist1 = this.data.team?.players!.find(
        (player) => player.id === goal.assist1
      );
      const assist2 = this.data.team?.players!.find(
        (player) => player.id === goal.assist2
      );

      this.goalsSubject.updateTotalGoals([
        ...this.data.goalsList(),
        {
          scoredBy: goalScorer
            ? `${goalScorer.firstName.toTitleCase()} ${goalScorer.surname.toTitleCase()}`
            : '',
          assist1: assist1
            ? `${assist1.firstName.toTitleCase()} ${assist1.surname.toTitleCase()}`
            : '',
          assist2: assist2
            ? `${assist2.firstName.toTitleCase()} ${assist2.surname.toTitleCase()}`
            : '',
          time: goal.time,
          isOpponentGoal: false,
        },
      ]);
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
