import { FC } from 'react';

import { LinearProgress, Typography } from '@equinor/eds-core-react';

import { colors } from 'src/atoms';
import { useSurvey } from 'src/providers/SurveyProvider/hooks/useSurvey';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const SurveyProgress: FC = () => {
  const { activeSurvey, activeQuestionIndex } = useSurvey();
  const total = activeSurvey?.questions.length ?? 0;
  const current = (activeQuestionIndex ?? 0) + 1;

  const percentage = (current / total) * 100;

  return (
    <Container>
      <Typography
        color={colors.text.static_icons__tertiary.rgba}
        variant="meta"
      >
        Question {current} of {total}
      </Typography>
      <Typography
        color={colors.text.static_icons__tertiary.rgba}
        variant="meta"
      >
        {percentage}%
      </Typography>
      <LinearProgress
        style={{ gridColumn: 'span 2' }}
        value={percentage}
        color="secondary"
        variant="determinate"
      />
    </Container>
  );
};
