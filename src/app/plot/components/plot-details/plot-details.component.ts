import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { OwnershipOptions } from '../../constants/ownership-options'
import { latitudeValidator } from '../../../shared/validators/latitude.validator'
import { longitudeValidator } from '../../../shared/validators/longitude.validator'
import { SELECT_OPTIONS } from '../../constants/selection-options'
import {
  Subject,
  combineLatest,
  debounceTime,
  startWith,
  takeUntil,
} from 'rxjs'
import { PlotDetails } from '../../models/plot-details.type'
import { CustomSelectComponent } from '../../../shared/form-controls/custom-select/custom-select.component'
import { CustomDatePickerComponent } from '../../../shared/form-controls/custom-date-picker/custom-date-picker.component'

@Component({
  selector: 'app-plot-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    CustomDatePickerComponent,
  ],
  templateUrl: './plot-details.component.html',
  styleUrl: './plot-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotDetailsComponent implements OnInit, OnChanges, OnDestroy {
  fb: FormBuilder = inject(FormBuilder)

  @Input() plotDetailsFormValue?: PlotDetails

  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  ownershipOptions = [OwnershipOptions.OWN, OwnershipOptions.RENTAL]
  selectOptions = SELECT_OPTIONS

  cancelSubscription$: Subject<void> = new Subject<void>()

  plotForm: FormGroup<PlotForm> = this.fb.nonNullable.group<PlotForm>({
    plotName: this.fb.nonNullable.control('', [Validators.required]),

    ownership: this.fb.nonNullable.control('', [Validators.required]),

    description: this.fb.nonNullable.control<string>(''),

    latitude: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      latitudeValidator,
    ]),
    longitude: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      longitudeValidator,
    ]),
    unAllowedApplicationsDate: this.fb.nonNullable.control('', [
      Validators.required,
    ]),

    totalSurfaceArea: this.fb.nonNullable.control('', [
      Validators.pattern(/^\d+$/),
    ]),
    usedSurface: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),

    conventionalArea: this.fb.nonNullable.control('', [
      Validators.pattern(/^\d+$/),
    ]),

    irrigation: this.fb.nonNullable.control('', [Validators.required]),

    conversionStart: this.fb.nonNullable.control('', [Validators.required]),
  })

  ngOnInit(): void {
    this.addOwnershipControls()
    this.getTotalSurfaceArea()
    this.sendFormValidity()
  }
  get formGroup(): { [key: string]: AbstractControl } {
    return this.plotForm.controls
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (
        changes['plotDetailsFormValue'].currentValue &&
        changes['plotDetailsFormValue'].firstChange
      ) {
        this.toggleRentalControls(
          changes['plotDetailsFormValue'].currentValue.ownership
        )
        this.preFillFormData(changes['plotDetailsFormValue'].currentValue)
      }
    }
  }

  addOwnershipControls(): void {
    this.plotForm.controls['ownership'].valueChanges
      .pipe(takeUntil(this.cancelSubscription$))
      .subscribe({
        next: (value: string) => {
          this.toggleRentalControls(value)
        },
      })
  }

  toggleRentalControls(value: string): void {
    if (value === OwnershipOptions.RENTAL) {
      this.plotForm.addControl('contractStart', this.fb.nonNullable.control(''))
      this.plotForm.addControl('contractEnd', this.fb.nonNullable.control(''))
    } else {
      this.plotForm.removeControl('contractStart')
      this.plotForm.removeControl('contractEnd')
    }
  }

  getTotalSurfaceArea(): void {
    combineLatest([
      this.plotForm.controls['usedSurface'].valueChanges,
      this.plotForm.controls['conventionalArea'].valueChanges.pipe(
        startWith(0)
      ),
    ])
      .pipe(takeUntil(this.cancelSubscription$))
      .subscribe({
        next: ([a, b]) => {
          this.plotForm.controls['totalSurfaceArea'].setValue(
            `${Number(a) + Number(b)}`
          )
        },
      })
  }

  sendFormValidity(): void {
    this.plotForm.statusChanges
      .pipe(takeUntil(this.cancelSubscription$), debounceTime(1000))
      .subscribe({
        next: (status: string) => {
          this.statusEvent.emit(status === 'VALID')
        },
      })
  }

  preFillFormData(formValue: PlotDetails): void {
    this.plotForm.setValue(formValue)
  }

  ngOnDestroy(): void {
    this.cancelSubscription$.next()
    this.cancelSubscription$.complete()
  }
}

type PlotForm = {
  plotName: FormControl<string>
  ownership: FormControl<string>
  description: FormControl<string>
  latitude: FormControl<string>
  contractStart?: FormControl<Date | string>
  contractEnd?: FormControl<Date | string>
  longitude: FormControl<string>
  unAllowedApplicationsDate: FormControl<Date | string>
  totalSurfaceArea: FormControl<string>
  usedSurface: FormControl<string>
  conventionalArea: FormControl<string>
  irrigation: FormControl<string>
  conversionStart: FormControl<string | Date>
}
