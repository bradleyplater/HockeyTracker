import { Component } from '@angular/core';
import { TeamsListComponent } from '../../components/teams-list/teams-list.component';

@Component({
  selector: 'app-teams-page',
  standalone: true,
  imports: [TeamsListComponent],
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.css',
})
export class TeamsPageComponent {
  title = 'Teams';
}
