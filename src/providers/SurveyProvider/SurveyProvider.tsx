import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

import { SurveyDialog } from './SurveyDialog/SurveyDialog';
import {
  SurveyDto,
  SurveyQuestionAnswerDto,
  SurveyQuestionType,
} from './SurveyProvider.types';

export interface SurveyContextType {
  activeSurvey?: SurveyDto;
  activeQuestionIndex?: number;
  answerQuestion: (answer: SurveyQuestionAnswerDto) => void;
  currentAnswer?: SurveyQuestionAnswerDto;
  setCurrentAnswer: Dispatch<
    SetStateAction<SurveyQuestionAnswerDto | undefined>
  >;
  cancelSurvey: () => void;
  hideSurvey: () => void;
}

export const SurveyContext = createContext<SurveyContextType | undefined>(
  undefined
);

interface SurveyProviderProps {
  children: ReactElement;
}

export const SurveyProvider: FC<SurveyProviderProps> = ({ children }) => {
  const [activeSurvey, setActiveSurvey] = useState<SurveyDto | undefined>({
    surveyId: 1,
    title: 'Customer Satisfaction Survey',
    questions: [
      {
        questionId: 0,
        type: SurveyQuestionType.RANGE,
        question: 'How likely are you to recommend us to a friend?',
      },
      {
        questionId: 1,
        type: SurveyQuestionType.SINGLE_CHOICE,
        question: 'What do you dislike most about our service?',
        options: [
          { id: 1, label: 'Speed' },
          { id: 2, label: 'Quality' },
          { id: 3, label: 'Customer Support' },
        ],
      },
      {
        questionId: 3,
        type: SurveyQuestionType.MULTIPLE_CHOICE,
        question: 'What do you like most about our service?',
        options: [
          { id: 1, label: 'Speed' },
          { id: 2, label: 'Quality' },
          { id: 3, label: 'Customer Support' },
        ],
      },
      {
        questionId: 2,
        type: SurveyQuestionType.FREE_TEXT,
        question: 'What can we do to improve?',
      },
    ],
  });
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<
    number | undefined
  >(0);
  const [currentAnswer, setCurrentAnswer] = useState<
    SurveyQuestionAnswerDto | undefined
  >(undefined);

  const handleAnswerQuestion = (answer: SurveyQuestionAnswerDto) => {
    // Implementation for answering a question goes here
    if (
      !activeSurvey ||
      activeQuestionIndex === undefined ||
      !activeSurvey.questions[activeQuestionIndex]
    ) {
      throw new Error('No active survey or question to answer');
    }

    // TODO: Save answer
    console.log(answer);

    if (activeQuestionIndex + 1 < activeSurvey.questions.length) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setActiveSurvey(undefined);
      setActiveQuestionIndex(undefined);
    }
  };

  const handleCancelSurvey = () => {
    setActiveSurvey(undefined);
    setActiveQuestionIndex(undefined);
  };

  const handleHideSurvey = () => {
    setActiveSurvey(undefined);
    setActiveQuestionIndex(undefined);
  };

  return (
    <SurveyContext.Provider
      value={{
        activeSurvey,
        activeQuestionIndex,
        answerQuestion: handleAnswerQuestion,
        cancelSurvey: handleCancelSurvey,
        hideSurvey: handleHideSurvey,
        currentAnswer,
        setCurrentAnswer,
      }}
    >
      {children}
      <SurveyDialog />
    </SurveyContext.Provider>
  );
};
