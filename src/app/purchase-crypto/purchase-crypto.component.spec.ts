import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCryptoComponent } from './purchase-crypto.component';

describe('PurchaseCryptoComponent', () => {
  let component: PurchaseCryptoComponent;
  let fixture: ComponentFixture<PurchaseCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
