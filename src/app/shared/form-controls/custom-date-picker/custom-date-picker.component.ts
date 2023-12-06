import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core'
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatIconModule, FormsModule],
  templateUrl: './custom-date-picker.component.html',
  styleUrl: './custom-date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  @Input() disabled = false
  @Input() placeHolder: string = ''

  dateValue?: Date

  onChange = (value: Date) => {}
  onTouched = () => {}

  writeValue(value: Date): void {
    this.dateValue = value
    this.onChange(value)
  }
  registerOnChange(fn: (value: Date) => {}): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onDateChange(value: Date): void {
    this.onChange(value)
  }
}
