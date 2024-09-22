import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Goal,
  GoalDTO,
  OpponentGoal,
  OpponentGoalDTO,
} from '../../models/goal';
const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  createGoal(goal: GoalDTO) {
    return this.http.post<Goal>(BASE_URL + '/goals/create', goal);
  }

  createOpponentGoal(goal: OpponentGoalDTO) {
    return this.http.post<OpponentGoal>(
      BASE_URL + '/goals/create/opponentGoal',
      goal
    );
  }
}
