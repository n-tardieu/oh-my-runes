import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantsAndGemsParamsComponent } from './enchants-and-gems-params.component';

describe('EnchantsAndGemsParamsComponent', () => {
  let component: EnchantsAndGemsParamsComponent;
  let fixture: ComponentFixture<EnchantsAndGemsParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnchantsAndGemsParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnchantsAndGemsParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
