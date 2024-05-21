import { AbstractControl, FormArray, ValidationErrors } from "@angular/forms";
import { ErrorEnum } from "../models/error.model";

export function revisedRandId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function atLeastOne(control: AbstractControl): ValidationErrors | null {
    const valid = (control as FormArray).controls.some(c => c.value.value);
    return valid ? null : ({ [ErrorEnum.AT_LEAST_ONE_CHECKED]: true });
}

