import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExchangeComponent } from './single-exchange.component';

describe('SingleExchangeComponent', () => {
  let component: SingleExchangeComponent;
  let fixture: ComponentFixture<SingleExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
