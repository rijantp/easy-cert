import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [MatSelectModule, FormsModule, MatIconModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: string[] = []
  @Input() placeHolder: string = ''
  @Input() disabled = false

  onChange = (value: string) => {}
  onTouched = (value: boolean) => {}

  inputValue: string = ''
  optionValue: string = ''

  onOptionChange(value: string): void {
    this.inputValue = value
    this.onChange(value)
  }

  writeValue(value: string): void {
    this.inputValue = this.optionValue = value
    this.onChange(value)
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInputClick(): void {}
}
