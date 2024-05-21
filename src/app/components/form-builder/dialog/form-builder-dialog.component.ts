import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { QuestionStore } from 'src/app/shared/stores/question.store';
import { revisedRandId } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-form-builder-dialog',
  templateUrl: './form-builder-dialog.component.html',
  styleUrls: ['./form-builder-dialog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppFormBuilderDialogComponent {
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(DialogRef);
  store = inject(QuestionStore);

  get controlType() {
    return this.form.get('type')?.value;
  }

  get options() {
    return this.form.get('options') as FormArray;
  }

  get formControl() {
    return this.form;
  }

  form: FormGroup = this._fb.group({
    id: this._fb.control(revisedRandId(), [
      Validators.required,
    ]),
    description: this._fb.control('', [Validators.required]),
    type: this._fb.control('paragraph', [Validators.required]),
    value: this._fb.control(''),
    required: this._fb.control(false, []),
    specified: this._fb.control(false, []),
  });

  typeChangeHandler(event: MatSelectChange) {
    if (event.value === 'multiple-choice') {
      this.form.removeControl('value');
      this.form.addControl(
        'options',
        this._fb.array([
          this._fb.group({
            id: this._fb.control(revisedRandId(), [Validators.required]),
            label: this._fb.control('',[Validators.required]),
            value: this._fb.control(null),
          }),
          this._fb.group({
            id: this._fb.control(revisedRandId(), [Validators.required]),
            label: this._fb.control('', [Validators.required]),
            value: this._fb.control(null),
          }),
        ])
      );
    } else {
      this.form.removeControl('options');
      this.form.addControl('value', this._fb.control(''));
    }
  }

  onAddAnswer() {
    this.options.push(
      this._fb.group({
        id: this._fb.control(revisedRandId(), [
          Validators.required,
        ]),
        value: this._fb.control('', [Validators.required]),
      })
    );
  }

  onSubmit() {
    console.log(this.form.value);
    this.store.addQuestion(this.form.value);
    this._dialogRef.close();
  }
}
