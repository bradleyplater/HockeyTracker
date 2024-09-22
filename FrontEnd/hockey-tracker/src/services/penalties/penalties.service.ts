import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OpponentPenalty,
  OpponentPenaltyDTO,
  Penalty,
  PenaltyDTO,
} from '../../models/penalties';
const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class PenaltiesService {
  constructor(private http: HttpClient) {}

  createPenalty(penalty: PenaltyDTO) {
    return this.http.post<Penalty>(BASE_URL + '/penalties/create', penalty);
  }

  createOpponentPenalty(penalty: OpponentPenaltyDTO) {
    return this.http.post<OpponentPenalty>(
      BASE_URL + '/penalties/create/opponentPenalty',
      penalty
    );
  }
}
