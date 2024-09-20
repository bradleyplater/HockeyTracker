import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPenaltyDialogComponent } from './add-penalty-dialog.component';

describe('AddPenaltyDialogComponent', () => {
  let component: AddPenaltyDialogComponent;
  let fixture: ComponentFixture<AddPenaltyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPenaltyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPenaltyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
