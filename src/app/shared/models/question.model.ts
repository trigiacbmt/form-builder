// export type Question<T extends string | null | string[]> = {
//     id: string;
//     type: 'Paragraph' | 'Multiple Choice';
//     description: string;
//     value: T;
// }

export type MultipleChoiceQuestion = {
    id: string;
    type: 'multiple-choice';
    description: string;
    required: boolean;
    specified: boolean;
    options: {
        id: string;
        label: string;
        value: string;
    }[];
}

export type ParagraphQuestion = {
    id: string;
    type: 'paragraph';
    description: string;
    required: boolean;
    specified: boolean;
    value: string;
}

export interface QuestionState {
    questions: (MultipleChoiceQuestion | ParagraphQuestion)[];
    loading: boolean;
} 
