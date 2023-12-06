import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlotComponent } from './edit-plot.component';

describe('EditPlotComponent', () => {
  let component: EditPlotComponent;
  let fixture: ComponentFixture<EditPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
