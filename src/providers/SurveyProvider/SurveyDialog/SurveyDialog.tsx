import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { QuestionType, SurveyType } from '@equinor/subsurface-app-management';

import { useSurvey } from '../hooks/useSurvey';
import { SurveyQuestion } from './SurveyQuestion/SurveyQuestion';
import { Content } from './SurveyDialog.styles';
import { SurveyProgress } from './SurveyProgress';
import { UmuxDialog } from './UmuxDialog';
import { Dialog, type DialogProps } from 'src/molecules/Dialog/Dialog';

export const SurveyDialog: FC = () => {
  const {
    activeSurvey,
    activeQuestionIndex,
    setActiveQuestionIndex,
    cancelSurvey,
    hideSurvey,
    answerQuestion,
    currentAnswer,
    setCurrentAnswer,
    isCancelled,
  } = useSurvey();
  const [isAnswering, setIsAnswering] = useState(false);

  if (!activeSurvey || activeQuestionIndex === undefined || isCancelled)
    return null;

  const handleAnswer = async () => {
    /* v8 ignore next */
    if (!currentAnswer) return;

    setIsAnswering(true);
    await answerQuestion({
      ...currentAnswer,
      selectedOptionIds: currentAnswer?.selectedOptionIds ?? [],
    });
    setIsAnswering(false);
  };

  const disabledNextAction = () => {
    if (!currentAnswer) return true;
    /* v8 ignore next */
    const currentQuestion = activeSurvey?.questions[activeQuestionIndex ?? 0];

    switch (currentQuestion.type) {
      case QuestionType.CHOICE:
        return (
          !currentAnswer.selectedOptionIds ||
          currentAnswer.selectedOptionIds.length === 0 ||
          currentAnswer.selectedOptionIds.length >
            /* v8 ignore next */
            (currentQuestion.maxSelections ?? 0)
        );
      case QuestionType.LINEAR_SCALE:
        return currentAnswer.numericAnswer === undefined;
      case QuestionType.TEXT:
        return (
          !currentAnswer.textAnswer || currentAnswer.textAnswer.trim() === ''
        );
    }
  };

  const handleOnBack = () => {
    if (activeQuestionIndex === 0) {
      cancelSurvey();
    } else if (activeQuestionIndex) {
      const previousAnswer =
        activeSurvey.questions[activeQuestionIndex - 1].answer;
      // Unable to test this since this never happens
      /* v8 ignore next */
      if (!previousAnswer) return;

      setActiveQuestionIndex(activeQuestionIndex - 1);
      setCurrentAnswer({
        id: activeSurvey.questions[activeQuestionIndex - 1].questionId,
        ...previousAnswer,
      });
    }
  };

  const defaultActions: DialogProps['actions'] = [
    {
      text: activeQuestionIndex === 0 ? 'Maybe later' : 'Back',
      variant: 'ghost',
      onClick: handleOnBack,
    },
    {
      text:
        activeQuestionIndex === 0
          ? 'Get started'
          : activeQuestionIndex === activeSurvey.questions.length - 1
            ? 'Complete'
            : 'Next',
      disabled: disabledNextAction(),
      onClick: handleAnswer,
      isLoading: isAnswering,
    },
  ];

  if (activeSurvey.surveyType === SurveyType.UMUX) {
    return <UmuxDialog />;
  }

  return (
    <Dialog
      open
      width={650}
      title={activeSurvey.title}
      onClose={cancelSurvey}
      actions={
        activeQuestionIndex === 0
          ? [
              {
                text: 'Do not show me this again',
                variant: 'ghost',
                onClick: hideSurvey,
                position: 'left',
              },
              ...defaultActions,
            ]
          : defaultActions
      }
    >
      <Content>
        <SurveyProgress />
        <Typography variant="body_short_bold">
          {activeSurvey.questions[activeQuestionIndex].text}
        </Typography>
        <SurveyQuestion />
      </Content>
    </Dialog>
  );
};
