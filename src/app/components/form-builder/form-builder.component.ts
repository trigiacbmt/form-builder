import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Dialog, DialogModule } from "@angular/cdk/dialog";
import { AppFormBuilderDialogComponent } from "./dialog/form-builder-dialog.component";
import { RouterLink } from "@angular/router";
import { getState } from "@ngrx/signals";
import { QuestionStore } from "../../shared/stores/question.store";
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormService } from "../../shared/services/form.service";

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-buider.component.html',
    styleUrls: ['./form-builder.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatInputModule, FormsModule, ReactiveFormsModule ,MatCheckboxModule ,NgFor, MatButtonModule, AppFormBuilderDialogComponent, DialogModule, RouterLink],
})

export class FormBuilderComponent {
    private _dialog  = inject(Dialog)
    form: FormGroup = inject(FormService).form
    store = inject(QuestionStore)

    get questions() {
        return this.form.get('questions') as FormArray
    }

    get options() {
        return this.form.get('questions') as FormArray
    }

    constructor() {
        effect(() => {
            const state = getState(this.store)
            console.log(state)
        })
    }


    openDialog() {
        // open dialog
        this._dialog.open(AppFormBuilderDialogComponent, {
            minWidth: '400px',
            minHeight: '200px',  
        })
    }

    onSubmit() {
        console.log(this.form)
    }
}