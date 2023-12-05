import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { StandardsComponent } from '../components/standards/standards.component'
import { StandardDetails } from '../models/standards-details.type'
@Component({
  selector: 'app-add-standards',
  standalone: true,
  imports: [MatButtonModule, StandardsComponent],
  templateUrl: './add-standards.component.html',
  styleUrl: './add-standards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStandardsComponent {
  @Input() standardsFormValue?: StandardDetails

  @Output() nextStepEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Output() formValueEvent: EventEmitter<StandardDetails> =
    new EventEmitter<StandardDetails>()

  @ViewChild(StandardsComponent) standardsComponent!: StandardsComponent

  goBack(): void {
    this.nextStepEvent.emit(1)
    // if (this.standardsComponent.standardsForm.valid) {
    //   this.formValueEvent.emit(this.standardsComponent.standardsForm.value)
    // }
  }

  onSubmit(): void {
    this.formValueEvent.emit(this.standardsComponent.standardsForm.value)
  }
}
