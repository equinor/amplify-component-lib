import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { CreateNewUser } from './CreateNewUser/CreateNewUser';
import { useGetAllImpersonationUsersForApp } from './hooks/useGetAllImpersonationUsersForApp';
import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header, StyledMenu } from './Impersonate.styles';
import { UserImpersonation } from './UserImpersonation';
import { Search } from 'src/molecules';

interface ImpersonateProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export const Impersonate: FC<ImpersonateProps> = ({
  open,
  onClose,
  anchorEl,
}) => {
  const [creatingNewUser, setCreatingNewUser] = useState(false);
  const [selectedUniqueName, setSelectedUniqueName] = useState('');

  const { data: availableUsers } = useGetAllImpersonationUsersForApp();

  const handleOnCreateNewOpen = () => setCreatingNewUser(true);
  const handleOnCreateNewBack = () => setCreatingNewUser(false);
  const handleOnCreateNewClose = () => {
    setCreatingNewUser(false);
    onClose();
  };

  if (!open) return null;

  if (creatingNewUser) {
    return (
      <StyledMenu open anchorEl={anchorEl} onClose={onClose}>
        <CreateNewUser
          onBack={handleOnCreateNewBack}
          onClose={handleOnCreateNewClose}
        />
      </StyledMenu>
    );
  }

  return (
    <StyledMenu open anchorEl={anchorEl} onClose={onClose}>
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
    </StyledMenu>
  );
};
