import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PlotDetails } from './models/plot-details.type'
import { CropDetails } from './models/crop-details.type'
import { StandardDetails } from './models/standards-details.type'
import { MatButtonModule } from '@angular/material/button'
import { AddPlotComponent } from './components/add-plot/add-plot.component'
import { AddStandardsComponent } from './components/add-standards/add-standards.component'
import { AddCropComponent } from './components/add-crop/add-crop.component'
import { PlotStepperComponent } from './components/plot-stepper/plot-stepper.component'

@Component({
  selector: 'app-plot',
  standalone: true,
  imports: [
    MatButtonModule,
    PlotStepperComponent,
    AddPlotComponent,
    AddCropComponent,
    AddStandardsComponent,
  ],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent {
  stepperIndex: number = 0

  isPlotValid = false
  isCropsValid = false
  isStandardsValid = false

  plotValue?: PlotDetails
  cropDetialsValue?: CropDetails[]
  standardsValue?: StandardDetails

  onNextStepper(index: number): void {
    this.stepperIndex = index
  }

  onSubmit(value: StandardDetails) {
    this.standardsValue = value
    alert('submitted')
  }
}
