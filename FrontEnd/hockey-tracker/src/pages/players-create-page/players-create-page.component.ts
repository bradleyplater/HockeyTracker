import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlayersService } from '../../services/players/players.service';

@Component({
  selector: 'app-players-create-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './players-create-page.component.html',
  styleUrl: './players-create-page.component.css',
})
export class PlayersCreatePageComponent {
  constructor(private playersService: PlayersService) {}

  playerForm = new FormGroup({
    firstName: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
  });

  onSubmit() {
    const formValue = this.playerForm.value;

    if (formValue.firstName && formValue.surname && formValue.email) {
      this.playersService
        .createPlayer({
          firstName: formValue.firstName,
          surname: formValue.surname,
          email: formValue.email,
        })
        .subscribe((player) => {
          console.log('Created Player: ', player);
          location.assign(`/players`);
        });
    } else {
      console.log('one form entry is empty');
    }
  }
}
