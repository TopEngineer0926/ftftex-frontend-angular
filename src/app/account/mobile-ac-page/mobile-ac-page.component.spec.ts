import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAcPageComponent } from './mobile-ac-page.component';

describe('MobileAcPageComponent', () => {
  let component: MobileAcPageComponent;
  let fixture: ComponentFixture<MobileAcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAcPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
