import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlotDetailsComponent } from './edit-plot-details.component';

describe('EditPlotDetailsComponent', () => {
  let component: EditPlotDetailsComponent;
  let fixture: ComponentFixture<EditPlotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlotDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPlotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
