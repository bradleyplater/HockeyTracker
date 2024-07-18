import { Component } from '@angular/core';
import { Team } from '../../models/team';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TeamsService } from '../../services/teams/teams.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'teams-list',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.css',
})
export class TeamsListComponent {
  constructor(private teamService: TeamsService) {}

  numberArray = Array(5)
    .fill(0)
    .map((x, i) => i);

  teams: Team[] = [];

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((teams) => (this.teams = teams));
  }
}
