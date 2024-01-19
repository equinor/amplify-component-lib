import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { Due3WeeksProps } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

interface ExperienceDue3WeeksProps extends Due3WeeksProps {
  onClick: () => void;
}
const ExperienceDue3Weeks: FC<ExperienceDue3WeeksProps> = ({
  well,
  commentsCount,
  onClick,
}) => {
  return (
    <Container>
      <Tooltip title={`Go to ${well.displayName}`} onClick={onClick}>
        <div>
          <Typography group="table" variant="cell_text" bold>
            Experience report are due in 3 weeks
          </Typography>
          <Typography group="table" variant="cell_text">
            {well.displayName}
          </Typography>
        </div>
      </Tooltip>
      <div>
        <Typography group="table" variant="cell_text">
          {commentsCount} experiences
        </Typography>
      </div>
    </Container>
  );
};

export default ExperienceDue3Weeks;
