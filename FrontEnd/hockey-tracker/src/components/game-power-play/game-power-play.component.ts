import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GamesSubject } from '../../subjects/games.subject';
import { Game } from '../../models/game';
import '../../extensions/stringExtensions';

@Component({
  selector: 'app-game-power-play',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './game-power-play.component.html',
  styleUrl: './game-power-play.component.css',
})
export class GamePowerPlayComponent {
  constructor(private gamesSubject: GamesSubject) {}

  game: Game | undefined;

  opponentPenaltyNumber: number = 0;
  teamCreatedByPenaltyNumber: number = 0;

  teamCreatedByPPGoals: number = 0;
  opponentPPGoals: number = 0;

  teamCreatedByPPPercentage: number = 0;
  opponentTeamPPPercentage: number = 0;

  ngOnInit() {
    this.gamesSubject.selectedGame$.subscribe((game) => {
      this.game = game as Game;

      this.opponentPenaltyNumber = game?.opponentPenalties.length ?? 0;
      this.teamCreatedByPenaltyNumber = game?.penalties.length ?? 0;

      this.teamCreatedByPPGoals =
        game?.goals.filter((goal) => goal.type == 'power').length ?? 0;

      this.opponentPPGoals =
        game?.opponentGoals.filter((goal) => goal.type == 'power').length ?? 0;

      this.teamCreatedByPPPercentage = this.calculatePPPercentage(
        this.teamCreatedByPPGoals,
        this.opponentPenaltyNumber
      );

      this.opponentTeamPPPercentage = this.calculatePPPercentage(
        this.opponentPPGoals,
        this.teamCreatedByPenaltyNumber
      );
    });
  }

  private calculatePPPercentage(goalsScored: number, powerPlays: number) {
    if (powerPlays == 0) {
      return 0;
    }
    return (goalsScored / powerPlays) * 100;
  }
}
