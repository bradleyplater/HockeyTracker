import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GoalsSubject } from '../../subjects/goals.subject';
import { Goal, GoalPanel, OpponentGoal } from '../../models/goal';
import { Team } from '../../models/team';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { GamesSubject } from '../../subjects/games.subject';

@Component({
  selector: 'app-game-period-scores',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './game-period-scores.component.html',
  styleUrl: './game-period-scores.component.css',
})
export class GamePeriodScoresComponent {
  constructor(private gamesSubject: GamesSubject) {}

  isLoading = true;

  private readonly twentyMinutes = 1200;
  private readonly fortyMinutes = this.twentyMinutes * 2;
  private readonly sixtyMinutes = this.twentyMinutes * 3;

  firstPeriodGoals: Goal[] = [];
  secondPeriodGoals: Goal[] = [];
  thirdPeriodGoals: Goal[] = [];

  firstPeriodGoalsOpponent: OpponentGoal[] = [];
  secondPeriodGoalsOpponent: OpponentGoal[] = [];
  thirdPeriodGoalsOpponent: OpponentGoal[] = [];

  periodScoresArray: {
    teamName: string;
    firstPeriodGoals: number;
    secondPeriodGoals: number;
    thirdPeriodGoals: number;
    totalGoals: number;
  }[] = [];

  displayedColumns: string[] = [
    'team',
    'firstPeriod',
    'secondPeriod',
    'thirdPeriod',
    'total',
  ];

  ngOnInit() {
    // ISSUE HERE WITH IT NOT AUTOMATICALLY UPDATING THE PERIOD SCORE

    this.gamesSubject.selectedGame$.subscribe((game) => {
      if (game == null) return;

      this.firstPeriodGoals =
        game.goals?.filter((goal) => goal.time <= this.twentyMinutes) || [];

      this.secondPeriodGoals =
        game.goals?.filter(
          (goal) =>
            goal.time > this.twentyMinutes && goal.time <= this.fortyMinutes
        ) || [];

      this.thirdPeriodGoals =
        game.goals?.filter(
          (goal) =>
            goal.time > this.fortyMinutes && goal.time <= this.sixtyMinutes
        ) || [];

      this.firstPeriodGoalsOpponent =
        game.opponentGoals?.filter((goal) => goal.time <= this.twentyMinutes) ||
        [];

      this.secondPeriodGoalsOpponent =
        game.opponentGoals?.filter(
          (goal) =>
            goal.time > this.twentyMinutes && goal.time <= this.fortyMinutes
        ) || [];

      this.thirdPeriodGoalsOpponent =
        game.opponentGoals?.filter(
          (goal) =>
            goal.time > this.fortyMinutes && goal.time <= this.sixtyMinutes
        ) || [];

      this.periodScoresArray.push({
        teamName: game.teamCreatedBy?.name!,
        firstPeriodGoals: this.firstPeriodGoals.length,
        secondPeriodGoals: this.secondPeriodGoals.length,
        thirdPeriodGoals: this.thirdPeriodGoals.length,
        totalGoals: game?.goalsScored!,
      });

      this.periodScoresArray.push({
        teamName: game?.opponentTeam!,
        firstPeriodGoals: this.firstPeriodGoalsOpponent.length,
        secondPeriodGoals: this.secondPeriodGoalsOpponent.length,
        thirdPeriodGoals: this.thirdPeriodGoalsOpponent.length,
        totalGoals: game?.goalsConceeded!,
      });
    });

    this.isLoading = false;
  }
}
