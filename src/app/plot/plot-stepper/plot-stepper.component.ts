import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { MatStepper, MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'app-plot-stepper',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule],
  templateUrl: './plot-stepper.component.html',
  styleUrl: './plot-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotStepperComponent implements AfterViewInit, OnChanges {
  @ViewChild('stepper') stepper!: MatStepper
  @Output() currentStepperEvent: EventEmitter<number> =
    new EventEmitter<number>()

  // @Input() set stepperIndex(index: number) {
  //   this.stepper.selectedIndex = index
  // }
  @Input() stepperIndex: number = 0

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (!changes['stepperIndex'].firstChange) {
        this.stepper.selectedIndex = changes['stepperIndex'].currentValue
      }
    }
  }

  ngAfterViewInit(): void {
    console.log(this.stepper.steps.length, this.stepper.selectedIndex)
  }
}
