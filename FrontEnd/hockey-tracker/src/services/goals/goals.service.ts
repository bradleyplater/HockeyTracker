import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal, GoalDTO } from '../../models/goal';
const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  createGame(goal: GoalDTO) {
    return this.http.post<Goal>(BASE_URL + '/goals/create', goal);
  }
}
