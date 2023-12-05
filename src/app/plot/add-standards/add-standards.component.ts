import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { StandardsComponent } from '../components/standards/standards.component'
@Component({
  selector: 'app-add-standards',
  standalone: true,
  imports: [MatButtonModule, StandardsComponent],
  templateUrl: './add-standards.component.html',
  styleUrl: './add-standards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStandardsComponent {
  @Output() nextStepEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @ViewChild(StandardsComponent) standardsComponent!: StandardsComponent

  goBack(): void {
    this.nextStepEvent.emit(1)
  }

  onSubmit(): void {
    console.log('submitted')
  }
}
