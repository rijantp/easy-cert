import { ChangeDetectionStrategy, Component, Host, Input } from '@angular/core'
import { CustomSelectComponent } from '../custom-select.component'

@Component({
  selector: 'app-custom-select-option',
  standalone: true,
  imports: [],
  templateUrl: './custom-select-option.component.html',
  styleUrl: './custom-select-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectOptionComponent {
  @Input() value: string = ''

  constructor(@Host() customSelectComponent: CustomSelectComponent) {}
}
