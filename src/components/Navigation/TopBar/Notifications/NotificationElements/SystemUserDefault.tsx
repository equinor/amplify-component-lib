import { FC } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const SystemUserDefault: FC = () => {
  return (
    <Container>
      <Typography group="table" variant="cell_text">
        New Release available! Explore the latest fatures and improvemnt
      </Typography>
      <StyledButton variant="outlined">
        Go to Location <Icon data={external_link} />
      </StyledButton>
    </Container>
  );
};

export default SystemUserDefault;

const StyledButton = styled(Button)`
  width: fit-content;
`;
