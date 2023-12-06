import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddPlotComponent } from './add-plot-details.component'

describe('AddPlotComponent', () => {
  let component: AddPlotComponent
  let fixture: ComponentFixture<AddPlotComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlotComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddPlotComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
