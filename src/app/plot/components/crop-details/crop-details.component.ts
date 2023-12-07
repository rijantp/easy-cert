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
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CropDetails } from '../../models/crop-details.type'
import { Subject, debounceTime, filter, takeUntil } from 'rxjs'

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
  @Output() optionalStatusEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>()

  cropDetailsForm: FormGroup<CropDetailsForm> =
    this.fb.nonNullable.group<CropDetailsForm>({
      cropDetails: this.fb.nonNullable.array<FormGroup<CropDetailsArrayForm>>(
        []
      ),
    })

  cancelSubscription$: Subject<void> = new Subject<void>()

  constructor() {
    for (let index = 0; index < 3; index++) {
      this.cropDetials.push(this.addCropDetails())
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const { cropDetailsFormValue } = changes;
    // if(cropDetailsFormValue.currentValue && cropDetailsFormValue.firstChange){
    //   this.preFillFormData(cropDetailsFormValue.currentValue)
    // }
    if (changes) {
      if (
        changes['cropDetailsFormValue'].currentValue &&
        changes['cropDetailsFormValue'].firstChange
      ) {
        this.preFillFormData(changes['cropDetailsFormValue'].currentValue)
      }
    }
  }

  ngOnInit(): void {
    this.checkStepperStatus()
    this.checkOptionalStatus()
  }

  checkStepperStatus(): void {
    this.cropDetials
      .at(0)
      .statusChanges.pipe(
        takeUntil(this.cancelSubscription$),
        debounceTime(1000)
      )
      .subscribe({
        next: (status: string) => {
          this.statusEvent.emit(status === 'VALID')
        },
      })
  }

  checkOptionalStatus(): void {
    for (const iterator of [0, 1]) {
      this.cropDetials
        .at(iterator)
        .statusChanges.pipe(
          takeUntil(this.cancelSubscription$),
          filter(() => {
            return this.cropDetials.at(0).valid
          })
        )
        .subscribe({
          next: (status: string) => {
            this.optionalStatusEvent.emit(status === 'VALID')
          },
        })
    }
  }

  addCropDetails(): FormGroup {
    return this.fb.group({
      seedsUsed: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      estimatedHarvest: [''],
      harvestPeriod: [''],
    })
  }

  get cropDetials(): FormArray<FormGroup<CropDetailsArrayForm>> {
    return this.cropDetailsForm.controls['cropDetails']
  }

  getCropFormControl(index: number): { [key: string]: AbstractControl } {
    return this.cropDetials.at(index).controls
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

type CropDetailsForm = {
  cropDetails: FormArray<FormGroup<CropDetailsArrayForm>>
}

type CropDetailsArrayForm = {
  seedsUsed: FormControl<string>
  estimatedHarvest: FormControl<string>
  harvestPeriod: FormControl<string>
}
