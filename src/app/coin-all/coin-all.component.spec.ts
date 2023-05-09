import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinAllComponent } from './coin-all.component';

describe('CoinAllComponent', () => {
  let component: CoinAllComponent;
  let fixture: ComponentFixture<CoinAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
