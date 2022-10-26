import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneCardComponent } from './rune-card.component';

describe('RuneCardComponent', () => {
  let component: RuneCardComponent;
  let fixture: ComponentFixture<RuneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuneCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
