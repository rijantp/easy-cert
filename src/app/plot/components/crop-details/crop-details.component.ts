import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CropDetails } from '../../models/crop-details.type'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-crop-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './crop-details.component.html',
  styleUrl: './crop-details.component.scss',
})
export class CropDetailsComponent implements OnInit, OnChanges, OnDestroy {
  fb: FormBuilder = inject(FormBuilder)

  @Input() cropDetailsFormValue?: CropDetails[]

  @Output() statusEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  cropDetailsForm: FormGroup = this.fb.nonNullable.group({
    cropDetails: this.fb.array([]),
  })

  cancelSubscription$: Subject<void> = new Subject<void>()

  constructor() {
    this.cropDetials.push(this.addCropDetails())
    this.cropDetials.push(this.addCropDetails())
    this.cropDetials.push(this.addCropDetails())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['cropDetailsFormValue'].currentValue) {
        this.preFillFormData(changes['cropDetailsFormValue'].currentValue)
      }
    }
  }

  ngOnInit(): void {
    this.cropDetials
      .at(0)
      .statusChanges.pipe(takeUntil(this.cancelSubscription$))
      .subscribe({
        next: (status: string) => {
          this.statusEvent.emit(status === 'VALID')
          console.log(status === 'VALID')
        },
      })
  }

  addCropDetails(): FormGroup {
    return this.fb.group({
      seedsUsed: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      estimatedHarvest: [''],
      harvestPeriod: [''],
    })
  }

  get cropDetials(): FormArray {
    return this.cropDetailsForm.controls['cropDetails'] as FormArray
  }

  preFillFormData(formValue: CropDetails[]): void {
    formValue.forEach((item: CropDetails, index: number) => {
      this.cropDetials.at(index).setValue(item)
    })
  }

  ngOnDestroy(): void {
    this.cancelSubscription$.next()
    this.cancelSubscription$.complete()
  }
}
