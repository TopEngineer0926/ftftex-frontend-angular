import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusPopComponent } from './order-status-pop.component';

describe('OrderStatusPopComponent', () => {
  let component: OrderStatusPopComponent;
  let fixture: ComponentFixture<OrderStatusPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
