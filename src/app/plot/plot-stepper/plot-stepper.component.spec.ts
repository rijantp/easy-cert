import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotStepperComponent } from './plot-stepper.component';

describe('PlotStepperComponent', () => {
  let component: PlotStepperComponent;
  let fixture: ComponentFixture<PlotStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlotStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
