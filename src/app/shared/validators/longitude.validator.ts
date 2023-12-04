import { AbstractControl, ValidationErrors } from '@angular/forms'

export function longitudeValidator(
  control: AbstractControl
): null | ValidationErrors {
  const value = control.value

  return value >= -180 && value <= 180 ? null : { invalidLatitude: true }
}
