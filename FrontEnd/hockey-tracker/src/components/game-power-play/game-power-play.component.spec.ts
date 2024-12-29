import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePowerPlayComponent } from './game-power-play.component';

describe('GamePowerPlayComponent', () => {
  let component: GamePowerPlayComponent;
  let fixture: ComponentFixture<GamePowerPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePowerPlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePowerPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
