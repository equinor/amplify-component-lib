import { FC } from 'react';

import { useSurvey } from '../../hooks/useSurvey';
import { SurveyFreeTextQuestion } from './SurveyFreeTextQuestion';
import { SurveyMultipleChoiceQuestion } from './SurveyMultipleChoiceQuestion';
import { SurveyRangeQuestion } from './SurveyRangeQuestion';
import { SurveySingleChoiceQuestion } from './SurveySingleChoiceQuestion';
import { SurveyQuestionType } from 'src/providers/SurveyProvider/SurveyProvider.types';

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
    case SurveyQuestionType.MULTIPLE_CHOICE:
      return <SurveyMultipleChoiceQuestion {...activeQuestion} />;
    case SurveyQuestionType.SINGLE_CHOICE:
      return <SurveySingleChoiceQuestion {...activeQuestion} />;
    case SurveyQuestionType.RANGE:
      return <SurveyRangeQuestion {...activeQuestion} />;
    case SurveyQuestionType.FREE_TEXT:
      return <SurveyFreeTextQuestion {...activeQuestion} />;
  }
};
