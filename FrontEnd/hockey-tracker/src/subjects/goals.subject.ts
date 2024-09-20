import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoalPanel } from '../models/goal';

@Injectable({
  providedIn: 'root',
})
export class GoalsSubject {
  private totalGoalsSubject = new BehaviorSubject<GoalPanel[] | null>(null);
  totalGoals$ = this.totalGoalsSubject.asObservable();

  updateTotalGoals(goals: GoalPanel[]) {
    this.totalGoalsSubject.next(goals);
  }
}
