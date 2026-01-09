export enum SurveyQuestionType {
  RANGE = 'range-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  FREE_TEXT = 'free-text',
}

interface SurveyQuestionChoiceDto {
  label: string;
  id: number;
}

export interface SurveyQuestionDto {
  questionId: number;
  question: string;
}

export interface SurveyRangeQuestionDto extends SurveyQuestionDto {
  type: SurveyQuestionType.RANGE;
  minLabel?: string;
  maxLabel?: string;
}

export interface SurveyMultipleChoiceQuestionDto extends SurveyQuestionDto {
  type: SurveyQuestionType.MULTIPLE_CHOICE;
  options: SurveyQuestionChoiceDto[];
  maxChoice: number;
}

export interface SurveyFreeTextQuestionDto extends SurveyQuestionDto {
  type: SurveyQuestionType.FREE_TEXT;
}

export interface SurveyDto {
  surveyId: number;
  title: string;
  questions: (
    | SurveyRangeQuestionDto
    | SurveyMultipleChoiceQuestionDto
    | SurveyFreeTextQuestionDto
  )[];
}

export interface SurveyQuestionRangeAnswerDto {
  type: SurveyQuestionType.RANGE;
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface SurveyQuestionMultipleChoiceAnswerDto {
  type: SurveyQuestionType.MULTIPLE_CHOICE;
  answerIds: number[];
}

export interface SurveyFreeTextAnswerDto {
  type: SurveyQuestionType.FREE_TEXT;
  text: string;
}

export type SurveyQuestionAnswerDto =
  | SurveyQuestionRangeAnswerDto
  | SurveyQuestionMultipleChoiceAnswerDto
  | SurveyFreeTextAnswerDto;
