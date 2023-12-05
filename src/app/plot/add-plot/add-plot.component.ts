import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core'
import { PlotDetailsComponent } from '../components/plot-details/plot-details.component'

import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [PlotDetailsComponent, MatButtonModule],
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
