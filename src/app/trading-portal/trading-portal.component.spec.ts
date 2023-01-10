import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPortalComponent } from './trading-portal.component';

describe('TradingPortalComponent', () => {
  let component: TradingPortalComponent;
  let fixture: ComponentFixture<TradingPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
