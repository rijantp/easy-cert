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
  OnDestroy,
} from '@angular/core'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { SELECT_OPTIONS } from '../../constants/selection-options'
import { StandardDetails } from '../../models/standards-details.type'
import { Subject, debounceTime, takeUntil } from 'rxjs'
import { CustomSelectComponent } from '../../../shared/form-controls/custom-select/custom-select.component'
@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CustomSelectComponent,
  ],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardsComponent implements OnInit, OnDestroy, OnChanges {
  fb: FormBuilder = inject(FormBuilder)
  @Input() standardsFormValue?: StandardDetails

  cancelSubscription$: Subject<void> = new Subject<void>()

  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  selectOptions = SELECT_OPTIONS

  standardsForm: FormGroup<StandardsForm> =
    this.fb.nonNullable.group<StandardsForm>({
      euOrganic: this.fb.nonNullable.control('', [Validators.required]),
      nop: this.fb.nonNullable.control('', [Validators.required]),
      otherStandards: this.fb.nonNullable.control(''),
    })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (
        changes['standardsFormValue'].currentValue &&
        changes['standardsFormValue'].firstChange
      ) {
        this.preFillFormData(changes['standardsFormValue'].currentValue)
      }
    }
  }

  ngOnInit(): void {
    this.standardsForm.statusChanges
      .pipe(takeUntil(this.cancelSubscription$), debounceTime(1000))
      .subscribe({
        next: (status: string) => {
          this.statusEvent.emit(status === 'VALID')
        },
      })
  }

  preFillFormData(formValue: StandardDetails): void {
    this.standardsForm.setValue(formValue)
  }
  get formGroup(): { [key in keyof StandardsForm]: AbstractControl } {
    return this.standardsForm.controls
  }
  ngOnDestroy(): void {
    this.cancelSubscription$.next()
    this.cancelSubscription$.complete()
  }
}

type StandardsForm = {
  euOrganic: FormControl<string>
  nop: FormControl<string>
  otherStandards: FormControl<string>
}
