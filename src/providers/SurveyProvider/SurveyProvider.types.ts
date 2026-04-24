import { QuestionType, QuestionVm } from '@equinor/subsurface-app-management';

type QuestionBase = Pick<QuestionVm, 'questionId' | 'questionText'>;

export type FreeTextQuestion = QuestionBase & {
  type: QuestionType.TEXT;
};

export type ChoiceQuestion = QuestionBase & {
  type: QuestionType.CHOICE;
  multipleChoiceVm: NonNullable<QuestionVm['multipleChoiceVm']>;
};

export type LinearScaleQuestion = QuestionBase & {
  type: QuestionType.LINEAR_SCALE;
  linearScaleVm: NonNullable<QuestionVm['linearScaleVm']>;
};
