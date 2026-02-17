import { QuestionType, QuestionVm } from '@equinor/subsurface-app-management';

type QuestionBase = Pick<QuestionVm, 'questionId' | 'text'>;

export type FreeTextQuestion = QuestionBase & {
  type: QuestionType.TEXT;
};

export type ChoiceQuestion = QuestionBase & {
  type: QuestionType.CHOICE;
  options: NonNullable<QuestionVm['options']>;
  maxSelections: NonNullable<QuestionVm['maxSelections']>;
};

export type LinearScaleQuestion = QuestionBase & {
  type: QuestionType.LINEAR_SCALE;
  linearScaleConfig: NonNullable<QuestionVm['linearScaleConfig']>;
};
