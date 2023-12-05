import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-custom-stepper',
  standalone: true,
  imports: [NgTemplateOutlet, CdkStepperModule],
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }],
  templateUrl: './custom-stepper.component.html',
  styleUrl: './custom-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStepperComponent extends CdkStepper {
  selectStepByIndex(index: number): void {
    this.selectedIndex = index
  }
}
