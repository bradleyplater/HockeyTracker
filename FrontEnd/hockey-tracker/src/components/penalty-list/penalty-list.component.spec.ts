import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyListComponent } from './penalty-list.component';

describe('PenaltyListComponent', () => {
  let component: PenaltyListComponent;
  let fixture: ComponentFixture<PenaltyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenaltyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenaltyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
