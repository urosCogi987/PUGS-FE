import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function repeatPasswordValidator() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        debugger
        return control.value.userPassword === control.value.userRepeatPassword
            ? null
            : { passwordNoMatch: true };               
    }
}