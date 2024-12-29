import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GamesSubject } from '../../subjects/games.subject';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-game-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css',
})
export class GameTableComponent {
  displayedColumns: string[] = [
    'player',
    'goals',
    'assists',
    'penalties',
    'points',
  ];

  playerStatsArray: {
    playerName: string;
    goals: number;
    assists: number;
    penalties: number;
    points: number;
  }[] = [];

  constructor(private gamesSubject: GamesSubject) {}

  dataSource = new MatTableDataSource(this.playerStatsArray);
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.gamesSubject.selectedGame$.subscribe((game) => {
      game?.players.forEach((player) => {
        let playerStats = {
          playerName: `${player.firstName.toTitleCase()} ${player.surname.toTitleCase()}`,
          goals: 0,
          assists: 0,
          penalties: 0,
          points: 0,
        };

        game.goals.forEach((goal) => {
          if (goal.scoredByPlayerId == player.id) {
            playerStats.goals++;
            playerStats.points++;
          }

          if (goal.assist1 == player.id || goal.assist2 == player.id) {
            playerStats.assists++;
            playerStats.points++;
          }
        });

        game.penalties.forEach((penalty) => {
          if (penalty.playerId == player.id) {
            playerStats.penalties += penalty.duration;
          }
        });
        this.playerStatsArray.push(playerStats);
      });
    });
  }
}
