import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  ViewChild,
  NgZone,
  inject,
  ElementRef,
} from '@angular/core'
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatIconModule, FormsModule, MatButtonModule],
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

  zone: NgZone = inject(NgZone)

  @ViewChild('pick', { read: ElementRef }) datePicker!: ElementRef<any>

  dateValue?: Date

  onChange = (value: Date) => {}
  onTouched = (value: boolean) => {}

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

  openDatePicker(): void {
    this.zone.runOutsideAngular(() => {
      this.datePicker.nativeElement.click()
    })
  }
}
