import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainersAndLosersComponent } from './gainers-and-losers.component';

describe('GainersAndLosersComponent', () => {
  let component: GainersAndLosersComponent;
  let fixture: ComponentFixture<GainersAndLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GainersAndLosersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GainersAndLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
