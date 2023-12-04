import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-plot',
  standalone: true,
  imports: [],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent {}
