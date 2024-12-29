import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TeamSubject } from '../../subjects/teams.subject';
import { Team } from '../../models/team';
import { MatSelectModule } from '@angular/material/select';
import { PlayerStats, PlayerStatsTable } from '../../models/player';
import { filter } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-stats',
  standalone: true,
  imports: [MatSelectModule, CommonModule, MatTableModule, MatSortModule],
  templateUrl: './team-stats.component.html',
  styleUrl: './team-stats.component.css',
})
export class TeamStatsComponent {
  team!: Team | null;
  filteredPlayerStats!: PlayerStats[] | null;
  displayedColumns: string[] = [
    'player',
    'gamesPlayed',
    'goals',
    'assists',
    'penalties',
    'points',
    'pointsPerGame',
  ];

  playerStatsArray: PlayerStatsTable[] = [];

  constructor(private teamSubject: TeamSubject) {}

  dataSource = new MatTableDataSource(this.playerStatsArray);
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.teamSubject.team$.subscribe((team) => {
      this.team = team;
    });

    this.teamSubject.playerStats$.subscribe((playerStats) => {
      console.log('updating filtered players');

      this.playerStatsArray = [];
      playerStats?.forEach((stats) => {
        const player = this.team?.players?.find(
          (player) => player.id == stats.playerId
        );

        this.playerStatsArray.push({
          playerName: `${player?.firstName.toTitleCase()} ${player?.surname.toTitleCase()}`,
          gamesPlayed: stats.gamesPlayed,
          goals: stats.goals,
          assists: stats.assists,
          penalties: stats.pims,
          points: stats.points,
          pointsPerGame:
            Math.round(
              (stats.points / stats.gamesPlayed + Number.EPSILON) * 100
            ) / 100,
        });
      });

      this.playerStatsArray = [...this.playerStatsArray];
      this.dataSource.data = this.playerStatsArray; //Not dynamically updating the table

      console.log('Updated playerStatsArray:', this.playerStatsArray);
      console.log('Updated dataSource:', this.dataSource.data);
    });

    this.getStatsForGivenSeason('all');
  }

  getStatsForGivenSeason(season: string) {
    let filteredStats: PlayerStats[] = [];

    this.team?.players?.forEach((player) => {
      player.stats?.forEach((stats) => {
        if (season == 'all') {
          filteredStats.push(stats);
        } else if (season == stats.seasonId) {
          filteredStats.push(stats);
        }
      });
    });

    this.teamSubject.updateFilteredPlayerStats(filteredStats);
  }
}
