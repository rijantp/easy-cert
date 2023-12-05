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
import { Subject, combineLatest, startWith, takeUntil } from 'rxjs'
import { PlotDetails } from '../../models/plot-details.type'

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

  plotForm: FormGroup = this.fb.nonNullable.group({
    plotName: ['', [Validators.required]],
    ownership: ['', [Validators.required]],
    description: [''],
    latitude: [null, [Validators.required, latitudeValidator]],
    longitude: [null, [Validators.required, longitudeValidator]],
    unAllowedApplicationsDate: [''],
    totalSurfaceArea: ['', [Validators.pattern(/^\d+$/)]],
    usedSurface: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    conventionalArea: ['', [Validators.pattern(/^\d+$/)]],
    irrigation: ['', [Validators.required]],
    conversionStart: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.addOwnershipControls()
    this.getTotalSurfaceArea()
    this.sendFormValidity()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addOwnershipControls()
    if (changes) {
      if (changes['plotDetailsFormValue'].currentValue) {
        this.preFillFormData(changes['plotDetailsFormValue'].currentValue)
      }
    }
  }

  addOwnershipControls(): void {
    this.plotForm.controls['ownership'].valueChanges
      .pipe(takeUntil(this.cancelSubscription$))
      .subscribe({
        next: (value: string) => {
          if (value === OwnershipOptions.RENTAL) {
            this.plotForm.addControl('contractStart', new FormControl(''))
            this.plotForm.addControl('contractEnd', new FormControl(''))
          } else {
            this.plotForm.removeControl('contractStart')
            this.plotForm.removeControl('contractEnd')
          }
        },
      })
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
            Number(a) + Number(b)
          )
        },
      })
  }

  sendFormValidity(): void {
    this.plotForm.statusChanges
      .pipe(takeUntil(this.cancelSubscription$))
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
