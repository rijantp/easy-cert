import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StandardsComponent } from '../../components/standards/standards.component'

@Component({
  selector: 'app-edit-standards',
  standalone: true,
  imports: [StandardsComponent],
  templateUrl: './edit-standards.component.html',
  styleUrl: './edit-standards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStandardsComponent {}
