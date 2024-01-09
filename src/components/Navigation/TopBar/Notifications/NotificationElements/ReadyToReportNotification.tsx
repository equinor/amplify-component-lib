import { FC } from 'react';

import { Chip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const SmallContainers = styled.div`
  display: flex;
  flex-direction: column;
`;

const LastContainer = styled.div`
  grid-column: span 3;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const ReadyToReportNotification: FC = () => {
  return (
    <Container>
      <SmallContainers>
        <Typography group="paragraph" variant="overline">
          {' '}
          Field{' '}
        </Typography>
        <Typography group="table" variant="cell_text">
          {' '}
          Johan Sverdrup{' '}
        </Typography>
      </SmallContainers>
      <SmallContainers>
        <Typography group="paragraph" variant="overline">
          {' '}
          WELLBORE
        </Typography>
        <Typography group="table" variant="cell_text">
          {' '}
          NO 16/2-D-22
        </Typography>
      </SmallContainers>
      <LastContainer>
        <Chip> data type </Chip>{' '}
        <Typography group="navigation" variant="label">
          {' '}
          is ready to report{' '}
        </Typography>
      </LastContainer>
    </Container>
  );
};

export default ReadyToReportNotification;
