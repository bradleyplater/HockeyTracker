import { Component, signal } from '@angular/core';
import { GamesSubject } from '../../subjects/games.subject';
import { Penalty, PenaltyPanel } from '../../models/penalties';
import { PenaltyPanelComponent } from '../penalty-panel/penalty-panel.component';

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
          offender: offender?.firstName!,
          duration: penalty.duration,
          time: penalty.time,
          type: penalty.type,
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
