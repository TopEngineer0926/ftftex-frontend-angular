import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadingviewtickerComponent } from './tadingviewticker.component';

describe('TadingviewtickerComponent', () => {
  let component: TadingviewtickerComponent;
  let fixture: ComponentFixture<TadingviewtickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadingviewtickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadingviewtickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
