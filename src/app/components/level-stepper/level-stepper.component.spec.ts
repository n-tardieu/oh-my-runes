import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStepperComponent } from './level-stepper.component';

describe('LevelStepperComponent', () => {
  let component: LevelStepperComponent;
  let fixture: ComponentFixture<LevelStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
