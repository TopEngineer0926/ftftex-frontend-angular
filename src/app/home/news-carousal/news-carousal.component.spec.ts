import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCarousalComponent } from './news-carousal.component';

describe('NewsCarousalComponent', () => {
  let component: NewsCarousalComponent;
  let fixture: ComponentFixture<NewsCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCarousalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
