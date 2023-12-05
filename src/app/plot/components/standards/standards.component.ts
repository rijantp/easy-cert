import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { SELECT_OPTIONS } from '../../constants/selection-options'
import { StandardDetails } from '../../models/standards-details.type'
@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardsComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder)
  @Input() standardsFormValue?: StandardDetails

  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  selectOptions = SELECT_OPTIONS

  standardsForm: FormGroup = this.fb.nonNullable.group({
    euOrganic: ['', [Validators.required]],
    nop: ['', [Validators.required]],
    otherStandards: [''],
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['standardsFormValue'].currentValue) {
        this.preFillFormData(changes['standardsFormValue'].currentValue)
      }
    }
  }

  ngOnInit(): void {
    this.standardsForm.statusChanges.pipe().subscribe({
      next: (status: string) => {
        this.statusEvent.emit(status === 'VALID')
      },
    })
  }

  preFillFormData(formValue: StandardDetails): void {
    this.standardsForm.setValue(formValue)
  }
}
