import { FC, MouseEvent, useRef, useState } from 'react';

import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import {
  account_circle,
  check,
  delete_to_trash,
  edit,
  more_horizontal,
} from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useMappedRoles } from './hooks/useMappedRoles';
import {
  Container,
  RoleChip,
  RoleChipContainer,
} from './UserImpersonation.styles';
import { colors } from 'src/atoms/style/colors';
import { ListItem } from 'src/molecules/ListItem/ListItem';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';

import styled from 'styled-components';

const StyledListItem = styled(ListItem)`
  svg {
    fill: ${colors.interactive.danger__resting.rgba};
  }
  p {
    color: ${colors.interactive.danger__resting.rgba};
  }
  &:disabled {
    svg {
      fill: ${colors.interactive.disabled__text.rgba};
    }
  }
  &:hover:not(:disabled) {
    background: ${colors.interactive.danger__highlight.rgba};
  }
`;

interface UserImpersonationProps extends ImpersonateUserDto {
  selected: boolean;
  onClick: (username: string) => void;
  onEdit: (username: string) => void;
  onDelete: (username: string) => void;
}

export const UserImpersonation: FC<UserImpersonationProps> = ({
  firstName,
  lastName,
  uniqueName,
  roles,
  activeUsers,
  selected,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const fullName = impersonateUserDtoToFullName({ firstName, lastName });
  const activeRoles = useMappedRoles(roles);

  const handleOnToggleMenu = () => setOpen((prev) => !prev);
  const handleOnClose = () => setOpen(false);

  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== buttonRef.current) {
      onClick(uniqueName);
    }
  };

  const handleOnEditUser = () => {
    onEdit(uniqueName);
    handleOnClose();
  };

  const handleOnDeleteUser = () => {
    onDelete(uniqueName);
    handleOnClose();
  };

  return (
    <>
      <Container
        $selected={selected}
        onClick={handleOnClick}
        data-testid="impersonation-user"
      >
        <Icon
          color={colors.text.static_icons__tertiary.rgba}
          data={account_circle}
        />
        <OptionalTooltip title={fullName} placement="top">
          <Typography data-testid="name">{fullName}</Typography>
        </OptionalTooltip>
        <RoleChipContainer $selected={selected}>
          <OptionalTooltip title={activeRoles.at(0)?.label} placement="top">
            <RoleChip data-testid="role">{activeRoles[0].label}</RoleChip>
          </OptionalTooltip>
          {activeRoles.length > 1 && (
            <OptionalTooltip
              title={activeRoles
                .slice(1)
                .map((role) => role.label)
                .join(', ')}
            >
              <RoleChip data-testid="additional-roles">
                {`+${activeRoles.length - 1}`}
              </RoleChip>
            </OptionalTooltip>
          )}
        </RoleChipContainer>
        {selected && (
          <Icon data={check} color={colors.interactive.primary__resting.rgba} />
        )}
        <Button
          variant="ghost_icon"
          ref={buttonRef}
          onClick={handleOnToggleMenu}
        >
          <Icon data={more_horizontal} />
        </Button>
      </Container>
      {open && (
        <Menu
          open
          anchorEl={buttonRef.current}
          placement="right-start"
          onClose={handleOnClose}
        >
          <ListItem
            label="Edit user"
            onClick={handleOnEditUser}
            leadingContent={edit}
          />
          <OptionalTooltip
            title={
              activeUsers.length > 0
                ? 'Cannot delete user with active sessions'
                : undefined
            }
          >
            <StyledListItem
              label="Delete user"
              onClick={handleOnDeleteUser}
              disabled={activeUsers.length > 0}
              leadingContent={delete_to_trash}
            />
          </OptionalTooltip>
        </Menu>
      )}
    </>
  );
};
