import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewBuyAndSellComponent } from './trading-view-buy-and-sell.component';

describe('TradingViewBuyAndSellComponent', () => {
  let component: TradingViewBuyAndSellComponent;
  let fixture: ComponentFixture<TradingViewBuyAndSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewBuyAndSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewBuyAndSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
