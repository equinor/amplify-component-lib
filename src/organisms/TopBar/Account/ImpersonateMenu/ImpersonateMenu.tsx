import { FC, useEffect, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { CreateNewUser } from './CreateNewUser/CreateNewUser';
import { useGetAllImpersonationUsersForApp } from './hooks/useGetAllImpersonationUsersForApp';
import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header } from './Impersonate.styles';
import { UserImpersonation } from './UserImpersonation';
import { Menu } from 'src/molecules';
import { Search } from 'src/molecules';
import { useActiveImpersonationUser } from 'src/organisms/TopBar/Account/ImpersonateMenu/hooks/useActiveImpersonationUser';

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
  const [creatingNewUser, setCreatingNewUser] = useState(false);
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

  const handleOnCreateNewOpen = () => setCreatingNewUser(true);
  const handleOnCreateNewBack = () => setCreatingNewUser(false);
  const handleOnCreateNewClose = () => {
    setCreatingNewUser(false);
    handleOnClose();
  };

  if (!open) return null;

  if (creatingNewUser) {
    return (
      <Menu
        open
        anchorEl={anchorEl}
        onClose={handleOnCreateNewClose}
        placement="bottom-end"
      >
        <CreateNewUser
          onBack={handleOnCreateNewBack}
          onClose={handleOnCreateNewClose}
        />
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
          />
        ))}
      </Content>
      <CreateNewUserButton onClick={handleOnCreateNewOpen} />
      <Actions selectedUniqueName={selectedUniqueName} onCancel={onClose} />
    </Menu>
  );
};
