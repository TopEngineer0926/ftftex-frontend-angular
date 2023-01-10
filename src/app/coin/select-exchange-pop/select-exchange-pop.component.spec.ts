import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExchangePopComponent } from './select-exchange-pop.component';

describe('SelectExchangePopComponent', () => {
  let component: SelectExchangePopComponent;
  let fixture: ComponentFixture<SelectExchangePopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectExchangePopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExchangePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
