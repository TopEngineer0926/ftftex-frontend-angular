import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTrendingMetricsComponent } from './global-trending-metrics.component';

describe('GlobalTrendingMetricsComponent', () => {
  let component: GlobalTrendingMetricsComponent;
  let fixture: ComponentFixture<GlobalTrendingMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalTrendingMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTrendingMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
