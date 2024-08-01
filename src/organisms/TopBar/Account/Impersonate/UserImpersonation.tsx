import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { account_circle, check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { animation } from 'src/atoms/style';
import { spacings } from 'src/atoms/style/spacings';
import { Chip } from 'src/molecules/Chip/Chip';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $selected: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  height: calc(32px + ${spacings.medium} * 2);
  padding: 0 ${spacings.medium};
  background: ${({ $selected }) =>
    $selected
      ? colors.interactive.primary__selected_highlight.rgba
      : 'transparent'};
  transition: background ${animation.transitionMS};
  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
  }
  > svg:last-child {
    margin-left: auto;
  }
`;

const RoleChip = styled(Chip)`
  height: fit-content;
  color: ${colors.text.static_icons__primary_white.rgba};
  background: ${colors.text.static_icons__tertiary.rgba};
`;

interface UserImpersonationProps {
  name: string;
  roles: string[];
  selected?: boolean;
  onClick: (username: string) => void;
}

export const UserImpersonation: FC<UserImpersonationProps> = ({
  name,
  roles,
  selected = false,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(name);
  };

  return (
    <Container $selected={selected} onClick={handleOnClick}>
      <Icon
        color={colors.text.static_icons__tertiary.rgba}
        data={account_circle}
      />
      <Typography>{name}</Typography>
      {roles.map((role) => (
        <RoleChip key={role}>{role}</RoleChip>
      ))}
      {selected && (
        <Icon data={check} color={colors.interactive.primary__resting.rgba} />
      )}
    </Container>
  );
};
