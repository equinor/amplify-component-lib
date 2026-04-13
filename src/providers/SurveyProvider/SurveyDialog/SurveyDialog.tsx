import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { QuestionType } from '@equinor/subsurface-app-management';

import { SurveyQuestion } from './SurveyQuestion/SurveyQuestion';
import { SurveyProgress } from './SurveyProgress';
import { spacings } from 'src/atoms/style';
import { Dialog, type DialogProps } from 'src/molecules/Dialog/Dialog';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';

import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.large};
`;

export const SurveyDialog: FC = () => {
  const {
    activeSurvey,
    activeQuestionIndex,
    cancelSurvey,
    hideSurvey,
    answerQuestion,
    currentAnswer,
    isCancelled,
  } = useSurvey();
  const [isAnswering, setIsAnswering] = useState(false);

  if (!activeSurvey || activeQuestionIndex === undefined || isCancelled)
    return null;

  const handleAnswer = async () => {
    if (!currentAnswer) return;

    setIsAnswering(true);
    try {
      await answerQuestion({
        ...currentAnswer,
        selectedOptionIds: currentAnswer?.selectedOptionIds ?? [],
      });
    } catch (e) {
      console.error(e);
    }
    setIsAnswering(false);
  };

  const disabledNextAction = () => {
    if (!currentAnswer) return true;
    const currentQuestion = activeSurvey?.questions[activeQuestionIndex ?? 0];

    switch (currentQuestion.type) {
      case QuestionType.CHOICE:
        return (
          !currentAnswer.selectedOptionIds ||
          currentAnswer.selectedOptionIds.length === 0 ||
          currentAnswer.selectedOptionIds.length >
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

  const defaultActions: DialogProps['actions'] = [
    {
      text: activeQuestionIndex === 0 ? 'Maybe later' : 'Cancel',
      variant: 'ghost',
      onClick: cancelSurvey,
    },
    {
      text:
        activeQuestionIndex === 0
          ? 'Get started'
          : activeQuestionIndex === activeSurvey.questions.length - 1
            ? 'Finish'
            : 'Next',
      disabled: disabledNextAction(),
      onClick: handleAnswer,
      isLoading: isAnswering,
    },
  ];

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
