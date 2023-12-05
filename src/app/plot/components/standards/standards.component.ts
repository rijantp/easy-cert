import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
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
export class StandardsComponent {
  fb: FormBuilder = inject(FormBuilder)

  selectOptions = SELECT_OPTIONS

  standardsForm: FormGroup = this.fb.nonNullable.group({
    euOrganic: ['', [Validators.required]],
    nop: ['', [Validators.required]],
    otherStandards: [''],
  })
}
