import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core'
import { CropDetailsComponent } from '../../crop-details/crop-details.component'

import { MatButtonModule } from '@angular/material/button'
import { CropDetails } from '../../../models/crop-details.type'

@Component({
  selector: 'app-add-crop',
  standalone: true,
  imports: [CropDetailsComponent, MatButtonModule],
  templateUrl: './add-crop.component.html',
  styleUrl: './add-crop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCropComponent {
  @Output() nextStepEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() formValueEvent: EventEmitter<CropDetails[]> = new EventEmitter<
    CropDetails[]
  >()

  @Input() cropDetailsFormValue?: CropDetails[]

  @ViewChild(CropDetailsComponent) cropDetailsComponent!: CropDetailsComponent

  navigateStep(index: number): void {
    this.nextStepEvent.emit(index)
    this.sendCropDetials()
  }

  sendCropDetials(): void {
    let cropDetailsList: CropDetails[] = this.cropDetailsComponent
      .cropDetailsForm.value.cropDetails as CropDetails[]
    cropDetailsList = cropDetailsList.filter(
      (value: CropDetails, index: number) => {
        return this.cropDetailsComponent.cropDetials.at(index).valid
      }
    )

    this.formValueEvent.emit(cropDetailsList)
  }
}
