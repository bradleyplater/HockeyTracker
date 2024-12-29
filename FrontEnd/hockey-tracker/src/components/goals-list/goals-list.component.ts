import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { GoalsSubject } from '../../subjects/goals.subject';
import { GoalPanel, ScoreTrack } from '../../models/goal';
import { GoalPanelComponent } from '../goal-panel/goal-panel.component';
import { GamesSubject } from '../../subjects/games.subject';
import { Game } from '../../models/game';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [GoalPanelComponent],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.css',
})
export class GoalsListComponent {
  constructor(
    private gamesSubject: GamesSubject,
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

  goalsList: GoalPanel[] = [];
  firstPeriodGoals = signal([] as GoalPanel[]);
  secondPeriodGoals = signal([] as GoalPanel[]);
  thirdPeriodGoals = signal([] as GoalPanel[]);

  ngOnInit() {
    this.gamesSubject.selectedGame$.subscribe((game) => {
      if (!game) return;

      this.goalsList = [];
      this.updateGoalsListWithGoals(game);

      this.goalsList = this.updateGoalsWithScoreTrack(
        this.goalsList,
        game.teamCreatedBy.name.substring(0, 3).toUpperCase(),
        game.opponentTeam.substring(0, 3).toUpperCase()
      );

      this.firstPeriodGoals.set(
        this.goalsList.filter((goal) => goal.time <= this.twentyMinutes)
      );

      this.secondPeriodGoals.set(
        this.goalsList.filter(
          (goal) =>
            goal.time > this.twentyMinutes && goal.time <= this.fortyMinutes
        )
      );

      this.thirdPeriodGoals.set(
        this.goalsList.filter(
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

  private updateGoalsListWithGoals(game: Game) {
    game?.goals.forEach((goal) => {
      const goalScorer = game?.players!.find(
        (player) => player.id === goal.scoredByPlayerId
      );
      const assist1 = game.players!.find(
        (player) => player.id === goal.assist1
      );
      const assist2 = game.players!.find(
        (player) => player.id === goal.assist2
      );

      this.goalsList?.push({
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
      });
    });

    game?.opponentGoals.forEach((goal) => {
      this.goalsList?.push({
        scoredBy: `${goal.scoredByPlayerFirstName.toTitleCase()} ${goal.scoredByPlayerSurname.toTitleCase()}`,
        assist1: '',
        assist2: '',
        time: goal.time,
        isOpponentGoal: true,
      });
    });

    this.goalsList.sort((a, b) => a.time - b.time);
  }
}
