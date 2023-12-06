import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { PlotDetailsComponent } from '../plot-details/plot-details.component'
import { CropDetailsComponent } from '../crop-details/crop-details.component'
import { StandardsComponent } from '../standards/standards.component'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-edit-plot',
  standalone: true,
  imports: [
    PlotDetailsComponent,
    CropDetailsComponent,
    StandardsComponent,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './edit-plot.component.html',
  styleUrl: './edit-plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlotComponent {
  selectedTabSig = signal('Plot details')
  isSavedSig = signal(false)
  tabs: string[] = ['Plot details', 'Crop details', 'Standards']

  onTabSelection(tab: string): void {
    this.selectedTabSig.set(tab)
  }

  onAutoSave(isValid: boolean): void {
    if (isValid) {
      this.isSavedSig.set(isValid)
      setTimeout(() => {
        this.isSavedSig.set(false)
      }, 3000)
    }
  }
}
