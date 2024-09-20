import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { GoalsSubject } from '../../subjects/goals.subject';
import { GoalPanel, ScoreTrack } from '../../models/goal';
import { GoalPanelComponent } from '../goal-panel/goal-panel.component';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [GoalPanelComponent],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.css',
})
export class GoalsListComponent {
  constructor(
    private goalsSubject: GoalsSubject,
    private cdr: ChangeDetectorRef
  ) {}

  isLoading = true;

  private readonly twentyMinutes = 1200;
  private readonly fortyMinutes = this.twentyMinutes * 2;
  private readonly sixtyMinutes = this.twentyMinutes * 3;

  get sortedFirstPeriodGoals() {
    return this.firstPeriodGoals().sort((a, b) => a.time - b.time);
  }

  get sortedSecondPeriodGoals() {
    return this.secondPeriodGoals().sort((a, b) => a.time - b.time);
  }

  get sortedThirdPeriodGoals() {
    return this.thirdPeriodGoals().sort((a, b) => a.time - b.time);
  }

  firstPeriodGoals = signal([] as GoalPanel[]);
  secondPeriodGoals = signal([] as GoalPanel[]);
  thirdPeriodGoals = signal([] as GoalPanel[]);

  ngOnInit() {
    this.goalsSubject.totalGoals$.subscribe((goalsList) => {
      if (!goalsList) return;

      goalsList = this.updateGoalsWithScoreTrack(goalsList, 'PET', 'AWA');

      this.firstPeriodGoals.set(
        goalsList.filter((goal) => goal.time <= this.twentyMinutes)
      );

      this.secondPeriodGoals.set(
        goalsList.filter(
          (goal) =>
            goal.time > this.twentyMinutes && goal.time <= this.fortyMinutes
        )
      );

      this.thirdPeriodGoals.set(
        goalsList.filter(
          (goal) =>
            goal.time > this.fortyMinutes && goal.time <= this.sixtyMinutes
        )
      );

      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  private updateGoalsWithScoreTrack(
    goals: GoalPanel[],
    homeTeam: string,
    awayTeam: string
  ) {
    let homeScore = 0;
    let opponentScore = 0;
    //const homeTeam = this.team!.name.substring(0, 3);
    const opponentTeam = awayTeam;

    const updatedGoals = goals.map((goal) => {
      if (goal.isOpponentGoal) {
        opponentScore++;
      } else {
        homeScore++;
      }

      const leadingTeam =
        homeScore > opponentScore
          ? homeTeam.toUpperCase()
          : homeScore < opponentScore
          ? opponentTeam.toUpperCase()
          : 'TIE';

      const scoreTrack: ScoreTrack = {
        goalsScored: homeScore,
        goalsConceeded: opponentScore,
        leadingTeam,
      };

      return {
        ...goal,
        scoreTracker: scoreTrack,
      };
    });

    return updatedGoals;
  }
}
