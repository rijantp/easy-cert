import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
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
import { combineLatest, startWith, takeUntil } from 'rxjs'

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
export class PlotDetailsComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder)

  ownershipOptions = [OwnershipOptions.OWN, OwnershipOptions.RENTAL]
  selectOptions = SELECT_OPTIONS

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
    this.plotForm.controls['ownership'].valueChanges.subscribe(
      (value: string) => {
        if (value === OwnershipOptions.RENTAL) {
          this.plotForm.addControl('contractStart', new FormControl(''))
          this.plotForm.addControl('contractEnd', new FormControl(''))
        } else {
          this.plotForm.removeControl('contractStart')
          this.plotForm.removeControl('contractEnd')
        }
      }
    )

    combineLatest([
      this.plotForm.controls['usedSurface'].valueChanges,
      this.plotForm.controls['conventionalArea'].valueChanges.pipe(
        startWith(0)
      ),
    ]).subscribe({
      next: ([a, b]) => {
        console.log(Number(a) + Number(b))

        this.plotForm.controls['totalSurfaceArea'].setValue(
          Number(a) + Number(b)
        )
      },
    })
  }
}
