import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersCreatePageComponent } from './players-create-page.component';

describe('PlayersCreatePageComponent', () => {
  let component: PlayersCreatePageComponent;
  let fixture: ComponentFixture<PlayersCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
