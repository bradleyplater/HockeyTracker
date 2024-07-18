import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'app-teams-create-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './teams-create-page.component.html',
  styleUrl: './teams-create-page.component.css',
})
export class TeamsCreatePageComponent {
  constructor(private teamsService: TeamsService) {}

  teamForm = new FormGroup({
    teamName: new FormControl(''),
  });

  onSubmit() {
    if (this.teamForm.value.teamName) {
      this.teamsService
        .createTeam({
          name: this.teamForm.value.teamName,
        })
        .subscribe((team) => console.log('Created Team: ', team));
    } else {
      console.log('teamName empty');
    }
  }
}
