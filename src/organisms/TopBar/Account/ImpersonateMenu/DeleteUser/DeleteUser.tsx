import { FC } from 'react';

import { arrow_back, delete_to_trash } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useDeleteImpersonation } from '../hooks/useDeleteImpersonation';
import { Header } from '../Impersonate.styles';
import { Container } from './DeleteUser.styles';
import { colors, useSnackbar } from 'src/atoms';
import { Button, DotProgress, Icon, Typography } from 'src/molecules';
import { ImpersonateAvatar } from 'src/organisms/TopBar/Account/ImpersonateAvatar';

interface DeleteUserProps {
  user: ImpersonateUserDto;
  onBack: () => void;
}

export const DeleteUser: FC<DeleteUserProps> = ({ user, onBack }) => {
  const { mutateAsync: deleteUser, isPending } = useDeleteImpersonation();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    await deleteUser(user);
    showSnackbar(`Deleted user "${user.fullName}" successfully`);
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
      <ImpersonateAvatar size={64} fullName={user.fullName} />
      <section>
        <Typography variant="h4">You are deleting a user</Typography>
        <Typography
          variant="meta"
          color={colors.text.static_icons__tertiary.rgba}
        >
          Are you sure you want to delete user &quot;{user.fullName}&quot;
        </Typography>
      </section>
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
