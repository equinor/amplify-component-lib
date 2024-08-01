import { FC, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Actions } from './Actions';
import { CreateNewUserButton } from './CreateNewUserButton';
import { Content, Header, StyledMenu } from './Impersonate.styles';
import { Search } from 'src/molecules';
import { UserImpersonation } from 'src/organisms/TopBar/Account/Impersonate/UserImpersonation';

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

  if (!open) return null;

  return (
    <StyledMenu open anchorEl={anchorEl} onClose={onClose}>
      <Header>
        <Typography variant="h6">Impersonate</Typography>
        <Typography variant="caption">Select a user to impersonate</Typography>
        <Search placeholder="Search users" />
      </Header>
      <Content>
        <UserImpersonation
          name="Kjartan"
          roles={['admin', 'writer']}
          onClick={setSelectedUserImpersonation}
        />
      </Content>
      <CreateNewUserButton onClick={handleOnOpenCreateNew} />
      <Actions />
    </StyledMenu>
  );
};
