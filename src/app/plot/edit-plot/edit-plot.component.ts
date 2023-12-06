import { Component, signal } from '@angular/core'
import { EditPlotDetailsComponent } from './edit-plot-details/edit-plot-details.component'
import { EditCropDetailsComponent } from './edit-crop-details/edit-crop-details.component'
import { EditStandardsComponent } from './edit-standards/edit-standards.component'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-edit-plot',
  standalone: true,
  imports: [
    EditPlotDetailsComponent,
    EditCropDetailsComponent,
    EditStandardsComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './edit-plot.component.html',
  styleUrl: './edit-plot.component.scss',
})
export class EditPlotComponent {
  selectedTabSig = signal('Plot details')
  tabs: string[] = ['Plot details', 'Crop details', 'Standards']

  onTabSelection(tab: string): void {
    this.selectedTabSig.set(tab)
  }
}
