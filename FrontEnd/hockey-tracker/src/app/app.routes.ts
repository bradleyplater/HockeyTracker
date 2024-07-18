import { Routes } from '@angular/router';
import { TeamsPageComponent } from '../pages/teams-page/teams-page.component';
import { TeamsCreatePageComponent } from '../pages/teams-create-page/teams-create-page.component';
import { PlayersPageComponent } from '../pages/players-page/players-page.component';
import { PlayersCreatePageComponent } from '../pages/players-create-page/players-create-page.component';
import { TeamPageComponent } from '../pages/team-page/team-page.component';

export const routes: Routes = [
  { path: 'teams', component: TeamsPageComponent },
  { path: 'teams/create', component: TeamsCreatePageComponent },
  { path: 'teams/:teamId', component: TeamPageComponent },
  { path: 'players', component: PlayersPageComponent },
  { path: 'players/create', component: PlayersCreatePageComponent },
];
