import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward, engineering } from '@equinor/eds-icons';

import { OpenImpersonationMenuButton } from './Account.styles';
import { colors, spacings } from 'src/atoms/style';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.x_small};
  > hr {
    background: ${colors.text.static_icons__tertiary.rgba};
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
`;

interface ActiveUserImpersonationButtonProps {
  onClick: () => void;
}

export const ActiveUserImpersonationButton: FC<
  ActiveUserImpersonationButtonProps
> = ({ onClick }) => {
  const { account } = useAuth();

  return (
    <OpenImpersonationMenuButton onClick={onClick}>
      <Icon data={engineering} />
      <Container>
        <Typography variant="breadcrumb" group="navigation">
          {account?.name?.split(' ').at(0)}
        </Typography>
        <hr />
        <Typography
          variant="breadcrumb"
          group="navigation"
          color={colors.text.static_icons__tertiary.rgba}
        >
          {account?.username}
        </Typography>
      </Container>
      <Icon data={arrow_forward} />
    </OpenImpersonationMenuButton>
  );
};
