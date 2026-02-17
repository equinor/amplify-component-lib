import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnswerQuestionCommandDto,
  useActiveSurvey,
  useAnswerQuestionActiveSurvey,
  useRespondActiveSurvey,
  UserSurveyVm,
} from '@equinor/subsurface-app-management';

import { SurveyDialog } from './SurveyDialog/SurveyDialog';

export interface SurveyContextType {
  activeSurvey?: UserSurveyVm;
  activeQuestionIndex?: number;
  answerQuestion: (answer: Omit<AnswerQuestionCommandDto, 'id'>) => void;
  currentAnswer?: AnswerQuestionCommandDto;
  setCurrentAnswer: Dispatch<
    SetStateAction<AnswerQuestionCommandDto | undefined>
  >;
  cancelSurvey: () => void;
  hideSurvey: () => void;
  isCancelled: boolean;
}

export const SurveyContext = createContext<SurveyContextType | undefined>(
  undefined
);

interface SurveyProviderProps {
  children: ReactElement;
}

export const SurveyProvider: FC<SurveyProviderProps> = ({ children }) => {
  const { data: activeSurvey } = useActiveSurvey();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<
    number | undefined
  >(0);
  const [currentAnswer, setCurrentAnswer] = useState<
    AnswerQuestionCommandDto | undefined
  >(undefined);
  const [isCancelled, setIsCancelled] = useState(false);
  const initializedQuestionIndex = useRef<string | undefined>(undefined);
  const { mutateAsync: respondActiveSurvey } = useRespondActiveSurvey();
  const { mutateAsync: answerQuestion } = useAnswerQuestionActiveSurvey();

  useEffect(() => {
    if (
      activeSurvey &&
      initializedQuestionIndex.current !== activeSurvey.surveyId.value
    ) {
      initializedQuestionIndex.current = activeSurvey.surveyId.value;
      setActiveQuestionIndex(
        activeSurvey.questions.findIndex(
          (question) => question.answer === undefined
        )
      );
    }
  }, [activeSurvey]);

  const handleAnswerQuestion = async (
    answer: Omit<AnswerQuestionCommandDto, 'id'>
  ) => {
    // Implementation for answering a question goes here
    if (
      !activeSurvey ||
      activeQuestionIndex === undefined ||
      !activeSurvey.questions[activeQuestionIndex]
    ) {
      throw new Error('No active survey or question to answer');
    }

    if (activeSurvey.surveyResponseId === undefined) {
      await respondActiveSurvey({
        surveyId: activeSurvey.surveyId,
        optOut: false,
      });
    }

    await answerQuestion({
      id: activeSurvey.questions[activeQuestionIndex].questionId,
      ...answer,
    });

    setCurrentAnswer(undefined);

    if (activeQuestionIndex + 1 < activeSurvey.questions.length) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setActiveQuestionIndex(undefined);
    }
  };

  const handleCancelSurvey = () => {
    setActiveQuestionIndex(undefined);
    setIsCancelled(true);
  };

  const handleHideSurvey = () => {
    if (!activeSurvey) return;
    setActiveQuestionIndex(undefined);
    respondActiveSurvey({
      surveyId: activeSurvey.surveyId,
      optOut: true,
    });
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
        isCancelled,
      }}
    >
      {children}
      <SurveyDialog />
    </SurveyContext.Provider>
  );
};
