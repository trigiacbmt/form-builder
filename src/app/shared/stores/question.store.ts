import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { MultipleChoiceQuestion, ParagraphQuestion, QuestionState } from "../models/question.model";
import { inject } from "@angular/core";
import { FormService } from "../services/form.service";

const initialState: QuestionState = {
    questions: [],
    loading: false
}
export const QuestionStore = signalStore(
    { providedIn: 'root' },
    withState(initialState), 
    withMethods((store, formService = inject(FormService)) => ({
        addQuestion: (question: ParagraphQuestion | MultipleChoiceQuestion) => {
            formService.addFormGroup(question)
            patchState(store, (state) => ({questions: [...state.questions, question]}))
        }
    }))
)