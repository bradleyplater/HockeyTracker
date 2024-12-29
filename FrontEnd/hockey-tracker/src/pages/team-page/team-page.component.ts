import { Component, ElementRef, ViewChild } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { TeamSubject } from '../../subjects/teams.subject';

import { Team } from '../../models/team';
import { ActivatedRoute } from '@angular/router';
import '../../extensions/stringExtensions';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Player } from '../../models/player';
import { BehaviorSubject } from 'rxjs';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { GamesService } from '../../services/games/games.service';
import { GamesSubject } from '../../subjects/games.subject';
import { TeamStatsComponent } from '../../components/team-stats/team-stats.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [
    PlayersListComponent,
    MatTabsModule,
    GamesListComponent,
    TeamStatsComponent,
  ],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent {
  constructor(
    private teamsService: TeamsService,
    private gamesService: GamesService,
    private teamSubject: TeamSubject,
    private gamesSubject: GamesSubject,
    private route: ActivatedRoute
  ) {}

  team?: Team;
  players: Player[] = [];

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('teamId') as string;

    if (teamId == null) {
      console.log('teamId is null');
    }

    this.teamsService.getTeamById(teamId).subscribe((team) => {
      this.teamSubject.updateTeam(team);
    });

    this.gamesService.getGamesByTeamId(teamId).subscribe((games) => {
      this.gamesSubject.updategames(games);
    });
  }
}
