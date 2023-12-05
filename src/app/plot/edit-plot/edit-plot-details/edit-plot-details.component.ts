import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlotDetailsComponent } from '../../components/plot-details/plot-details.component'

@Component({
  selector: 'app-edit-plot-details',
  standalone: true,
  imports: [PlotDetailsComponent],
  templateUrl: './edit-plot-details.component.html',
  styleUrl: './edit-plot-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlotDetailsComponent {}
