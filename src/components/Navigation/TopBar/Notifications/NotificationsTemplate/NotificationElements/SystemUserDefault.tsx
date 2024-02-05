import { FC } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { NotificationsTypes, SystemUserTypes } from '../Notifications.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-top: ${spacings.comfortable.medium_small};
`;

const StyledButton = styled(Button)`
  width: fit-content;
`;

interface SystemUserDefaultProps extends SystemUserTypes {
  onClick: () => void;
}
const SystemUserDefault: FC<SystemUserDefaultProps> = ({ onClick }) => {
  return (
    <Container data-testid={NotificationsTypes.SYSTEM_USER}>
      <Typography group="table" variant="cell_text">
        New Release available! Explore the latest features and improvemnts
      </Typography>
      <StyledButton variant="outlined" onClick={onClick}>
        Go to Location <Icon data={external_link} />
      </StyledButton>
    </Container>
  );
};

export default SystemUserDefault;
