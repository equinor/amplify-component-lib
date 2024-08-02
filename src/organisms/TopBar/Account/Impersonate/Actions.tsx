import { FC } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';

import { spacings } from 'src/atoms/style/spacings';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.medium};
  width: 20rem;
`;

const Section = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.small};
`;

interface ActionsProps {
  canImpersonate: boolean;
  onCancel: () => void;
  onImpersonate: () => void;
}

export const Actions: FC<ActionsProps> = ({
  canImpersonate,
  onCancel,
  onImpersonate,
}) => (
  <Container>
    <Typography variant="body_short">
      By selecting a user to impersonate, you will view the contents of this app
      as if you would be that user.
    </Typography>
    <Section>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onImpersonate} disabled={!canImpersonate}>
        Impersonate
      </Button>
    </Section>
  </Container>
);
