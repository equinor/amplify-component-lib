import { FC } from 'react';

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

  if (!activeSurvey || activeQuestionIndex === undefined || isCancelled)
    return null;

  const handleAnswer = () => {
    if (!currentAnswer) return;

    answerQuestion({
      ...currentAnswer,
      selectedOptionIds: currentAnswer?.selectedOptions ?? [],
    });
  };

  const disabledNextAction = () => {
    if (!currentAnswer) return true;
    const currentQuestion = activeSurvey?.questions[activeQuestionIndex ?? 0];

    switch (currentQuestion.type) {
      case QuestionType.CHOICE:
        return (
          !currentAnswer.selectedOptions ||
          currentAnswer.selectedOptions.length <=
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
      text: activeQuestionIndex === 0 ? 'Get started' : 'Next',
      disabled: disabledNextAction(),
      onClick: handleAnswer,
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
