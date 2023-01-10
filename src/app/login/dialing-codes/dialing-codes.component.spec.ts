import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialingCodesComponent } from './dialing-codes.component';

describe('DialingCodesComponent', () => {
  let component: DialingCodesComponent;
  let fixture: ComponentFixture<DialingCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialingCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialingCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
