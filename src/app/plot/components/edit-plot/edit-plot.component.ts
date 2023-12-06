import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { PlotDetailsComponent } from '../plot-details/plot-details.component'
import { CropDetailsComponent } from '../crop-details/crop-details.component'
import { StandardsComponent } from '../standards/standards.component'
import { MatButtonModule } from '@angular/material/button'
import { PlotDetails } from '../../models/plot-details.type'
import { PlotEnum } from '../../constants/plot.enum'
import { CropDetails } from '../../models/crop-details.type'
import { StandardDetails } from '../../models/standards-details.type'

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

  plotDetailsSig = signal<PlotDetails | undefined>(undefined)
  cropDetailsSig = signal<CropDetails[] | undefined>(undefined)
  standardsSig = signal<StandardDetails | undefined>(undefined)

  tabs: string[] = ['Plot details', 'Crop details', 'Standards']

  @ViewChild(PlotDetailsComponent) plotDetailsComponent!: PlotDetailsComponent

  @ViewChild(CropDetailsComponent) cropDetailsComponent!: CropDetailsComponent
  @ViewChild(StandardsComponent) standardsComponent!: StandardsComponent

  onTabSelection(tab: string): void {
    this.selectedTabSig.set(tab)
  }

  onAutoSave(isValid: boolean, index: PlotEnum): void {
    if (isValid) {
      this.isSavedSig.set(isValid)

      switch (index) {
        case PlotEnum.PLOT_DETAILS:
          this.savePlotDetails()
          break
        case PlotEnum.CROP_DETAILS:
          this.saveCropDetails()
          break
        case PlotEnum.STANDARDS:
          this.saveStandardsDetails()
          break
      }

      setTimeout(() => {
        this.isSavedSig.set(false)
      }, 3000)
    }
  }

  savePlotDetails(): void {
    this.plotDetailsSig.set(this.plotDetailsComponent.plotForm.value)
    console.log(this.plotDetailsComponent.plotForm.value)
  }

  saveCropDetails(): void {
    let cropDetailsList: CropDetails[] =
      this.cropDetailsComponent.cropDetailsForm.value.cropDetails
    cropDetailsList = cropDetailsList.filter(
      (value: CropDetails, index: number) => {
        return this.cropDetailsComponent.cropDetials.at(index).valid
      }
    )
    this.cropDetailsSig.set(cropDetailsList)
    console.log(cropDetailsList)
  }

  saveStandardsDetails(): void {
    this.standardsSig.set(this.standardsComponent.standardsForm.value)
    console.log(this.standardsComponent.standardsForm.value)
  }
}
