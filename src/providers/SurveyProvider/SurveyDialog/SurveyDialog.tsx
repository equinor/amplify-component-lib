import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

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
  } = useSurvey();

  if (!activeSurvey || activeQuestionIndex === undefined) return null;

  const handleAnswer = () => {
    if (!currentAnswer) return;

    answerQuestion(currentAnswer);
  };

  const defaultActions: DialogProps['actions'] = [
    {
      text: activeQuestionIndex === 0 ? 'Maybe later' : 'Cancel',
      variant: 'ghost',
      onClick: cancelSurvey,
    },
    {
      text: activeQuestionIndex === 0 ? 'Get started' : 'Next',
      disabled: !currentAnswer,
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
          {activeSurvey.questions[activeQuestionIndex].question}
        </Typography>
        <SurveyQuestion />
      </Content>
    </Dialog>
  );
};
