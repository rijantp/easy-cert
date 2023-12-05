import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { AddCropComponent } from './add-crop/add-crop.component'
import { AddStandardsComponent } from './add-standards/add-standards.component'
import { PlotStepperComponent } from './components/plot-stepper/plot-stepper.component'
import { AddPlotComponent } from './add-plot/add-plot.component'
import { Observable, map, of } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-plot',
  standalone: true,
  imports: [
    MatButtonModule,
    PlotStepperComponent,
    AddPlotComponent,
    AddCropComponent,
    AddStandardsComponent,
    AsyncPipe,
  ],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent implements AfterViewInit {
  stepperIndex: number = 0

  @ViewChild(AddPlotComponent) plotComponent!: AddPlotComponent
  @ViewChild(AddCropComponent) CropComponent!: AddCropComponent
  @ViewChild(AddStandardsComponent) standardsComponent!: AddStandardsComponent

  isPlotValid$: Observable<boolean> = of(false)
  isCropsValid$: Observable<boolean> = of(false)
  isStandardsValid$: Observable<boolean> = of(false)

  ngAfterViewInit(): void {
    this.isPlotValid$ =
      this.plotComponent.plotDetailsComponent.plotForm.statusChanges.pipe(
        map((status: string) => status === 'VALID')
      )

    this.isCropsValid$ =
      this.CropComponent.cropDetailsComponent.cropDetailsForm.statusChanges.pipe(
        map((status: string) => status === 'VALID')
      )

    this.isPlotValid$ =
      this.standardsComponent.standardsComponent.standardsForm.statusChanges.pipe(
        map((status: string) => status === 'VALID')
      )
  }

  onNextStepper(index: number): void {
    console.log(index)

    this.stepperIndex = index
  }
}
