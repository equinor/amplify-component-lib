import { FC, useEffect, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useActiveImpersonationUser } from './hooks/useActiveImpersonationUser';
import { useGetAllImpersonationUsersForApp } from './hooks/useGetAllImpersonationUsersForApp';
import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header } from './Impersonate.styles';
import { UserImpersonation } from './UserImpersonation';
import { Menu } from 'src/molecules';
import { Search } from 'src/molecules';
import { CreateOrEditUser } from 'src/organisms/TopBar/Account/ImpersonateMenu/CreateOrEditUser/CreateOrEditUser';
import { DeleteUser } from 'src/organisms/TopBar/Account/ImpersonateMenu/DeleteUser/DeleteUser';

interface ImpersonateProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export const ImpersonateMenu: FC<ImpersonateProps> = ({
  open,
  onClose,
  anchorEl,
}) => {
  const [creatingOrEditingUser, setCreatingOrEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<
    ImpersonateUserDto | undefined
  >(undefined);
  const [deletingUser, setDeletingUser] = useState<
    ImpersonateUserDto | undefined
  >(undefined);
  const [selectedUniqueName, setSelectedUniqueName] = useState('');
  const { data: availableUsers } = useGetAllImpersonationUsersForApp();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  useEffect(() => {
    if (
      !open &&
      activeImpersonationUser &&
      selectedUniqueName !== activeImpersonationUser.uniqueName
    ) {
      setSelectedUniqueName(activeImpersonationUser.uniqueName);
    } else if (!open && !activeImpersonationUser && selectedUniqueName !== '') {
      setSelectedUniqueName('');
    }
  }, [activeImpersonationUser, open, selectedUniqueName]);

  const handleOnClose = () => {
    onClose();
  };

  const handleOnCreateNewOpen = () => setCreatingOrEditingUser(true);
  const handleOnCreateNewBack = () => {
    setCreatingOrEditingUser(false);
    if (editingUser) setEditingUser(undefined);
  };
  const handleOnCreateNewClose = () => {
    setCreatingOrEditingUser(false);
    if (editingUser) setEditingUser(undefined);
    handleOnClose();
  };

  const handleOnEditUser = (username: string) => {
    setEditingUser(
      availableUsers?.find((user) => user.uniqueName === username)
    );
    setCreatingOrEditingUser(true);
  };

  const handleOnDeleteUser = (username: string) => {
    setDeletingUser(
      availableUsers?.find((user) => user.uniqueName === username)
    );
  };

  if (!open) return null;

  if (creatingOrEditingUser) {
    return (
      <Menu
        open
        anchorEl={anchorEl}
        onClose={handleOnCreateNewClose}
        placement="bottom-end"
      >
        <CreateOrEditUser
          editingUser={editingUser}
          onBack={handleOnCreateNewBack}
          onClose={handleOnCreateNewClose}
        />
      </Menu>
    );
  }

  if (deletingUser) {
    return (
      <Menu
        open
        anchorEl={anchorEl}
        onClose={handleOnCreateNewClose}
        placement="bottom-end"
      >
        <DeleteUser user={deletingUser} />
      </Menu>
    );
  }

  return (
    <Menu
      open
      anchorEl={anchorEl}
      onClose={handleOnClose}
      placement="bottom-end"
    >
      <Header>
        <Typography variant="h6">Impersonate</Typography>
        <Typography variant="caption">Select a user to impersonate</Typography>
        <Search placeholder="Search users" />
      </Header>
      <Content>
        {availableUsers?.map((user) => (
          <UserImpersonation
            key={user.uniqueName}
            {...user}
            selected={selectedUniqueName === user.uniqueName}
            onClick={setSelectedUniqueName}
            onEdit={handleOnEditUser}
            onDelete={handleOnDeleteUser}
          />
        ))}
      </Content>
      <CreateNewUserButton onClick={handleOnCreateNewOpen} />
      <Actions selectedUniqueName={selectedUniqueName} onCancel={onClose} />
    </Menu>
  );
};
