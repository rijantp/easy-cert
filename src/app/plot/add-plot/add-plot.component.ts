import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { PlotDetailsComponent } from '../components/plot-details/plot-details.component'
import { MatStepperModule } from '@angular/material/stepper'

import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [PlotDetailsComponent, MatStepperModule, MatButtonModule],
  templateUrl: './add-plot.component.html',
  styleUrl: './add-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlotComponent {
  @ViewChild(PlotDetailsComponent) plotDetailsComponent!: PlotDetailsComponent

  onNext(): void {
    console.log(this.plotDetailsComponent.plotForm.value)
  }
}
