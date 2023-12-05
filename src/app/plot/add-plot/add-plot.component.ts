import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core'
import { PlotDetailsComponent } from '../components/plot-details/plot-details.component'
import { MatStepperModule } from '@angular/material/stepper'

import { MatButtonModule } from '@angular/material/button'
import { CropDetailsComponent } from '../components/crop-details/crop-details.component'
import { StandardsComponent } from '../components/standards/standards.component'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [
    PlotDetailsComponent,
    MatStepperModule,
    MatButtonModule,
    CropDetailsComponent,
    StandardsComponent,
  ],
  templateUrl: './add-plot.component.html',
  styleUrl: './add-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlotComponent {
  @Output() nextStepEvent: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild(PlotDetailsComponent) plotDetailsComponent!: PlotDetailsComponent

  onNext(): void {
    this.nextStepEvent.emit(1)
  }
}
