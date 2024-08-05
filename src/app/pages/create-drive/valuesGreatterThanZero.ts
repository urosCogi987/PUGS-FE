import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";

export const valuesGreaterThanZeroValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const distance = formGroup.get('distance')?.value;
    const estimatedDuration = formGroup.get('estimatedDuration')?.value;
  
    return distance > 0 && estimatedDuration > 0 ? null : { valuesNotGreaterThanZero: true };
  };