import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header, StyledMenu } from './Impersonate.styles';
import { Search } from 'src/molecules';
import { CreateNewUser } from 'src/organisms/TopBar/Account/Impersonate/CreateNewUser/CreateNewUser';
import { UserImpersonation } from 'src/organisms/TopBar/Account/Impersonate/UserImpersonation';

const FAKE_USERS = [
  {
    name: 'Kjartan',
    roles: ['admin', 'writer'],
  },
  {
    name: 'Nadia',
    roles: ['admin'],
  },
  {
    name: 'Anna',
    roles: ['writer'],
  },
];

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
  const [selectedUserImpersonation, setSelectedUserImpersonation] =
    useState('');

  const handleOnOpenCreateNew = () => setCreatingNewUser(true);
  const handleOnCloseCreateNew = () => setCreatingNewUser(false);
  const handleOnCreateNewUser = () => {
    console.log('CREATE');
  };
  const handleOnImpersonate = () => {
    console.log('impersonate');
  };

  if (!open) return null;

  if (creatingNewUser) {
    return (
      <StyledMenu open anchorEl={anchorEl} onClose={onClose}>
        <CreateNewUser
          onBack={handleOnCloseCreateNew}
          onCreateNewUser={handleOnCreateNewUser}
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
        {FAKE_USERS.map((user) => (
          <UserImpersonation
            key={user.name}
            selected={selectedUserImpersonation === user.name}
            {...user}
            onClick={setSelectedUserImpersonation}
          />
        ))}
      </Content>
      <CreateNewUserButton onClick={handleOnOpenCreateNew} />
      <Actions
        canImpersonate={selectedUserImpersonation !== ''}
        onCancel={onClose}
        onImpersonate={handleOnImpersonate}
      />
    </StyledMenu>
  );
};
