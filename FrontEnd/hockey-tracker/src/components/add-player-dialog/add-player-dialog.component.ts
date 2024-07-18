import {
  Component,
  Inject,
  WritableSignal,
  inject,
  model,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Player } from '../../models/player';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import '../../extensions/stringExtensions';
import { AsyncPipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { TeamsService } from '../../services/teams/teams.service';
import { AddPlayerDTO } from '../../models/team';

@Component({
  selector: 'add-player-dialog',
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
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.css',
})
export class AddPlayerDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddPlayerDialogComponent>);
  readonly data = inject<{
    allPlayers: Player[];
    teamPlayers: WritableSignal<Player[]>;
    teamId: string;
  }>(MAT_DIALOG_DATA);

  options: Player[] = [];
  filteredOptions!: Observable<Player[]>;
  playerIdFormControl = new FormControl('');

  addPlayerForm = new FormGroup({
    playerId: this.playerIdFormControl,
    number: new FormControl(''),
    teamId: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: { players: Player[] },
    private teamsService: TeamsService
  ) {}

  ngOnInit() {
    this.options = this.data.allPlayers;

    this.filteredOptions = this.playerIdFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const submittedForm = this.addPlayerForm.value;

    // FORM NEEDS VALIDATING
    const addPlayer: AddPlayerDTO = {
      playerId: submittedForm.playerId as string,
      playerNumber: parseInt(submittedForm.number as string),
      teamId: this.data.teamId,
    };

    this.teamsService.addPlayerToTeam(addPlayer).subscribe((player) => {
      console.log('Added player to team: ', player);
      player.number = player.teams?.find(
        (team) => team.id == addPlayer.teamId
      )?.playerNumber;
      this.data.teamPlayers.update((value) => [...value, player]);
      this.dialogRef.close();
    });
  }

  submitForm(form: any): void {
    form.ngSubmit.emit();
  }

  private _filter(value: string): Player[] {
    const filterValue = value.toLowerCase();

    // Add a check and log to see the state of options
    if (!Array.isArray(this.options)) {
      console.error('Options is not an array:', this.options);
      return [];
    }

    return this.options.filter(
      (option) =>
        option.firstName.toLowerCase().includes(filterValue) ||
        option.surname.toLowerCase().includes(filterValue)
    );
  }
}
