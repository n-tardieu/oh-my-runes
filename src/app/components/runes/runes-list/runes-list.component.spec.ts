import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunesListComponent } from './runes-list.component';

describe('RunesListComponent', () => {
  let component: RunesListComponent;
  let fixture: ComponentFixture<RunesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
