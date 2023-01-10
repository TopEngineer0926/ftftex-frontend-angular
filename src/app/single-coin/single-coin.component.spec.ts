import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCoinComponent } from './single-coin.component';

describe('SingleCoinComponent', () => {
  let component: SingleCoinComponent;
  let fixture: ComponentFixture<SingleCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
