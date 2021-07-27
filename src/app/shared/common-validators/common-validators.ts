import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validEqualsPasswords: ValidatorFn = (
    control: FormGroup
): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("passwordConfirm");

    return password.value === confirmPassword.value ? null : { notEquals: true }
}