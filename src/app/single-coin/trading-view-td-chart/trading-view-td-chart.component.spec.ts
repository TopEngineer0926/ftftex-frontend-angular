import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingViewTDChartComponent } from './trading-view-td-chart.component';

describe('TradingViewTDChartComponent', () => {
  let component: TradingViewTDChartComponent;
  let fixture: ComponentFixture<TradingViewTDChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingViewTDChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingViewTDChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
