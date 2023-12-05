import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core'
import { PlotDetailsComponent } from '../components/plot-details/plot-details.component'

import { MatButtonModule } from '@angular/material/button'
import { PlotDetails } from '../models/plot-details.type'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [PlotDetailsComponent, MatButtonModule],
  templateUrl: './add-plot.component.html',
  styleUrl: './add-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlotComponent {
  @Input() plotDetailsFormValue?: PlotDetails

  @Output() nextStepEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() formValueEvent: EventEmitter<PlotDetails> =
    new EventEmitter<PlotDetails>()

  @ViewChild(PlotDetailsComponent) plotDetailsComponent!: PlotDetailsComponent

  onNext(): void {
    this.nextStepEvent.emit(1)
    this.formValueEvent.emit(this.plotDetailsComponent.plotForm.value)
  }
}
