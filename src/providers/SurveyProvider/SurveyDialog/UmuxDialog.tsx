import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import {
  AnswerQuestionCommandDto,
  QuestionType,
  useAnswerQuestionActiveSurvey,
  useRespondActiveSurvey,
} from '@equinor/subsurface-app-management';

import { useSurvey } from '../hooks/useSurvey';
import { SurveyLinearScaleQuestion } from './SurveyQuestion/SurveyLinearScaleQuestion';
import { Content } from './SurveyDialog.styles';
import { spacings } from 'src/atoms/style';
import { InformationalNotice } from 'src/molecules';
import { Dialog } from 'src/molecules/Dialog/Dialog';

import styled from 'styled-components';

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium_small};
`;

export const UmuxDialog: FC = () => {
  const {
    activeSurvey,
    hideSurvey,
    cancelSurvey,
    setActiveQuestionIndex,
    completeSurvey,
  } = useSurvey();
  const { mutateAsync: respondActiveSurvey } = useRespondActiveSurvey();
  const { mutateAsync: answerQuestion } = useAnswerQuestionActiveSurvey();
  const [answers, setAnswers] = useState<AnswerQuestionCommandDto[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!activeSurvey) return null;

  const completeDisabled =
    answers.length !== activeSurvey.questions.length ||
    answers.some((answer) => !answer.numericAnswer);

  const handleOnComplete = async () => {
    setIsCompleting(true);
    const data = await respondActiveSurvey({
      surveyId: activeSurvey.surveyId,
      optOut: false,
    });

    await Promise.all(
      answers.map((answer) =>
        answerQuestion({
          surveyResponseId: data.value,
          body: answer,
        })
      )
    );
    setIsCompleting(false);

    setActiveQuestionIndex(undefined);
    completeSurvey();
  };

  return (
    <Dialog
      open
      width={650}
      title={activeSurvey.title}
      onClose={cancelSurvey}
      actions={[
        {
          text: 'Do not show me this again',
          variant: 'ghost',
          onClick: hideSurvey,
          position: 'left',
        },
        {
          text: 'Maybe later',
          variant: 'ghost',
          onClick: cancelSurvey,
        },
        {
          text: 'Complete',
          onClick: handleOnComplete,
          isLoading: isCompleting,
          disabled: completeDisabled,
        },
      ]}
    >
      <Content>
        <InformationalNotice>
          Your insights help us create a better experience. Please take a moment
          to answer two short questions, it is completely anonymous.
        </InformationalNotice>
        {activeSurvey.questions.map((question, index) => (
          <QuestionWrapper key={question.questionId.value}>
            <Typography variant="body_short_bold">{question.text}</Typography>
            {question.linearScaleConfig && (
              <SurveyLinearScaleQuestion
                type={QuestionType.LINEAR_SCALE}
                text={question.text}
                questionId={question.questionId}
                linearScaleConfig={{
                  max: question.linearScaleConfig.max,
                  min: question.linearScaleConfig.min,
                  minLabel: question.linearScaleConfig.minLabel,
                  maxLabel: question.linearScaleConfig.maxLabel,
                }}
                answer={answers[index]}
                setAnswer={(answer) => {
                  setAnswers((prev) => {
                    const copy = [...prev];
                    copy[index] = answer;
                    return copy;
                  });
                }}
              />
            )}
          </QuestionWrapper>
        ))}
      </Content>
    </Dialog>
  );
};
