import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPanelComponent } from './goal-panel.component';

describe('GoalPanelComponent', () => {
  let component: GoalPanelComponent;
  let fixture: ComponentFixture<GoalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
