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

  plotForm: FormGroup = this.fb.nonNullable.group({
    plotName: ['', [Validators.required]],
    ownership: ['', [Validators.required]],
    description: [''],
    latitude: [null, [Validators.required, latitudeValidator]],
    longitude: [null, [Validators.required, longitudeValidator]],
    unAllowedApplicationsDate: [''],
    totalSurfaceArea: [''],
    usedSurface: [],
    conventionalArea: [],
    irrigation: [''],
    conversionStart: [''],
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
  }
}
