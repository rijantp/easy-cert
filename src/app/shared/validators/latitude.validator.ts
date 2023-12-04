import { AbstractControl, ValidationErrors } from '@angular/forms'

export function latitudeValidator(
  control: AbstractControl
): null | ValidationErrors {
  const value = control.value

  return value >= -90 && value <= 90 ? null : { invalidLatitude: true }
}
