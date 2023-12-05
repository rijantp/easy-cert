import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CropDetailsComponent } from '../../components/crop-details/crop-details.component'

@Component({
  selector: 'app-edit-crop-details',
  standalone: true,
  imports: [CropDetailsComponent],
  templateUrl: './edit-crop-details.component.html',
  styleUrl: './edit-crop-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCropDetailsComponent {}
