import { FC } from 'react';

import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ExperienceReadyToPublishTypes } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

interface ReadyToBePublishedProps extends ExperienceReadyToPublishTypes {
  onClick?: () => void;
}

const ReadyToBePublished: FC<ReadyToBePublishedProps> = ({
  experienceCount,
  well,
  onClick,
}) => {
  return (
    <Tooltip title={`Go to ${well.displayName}`}>
      <Container onClick={onClick}>
        <div>
          <Typography group="table" variant="cell_text" bold>
            Experiences are ready to be published
          </Typography>
          <Typography group="table" variant="cell_text">
            {well.displayName}
          </Typography>
        </div>
        <div>
          <Typography group="table" variant="cell_text">
            {experienceCount}
          </Typography>
        </div>
      </Container>
    </Tooltip>
  );
};

export default ReadyToBePublished;
