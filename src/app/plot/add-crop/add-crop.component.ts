import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core'
import { CropDetailsComponent } from '../components/crop-details/crop-details.component'

import { MatButtonModule } from '@angular/material/button'

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
  @ViewChild(CropDetailsComponent) cropDetailsComponent!: CropDetailsComponent

  navigateStep(index: number): void {
    this.nextStepEvent.emit(index)
  }
}
