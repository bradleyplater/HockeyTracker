import { Component, signal } from '@angular/core';
import { GamesSubject } from '../../subjects/games.subject';
import { OpponentPenalty, Penalty, PenaltyPanel } from '../../models/penalties';
import { PenaltyPanelComponent } from '../penalty-panel/penalty-panel.component';
import { Penalties } from '../../contants/penalties';

@Component({
  selector: 'app-penalty-list',
  standalone: true,
  imports: [PenaltyPanelComponent],
  templateUrl: './penalty-list.component.html',
  styleUrl: './penalty-list.component.css',
})
export class PenaltyListComponent {
  constructor(private gamesSubject: GamesSubject) {}

  private readonly twentyMinutes = 1200;
  private readonly fortyMinutes = this.twentyMinutes * 2;
  private readonly sixtyMinutes = this.twentyMinutes * 3;

  penalties: PenaltyPanel[] = [];
  private firstPeriodPenalties = signal([] as PenaltyPanel[]);
  private secondPeriodPenalties = signal([] as PenaltyPanel[]);
  private thirdPeriodPenalties = signal([] as PenaltyPanel[]);

  get sortedFirstPeriodPenalties() {
    return this.firstPeriodPenalties().sort((a, b) => a.time - b.time);
  }

  get sortedSecondPeriodPenalties() {
    return this.secondPeriodPenalties().sort((a, b) => a.time - b.time);
  }

  get sortedThirdPeriodPenalties() {
    return this.thirdPeriodPenalties().sort((a, b) => a.time - b.time);
  }

  isLoading = true;

  ngOnInit() {
    this.gamesSubject.selectedGame$.subscribe((game) => {
      this.penalties = [];
      game?.penalties.forEach((penalty: Penalty) => {
        const offender = game.players.find(
          (player) => player.id == penalty.playerId
        );

        this.penalties.push({
          offender: `${offender?.firstName!.toTitleCase()} ${offender?.surname!.toTitleCase()}`,
          duration: penalty.duration,
          time: penalty.time,
          type: Penalties[penalty.type as keyof typeof Penalties],
          isOpponentPenalty: false,
        });

        this.firstPeriodPenalties.set(
          this.penalties.filter((penalty) => penalty.time <= this.twentyMinutes)
        );

        this.secondPeriodPenalties.set(
          this.penalties.filter(
            (penalty) =>
              penalty.time > this.twentyMinutes &&
              penalty.time <= this.fortyMinutes
          )
        );

        this.thirdPeriodPenalties.set(
          this.penalties.filter(
            (penalty) =>
              penalty.time > this.fortyMinutes &&
              penalty.time <= this.sixtyMinutes
          )
        );
      });

      game?.opponentPenalties.forEach((penalty: OpponentPenalty) => {
        this.penalties.push({
          offender: `${penalty.playerFirstName.toTitleCase()} ${penalty.playerSurname.toTitleCase()}`,
          duration: penalty.duration,
          time: penalty.time,
          type: Penalties[penalty.type as keyof typeof Penalties],
          isOpponentPenalty: true,
        });

        this.firstPeriodPenalties.set(
          this.penalties.filter((penalty) => penalty.time <= this.twentyMinutes)
        );

        this.secondPeriodPenalties.set(
          this.penalties.filter(
            (penalty) =>
              penalty.time > this.twentyMinutes &&
              penalty.time <= this.fortyMinutes
          )
        );

        this.thirdPeriodPenalties.set(
          this.penalties.filter(
            (penalty) =>
              penalty.time > this.fortyMinutes &&
              penalty.time <= this.sixtyMinutes
          )
        );
      });

      console.log(this.penalties);

      this.isLoading = false;
    });
  }
}
