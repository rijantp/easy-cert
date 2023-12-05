import { ChangeDetectionStrategy, Component } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { PlotStepperComponent } from './plot-stepper/plot-stepper.component'
import { AddPlotComponent } from './add-plot/add-plot.component'

@Component({
  selector: 'app-plot',
  standalone: true,
  imports: [MatButtonModule, PlotStepperComponent, AddPlotComponent],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent {
  stepperIndex: number = 0

  onNextStepper(index: number): void {
    console.log(index)

    this.stepperIndex = index
  }
}
