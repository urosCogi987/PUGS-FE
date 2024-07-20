import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";

export const repeatPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
  
    return password === repeatPassword ? null : { passwordNoMatch: true };
  };