export enum SurveyQuestionType {
  RANGE = 'range-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  SINGLE_CHOICE = 'single-choice',
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
}

export interface SurveyMultipleChoiceQuestionDto extends SurveyQuestionDto {
  type: SurveyQuestionType.MULTIPLE_CHOICE;
  options: SurveyQuestionChoiceDto[];
}

export interface SurveySingleChoiceQuestionDto extends SurveyQuestionDto {
  type: SurveyQuestionType.SINGLE_CHOICE;
  options: SurveyQuestionChoiceDto[];
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
    | SurveySingleChoiceQuestionDto
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

export interface SurveySingleChoiceQuestionAnswerDto {
  type: SurveyQuestionType.SINGLE_CHOICE;
  answerId: number;
}

export interface SurveyFreeTextAnswerDto {
  type: SurveyQuestionType.FREE_TEXT;
  text: string;
}

export type SurveyQuestionAnswerDto =
  | SurveyQuestionRangeAnswerDto
  | SurveyQuestionMultipleChoiceAnswerDto
  | SurveySingleChoiceQuestionAnswerDto
  | SurveyFreeTextAnswerDto;
