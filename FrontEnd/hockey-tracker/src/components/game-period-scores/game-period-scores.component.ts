import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GoalsSubject } from '../../subjects/goals.subject';
import { GoalPanel } from '../../models/goal';
import { Team } from '../../models/team';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-game-period-scores',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './game-period-scores.component.html',
  styleUrl: './game-period-scores.component.css',
})
export class GamePeriodScoresComponent {
  constructor(
    private goalsSubject: GoalsSubject,
    private cdr: ChangeDetectorRef
  ) {}

  isLoading = true;

  @Input() team!: Team;
  @Input() game!: Game;

  private readonly twentyMinutes = 1200;
  private readonly fortyMinutes = this.twentyMinutes * 2;
  private readonly sixtyMinutes = this.twentyMinutes * 3;

  firstPeriodGoals: GoalPanel[] = [];
  secondPeriodGoals: GoalPanel[] = [];
  thirdPeriodGoals: GoalPanel[] = [];

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

    this.goalsSubject.totalGoals$.subscribe((goals) => {
      this.firstPeriodGoals =
        goals?.filter((goal) => goal.time <= this.twentyMinutes) || [];

      this.secondPeriodGoals =
        goals?.filter(
          (goal) =>
            goal.time > this.twentyMinutes && goal.time <= this.fortyMinutes
        ) || [];

      this.thirdPeriodGoals =
        goals?.filter(
          (goal) =>
            goal.time > this.fortyMinutes && goal.time <= this.sixtyMinutes
        ) || [];
    });

    this.periodScoresArray.push({
      teamName: this.team?.name!,
      firstPeriodGoals: this.firstPeriodGoals.filter(
        (goal) => !goal.isOpponentGoal
      ).length,
      secondPeriodGoals: this.secondPeriodGoals.filter(
        (goal) => !goal.isOpponentGoal
      ).length,
      thirdPeriodGoals: this.thirdPeriodGoals.filter(
        (goal) => !goal.isOpponentGoal
      ).length,
      totalGoals: this.game?.goalsScored!,
    });

    this.periodScoresArray.push({
      teamName: this.game?.opponentTeam!,
      firstPeriodGoals: this.firstPeriodGoals.filter(
        (goal) => goal.isOpponentGoal
      ).length,
      secondPeriodGoals: this.secondPeriodGoals.filter(
        (goal) => goal.isOpponentGoal
      ).length,
      thirdPeriodGoals: this.thirdPeriodGoals.filter(
        (goal) => goal.isOpponentGoal
      ).length,
      totalGoals: this.game?.goalsConceeded!,
    });
  }
}
