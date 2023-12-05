import { ChangeDetectionStrategy, Component } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { AddCropComponent } from './add-crop/add-crop.component'
import { AddStandardsComponent } from './add-standards/add-standards.component'
import { PlotStepperComponent } from './components/plot-stepper/plot-stepper.component'
import { AddPlotComponent } from './add-plot/add-plot.component'
import { PlotDetails } from './models/plot-details.type'
import { CropDetails } from './models/crop-details'

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

  onNextStepper(index: number): void {
    console.log(index)

    this.stepperIndex = index
  }
}
