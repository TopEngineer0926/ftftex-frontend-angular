import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarousalComponent } from './main-carousal.component';

describe('MainCarousalComponent', () => {
  let component: MainCarousalComponent;
  let fixture: ComponentFixture<MainCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCarousalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
