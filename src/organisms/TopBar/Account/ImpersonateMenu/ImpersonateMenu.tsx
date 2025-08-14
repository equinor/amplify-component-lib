import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Menu, Typography } from '@equinor/eds-core-react';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { CreateOrEditUser } from './CreateOrEditUser/CreateOrEditUser';
import { DeleteUser } from './DeleteUser/DeleteUser';
import { useActiveImpersonationUser } from './hooks/useActiveImpersonationUser';
import { useGetAllImpersonationUsersForApp } from './hooks/useGetAllImpersonationUsersForApp';
import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header, NoUsersText } from './ImpersonateMenu.styles';
import { UserImpersonation } from './UserImpersonation';
import { Field } from 'src/atoms/types/Field';
import { Search } from 'src/molecules/Search/Search';
import { impersonateUserDtoToFullName } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.utils';

interface ImpersonateProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  availableFields?: Field[];
  availableWells?: string[];
}

export const ImpersonateMenu: FC<ImpersonateProps> = ({
  open,
  onClose,
  anchorEl,
  availableFields,
  availableWells,
}) => {
  const [creatingOrEditingUser, setCreatingOrEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<
    ImpersonateUserDto | undefined
  >(undefined);
  const [deletingUser, setDeletingUser] = useState<
    ImpersonateUserDto | undefined
  >(undefined);
  const [selectedUniqueName, setSelectedUniqueName] = useState('');
  const [search, setSearch] = useState('');
  const { data: availableUsers } = useGetAllImpersonationUsersForApp();
  const { data: activeImpersonationUser } = useActiveImpersonationUser();

  const filteredUsers = availableUsers?.filter((user) =>
    impersonateUserDtoToFullName(user)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

  const handleOnDeleteBack = () => {
    setDeletingUser(undefined);
  };

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (!open) return null;

  if (creatingOrEditingUser) {
    return (
      <Menu
        open
        anchorEl={anchorEl}
        onClose={handleOnCreateNewClose}
        placement="bottom-end"
        style={{ width: '400px' }}
      >
        <CreateOrEditUser
          editingUser={editingUser}
          onBack={handleOnCreateNewBack}
          availableFields={availableFields}
          availableWells={availableWells}
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
        style={{ width: '400px' }}
      >
        <DeleteUser user={deletingUser} onBack={handleOnDeleteBack} />
      </Menu>
    );
  }

  return (
    <Menu
      open
      anchorEl={anchorEl}
      onClose={handleOnClose}
      placement="bottom-end"
      style={{ width: '400px' }}
    >
      <Header>
        <Typography variant="h6">Impersonate</Typography>
        <Typography variant="caption">Select a user to impersonate</Typography>
        <Search
          placeholder="Search users"
          value={search}
          onChange={handleOnSearch}
        />
      </Header>
      <Content>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers?.map((user) => (
            <UserImpersonation
              key={user.uniqueName}
              {...user}
              selected={selectedUniqueName === user.uniqueName}
              onClick={setSelectedUniqueName}
              onEdit={handleOnEditUser}
              onDelete={handleOnDeleteUser}
            />
          ))
        ) : (
          <NoUsersText>No items found</NoUsersText>
        )}
      </Content>
      <CreateNewUserButton onClick={handleOnCreateNewOpen} />
      <Actions selectedUniqueName={selectedUniqueName} onCancel={onClose} />
    </Menu>
  );
};
