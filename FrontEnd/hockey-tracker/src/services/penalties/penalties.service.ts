import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Penalty, PenaltyDTO } from '../../models/penalties';
const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class PenaltiesService {
  constructor(private http: HttpClient) {}

  createPenalty(penalty: PenaltyDTO) {
    return this.http.post<Penalty>(BASE_URL + '/penalties/create', penalty);
  }
}
