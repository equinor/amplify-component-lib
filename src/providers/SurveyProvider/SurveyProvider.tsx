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
import { useConfetti } from 'src/providers/ConfettiProvider/ConfettiProvider';
import { useToasts } from 'src/providers/ToastProvider/ToastProvider';

export interface SurveyContextType {
  activeSurvey?: UserSurveyVm;
  activeQuestionIndex?: number;
  setActiveQuestionIndex: Dispatch<SetStateAction<number | undefined>>;
  answerQuestion: (
    answer: Omit<AnswerQuestionCommandDto, 'id'>
  ) => Promise<void>;
  currentAnswer?: AnswerQuestionCommandDto;
  setCurrentAnswer: Dispatch<
    SetStateAction<AnswerQuestionCommandDto | undefined>
  >;
  cancelSurvey: () => void;
  hideSurvey: () => void;
  isCancelled: boolean;
  completeSurvey: () => void;
}

export const SurveyContext = createContext<SurveyContextType | undefined>(
  undefined
);

interface SurveyProviderProps {
  children: ReactElement;
}

/**
 * @description - Survey provider, assumes you also have ToastProvider and ConfettiProvider in your app.
 */
export const SurveyProvider: FC<SurveyProviderProps> = ({ children }) => {
  const { showToast } = useToasts();
  const { shower } = useConfetti();
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

  const handleCompleteSurvey = () => {
    if (!activeSurvey) return;

    showToast({
      variant: 'success',
      title: 'Survey completed',
      description: 'Thanks for helping us improve!',
      duration: 5,
    });

    if (activeSurvey.showConfettiOnComplete) {
      shower({
        mode: 'shower',
        shapes: ['square'],
        duration: 5000,
      });
    }
  };

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

    let surveyResponseId = activeSurvey.surveyResponseId?.value;
    if (surveyResponseId === undefined) {
      const data = await respondActiveSurvey({
        surveyId: activeSurvey.surveyId,
        optOut: false,
      });
      surveyResponseId = data.value;
    }

    await answerQuestion({
      /* v8 ignore next */
      surveyResponseId: surveyResponseId ?? '',
      body: {
        id: activeSurvey.questions[activeQuestionIndex].questionId,
        ...answer,
      },
    });

    setCurrentAnswer(undefined);

    if (activeQuestionIndex + 1 < activeSurvey.questions.length) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setActiveQuestionIndex(undefined);
      handleCompleteSurvey();
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
        setActiveQuestionIndex,
        answerQuestion: handleAnswerQuestion,
        cancelSurvey: handleCancelSurvey,
        hideSurvey: handleHideSurvey,
        currentAnswer,
        setCurrentAnswer,
        isCancelled,
        completeSurvey: handleCompleteSurvey,
      }}
    >
      {children}
      <SurveyDialog />
    </SurveyContext.Provider>
  );
};
