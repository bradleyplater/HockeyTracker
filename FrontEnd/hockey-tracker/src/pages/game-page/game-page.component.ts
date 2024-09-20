import {
  Component,
  inject,
  signal,
  effect,
  computed,
  WritableSignal,
  Signal,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { Game } from '../../models/game';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams/teams.service';
import { GoalPanelComponent } from '../../components/goal-panel/goal-panel.component';
import { Goal, GoalPanel, OpponentGoal, ScoreTrack } from '../../models/goal';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddGoalDialogComponent } from '../../components/add-goal-dialog/add-goal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalsSubject } from '../../subjects/goals.subject';
import { GoalsListComponent } from '../../components/goals-list/goals-list.component';
import { GamePeriodScoresComponent } from '../../components/game-period-scores/game-period-scores.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GamesSubject } from '../../subjects/games.subject';
import { PenaltyListComponent } from '../../components/penalty-list/penalty-list.component';
import { AddPenaltyDialogComponent } from '../../components/add-penalty-dialog/add-penalty-dialog.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    GoalPanelComponent,
    GoalsListComponent,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    GoalsListComponent,
    GamePeriodScoresComponent,
    PenaltyListComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent {
  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private teamService: TeamsService,
    private goalsSubject: GoalsSubject,
    private gameSubject: GamesSubject
  ) {}

  readonly addGoalDialog = inject(MatDialog);
  readonly addPenaltyDialog = inject(MatDialog);

  game?: Game;
  team?: Team;
  totalGoals = signal([] as GoalPanel[]);
  totalPenalties = signal([]);

  isLoading = true;

  trackByFn(index: number, item: any): any {
    return index; // or item.id if you have a unique identifier for each item
  }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('gameId') as string;

    if (gameId == null) {
      console.log('gameId is null');
      this.isLoading = false;
    }

    this.gamesService.getGameById(gameId).subscribe((game) => {
      this.game = game;

      this.gameSubject.updateSelectedGame(game);

      if (this.game) {
        this.teamService
          .getTeamById(this.game?.teamCreatedById)
          .subscribe((team) => {
            this.team = team;
            if (this.team) {
              //TODO: This should probably be moved to the same pattern as the penalties
              this.mapGoalsToGoalPanel(this.game?.goals!);
              this.mapOpponentGoalsToGoalPanel(this.game?.opponentGoals!);

              this.totalGoals().sort((a, b) => a.time - b.time);

              this.goalsSubject.updateTotalGoals(this.totalGoals());

              this.isLoading = false;
            }
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  openAddGoalsDialog() {
    const dialogRef = this.addGoalDialog.open(AddGoalDialogComponent, {
      data: {
        players: this.team?.players?.filter((player) =>
          this.game?.players.some((gamePlayer) => gamePlayer.id == player.id)
        ),
        gameId: this.game?.id,
        team: this.team,
        goalsList: this.totalGoals,
      },

      width: '600px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openAddPenaltyDialog() {
    const dialogRef = this.addPenaltyDialog.open(AddPenaltyDialogComponent, {
      data: {
        players: this.game?.players,
        game: this.game,
        team: this.team,
        goalsList: this.totalGoals,
      },

      width: '600px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private mapGoalsToGoalPanel(goals: Goal[]) {
    goals.forEach((goal) => {
      const goalScorer = this.team?.players!.find(
        (player) => player.id === goal.scoredByPlayerId
      );
      const assist1 = this.team?.players!.find(
        (player) => player.id === goal.assist1
      );
      const assist2 = this.team?.players!.find(
        (player) => player.id === goal.assist2
      );

      this.totalGoals?.update((value) => [
        ...value,
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
    });
  }

  private mapOpponentGoalsToGoalPanel(goals: OpponentGoal[]) {
    goals.forEach((goal) => {
      this.totalGoals?.update((value) => [
        ...value,
        {
          scoredBy: `${goal.scoredByPlayerFirstName.toTitleCase()} ${goal.scoredByPlayerSurname.toTitleCase()}`,
          assist1: '',
          assist2: '',
          time: goal.time,
          isOpponentGoal: true,
        },
      ]);
    });
  }
}
