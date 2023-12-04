import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlotDetailsComponent } from '../components/plot-details/plot-details.component'

@Component({
  selector: 'app-add-plot',
  standalone: true,
  imports: [PlotDetailsComponent],
  templateUrl: './add-plot.component.html',
  styleUrl: './add-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlotComponent {}
