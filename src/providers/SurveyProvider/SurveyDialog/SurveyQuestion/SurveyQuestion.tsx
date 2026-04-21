import { FC } from 'react';

import { QuestionType } from '@equinor/subsurface-app-management';

import { useSurvey } from '../../hooks/useSurvey';
import { SurveyFreeTextQuestion } from './SurveyFreeTextQuestion';
import { SurveyMultipleChoiceQuestion } from './SurveyMultipleChoiceQuestion';
import { SurveyLinearScaleQuestion } from 'src/providers/SurveyProvider/SurveyDialog/SurveyQuestion/SurveyLinearScaleQuestion';
import {
  ChoiceQuestion,
  FreeTextQuestion,
  LinearScaleQuestion,
} from 'src/providers/SurveyProvider/SurveyProvider.types';

export const SurveyQuestion: FC = () => {
  const { activeSurvey, activeQuestionIndex } = useSurvey();

  if (
    !activeSurvey ||
    activeQuestionIndex === undefined ||
    activeSurvey.questions[activeQuestionIndex] === undefined
  ) {
    throw new Error("SurveyQuestion couldn't find active survey or question");
  }

  const activeQuestion = activeSurvey.questions[activeQuestionIndex];

  switch (activeQuestion.type) {
    case QuestionType.CHOICE:
      return (
        <SurveyMultipleChoiceQuestion {...(activeQuestion as ChoiceQuestion)} />
      );
    case QuestionType.LINEAR_SCALE:
      return (
        <SurveyLinearScaleQuestion
          {...(activeQuestion as LinearScaleQuestion)}
        />
      );
    case QuestionType.TEXT:
      return (
        <SurveyFreeTextQuestion {...(activeQuestion as FreeTextQuestion)} />
      );
  }
};
