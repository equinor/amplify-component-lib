import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { arrow_back, delete_to_trash } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useDeleteImpersonation } from '../hooks/useDeleteImpersonation';
import { Header } from '../Impersonate.styles';
import { Container } from './DeleteUser.styles';
import { colors } from 'src/atoms/style';
import { IconButton } from 'src/molecules';
import { Button } from 'src/molecules/Button/Button';
import {
  RoleChip,
  RolesContainer,
  TextContent,
} from 'src/organisms/TopBar/Account/Account.styles';
import { StatusAvatar } from 'src/organisms/TopBar/Account/StatusAvatar';
import { useSnackbar } from 'src/providers/SnackbarProvider/SnackbarProvider';

interface DeleteUserProps {
  user: ImpersonateUserDto;
  onBack: () => void;
}

export const DeleteUser: FC<DeleteUserProps> = ({ user, onBack }) => {
  const { mutateAsync: deleteUser, isPending } = useDeleteImpersonation();
  const { showSnackbar } = useSnackbar();
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleDelete = async () => {
    await deleteUser(user);
    showSnackbar(`Deleted user "${fullName}" successfully`);
    onBack();
  };

  return (
    <Container>
      <Header>
        <IconButton icon={arrow_back} variant="ghost" onClick={onBack} />
        <Typography variant="h6">Delete user</Typography>
      </Header>
      <section>
        <Typography variant="h4">You are deleting a user</Typography>
        <Typography
          variant="caption"
          color={colors.text.static_icons__tertiary.rgba}
        >
          Are you sure you want to delete user &quot;{fullName}&quot;?
        </Typography>
      </section>
      <StatusAvatar size={64} name={fullName} variant="impersonate" />
      <TextContent>
        <Typography variant="h6">{fullName}</Typography>
        <Typography>{user.uniqueName}</Typography>
      </TextContent>
      <RolesContainer>
        {user.roles.map((role) => (
          <RoleChip key={role}>{role}</RoleChip>
        ))}
      </RolesContainer>
      <div>
        <Button
          loading={isPending}
          leadingIcon={delete_to_trash}
          variant="outlined"
          color="danger"
          label="Delete user"
          onClick={handleDelete}
        />
        <Button label="Cancel" variant="ghost" onClick={onBack} />
      </div>
    </Container>
  );
};
