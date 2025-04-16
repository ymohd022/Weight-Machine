import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightDisplayComponent } from './weight-display.component';

describe('WeightDisplayComponent', () => {
  let component: WeightDisplayComponent;
  let fixture: ComponentFixture<WeightDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
