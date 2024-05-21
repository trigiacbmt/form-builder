import { Injectable, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MultipleChoiceQuestion, ParagraphQuestion } from "../models/question.model";
import { atLeastOne } from "../utils/utils";


@Injectable({
    providedIn: 'root'
})

export class FormService {
    private _fb: FormBuilder = inject(FormBuilder);

    form: FormGroup = this._fb.group({
        questions: this._fb.array([])
    })

    addFormGroup(data: ParagraphQuestion | MultipleChoiceQuestion) {
        let group;
        if(data.type === 'paragraph') {
            group = this._fb.group({
                id: this._fb.control(data.id),
                description: this._fb.control(data.description),
                type: this._fb.control(data.type),
                value: this._fb.control(data.value),
                required: this._fb.control(data.required),
                specified: this._fb.control(data.specified)
            }, {validators: data.required ? Validators.required : null})
        }else {
            group = this._fb.group({
                id: this._fb.control(data.id),
                description: this._fb.control(data.description),
                type: this._fb.control(data.type),
                required: this._fb.control(data.required),
                specified: this._fb.control(data.specified),
                options: this._fb.array(data.options.map(option => {
                    return this._fb.group({
                        id: this._fb.control(option.id),
                        label: this._fb.control(option.label),
                        value: this._fb.control(option.value)
                    })
                }), data.required ? [atLeastOne] : []),
            })
        }
        (this.form.get('questions') as FormArray).push(group)
    }
}