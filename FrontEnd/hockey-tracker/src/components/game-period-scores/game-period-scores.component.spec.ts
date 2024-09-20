import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePeriodScoresComponent } from './game-period-scores.component';

describe('GamePeriodScoresComponent', () => {
  let component: GamePeriodScoresComponent;
  let fixture: ComponentFixture<GamePeriodScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePeriodScoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePeriodScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
