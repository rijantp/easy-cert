import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PlotDetails } from '../../models/plot-details.type'
import { CropDetails } from '../../models/crop-details.type'
import { StandardDetails } from '../../models/standards-details.type'
import { MatButtonModule } from '@angular/material/button'
import { AddStandardsComponent } from './add-standards/add-standards.component'
import { AddCropComponent } from './add-crop/add-crop.component'
import { PlotStepperComponent } from '../plot-stepper/plot-stepper.component'
import { AddPlotDetailsComponent } from './add-plot-details/add-plot-details.component'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [
    MatButtonModule,
    PlotStepperComponent,
    AddPlotDetailsComponent,
    AddCropComponent,
    AddStandardsComponent,
  ],
  templateUrl: './add-plot.component.html',
  styleUrl: './add-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlotComponent {
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
