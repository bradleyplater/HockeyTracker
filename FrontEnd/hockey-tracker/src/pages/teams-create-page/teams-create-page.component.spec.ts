import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCreatePageComponent } from './teams-create-page.component';

describe('TeamsCreatePageComponent', () => {
  let component: TeamsCreatePageComponent;
  let fixture: ComponentFixture<TeamsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
