import { FC } from 'react';

import { DotProgress, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_back, delete_to_trash } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useDeleteImpersonation } from '../hooks/useDeleteImpersonation';
import { Header } from '../Impersonate.styles';
import { Container } from './DeleteUser.styles';
import { colors } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import {
  RoleChip,
  RolesContainer,
  TextContent,
} from 'src/organisms/TopBar/Account/Account.styles';
import { ImpersonateAvatar } from 'src/organisms/TopBar/Account/ImpersonateAvatar';
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
        <Button variant="ghost_icon" onClick={onBack}>
          <Icon data={arrow_back} />
        </Button>
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
      <ImpersonateAvatar size={64} fullName={fullName} />
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
        {isPending ? (
          <Button variant="outlined" color="danger">
            <DotProgress color="tertiary" />
          </Button>
        ) : (
          <Button variant="outlined" color="danger" onClick={handleDelete}>
            <Icon data={delete_to_trash} /> Delete user
          </Button>
        )}
        <Button variant="ghost" onClick={onBack}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};
