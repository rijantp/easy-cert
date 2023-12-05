import { Component, inject, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-crop-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './crop-details.component.html',
  styleUrl: './crop-details.component.scss',
})
export class CropDetailsComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder)

  cropDetailsForm: FormGroup = this.fb.nonNullable.group({
    cropDetails: this.fb.array([]),
  })

  ngOnInit(): void {
    this.cropDetials.push(this.addCropDetails())
    this.cropDetials.push(this.addCropDetails())
    this.cropDetials.push(this.addCropDetails())
  }

  addCropDetails(): FormGroup {
    return this.fb.group({
      seedsUsed: ['', Validators.required],
      estimatedHarvest: [''],
      harvestPeriod: [''],
    })
  }

  get cropDetials(): FormArray {
    return this.cropDetailsForm.controls['cropDetails'] as FormArray
  }
}
