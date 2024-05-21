import { AbstractControl, Form, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function revisedRandId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function atLeastOne(control: AbstractControl): ValidationErrors | null {
    const valid = (control as FormArray).controls.some(c => c.value.value);
    return valid ? null : {'atLeastOneError': true};
}

