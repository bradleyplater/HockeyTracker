import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyPanelComponent } from './penalty-panel.component';

describe('PenaltyPanelComponent', () => {
  let component: PenaltyPanelComponent;
  let fixture: ComponentFixture<PenaltyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenaltyPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenaltyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
