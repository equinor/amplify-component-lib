import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { exit_to_app } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { animation, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors } = tokens;

const Container = styled.button`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: ${spacings.medium};
  transition: background ${animation.transitionMS};
  border-top: 1px solid ${colors.ui.background__medium.rgba};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface CreateNewUserButtonProps {
  onClick: () => void;
}

export const CreateNewUserButton: FC<CreateNewUserButtonProps> = ({
  onClick,
}) => (
  <Container onClick={onClick}>
    <div>
      <Typography variant="overline">Missing a persona?</Typography>
      <Typography variant="h6">Create users to impersonate</Typography>
    </div>
    <Icon color={colors.interactive.primary__resting.rgba} data={exit_to_app} />
  </Container>
);
