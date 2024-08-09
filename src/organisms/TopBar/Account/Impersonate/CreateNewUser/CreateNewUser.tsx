import { ChangeEvent, FC, useMemo, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_back } from '@equinor/eds-icons';

import { useCreateImpersonation } from '../hooks/useCreateImpersonation';
import { Container, Header, Section } from './CreateNewUser.styles';
import { environment } from 'src/atoms';
import { Switch } from 'src/molecules';
import { TextField } from 'src/molecules/TextField/TextField';

const FAKE_AVAILABLE_ROLES = ['admin', 'writer', 'reader'];

interface CreateNewUserProps {
  onBack: () => void;
  onClose: () => void;
}

export const CreateNewUser: FC<CreateNewUserProps> = ({ onBack, onClose }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { mutateAsync: createImpersonationUser } = useCreateImpersonation();

  const isCreateDisabled = useMemo(
    () => firstName === '' || lastName === '' || roles.length === 0,
    [firstName, lastName, roles.length]
  );

  const handleOnFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleOnLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleOnRoleToggle = (role: string) => {
    setRoles((prev) => {
      if (prev.includes(role)) return prev.filter((item) => item !== role);
      return [...prev, role];
    });
  };

  const handleOnCreate = async () => {
    await createImpersonationUser({
      firstName,
      lastName,
      roles,
      uniqueName: `${firstName}.${lastName}`.toLowerCase(),
      name: `${firstName} ${lastName}`,
      appName: environment.getAppName(import.meta.env.VITE_NAME),
      activeUsers: [],
    });
    onClose();
  };

  return (
    <Container>
      <Header>
        <Button variant="ghost_icon" onClick={onBack}>
          <Icon data={arrow_back} />
        </Button>
        <Typography variant="h6">Create new user</Typography>
      </Header>
      <Section>
        <TextField
          id="first-name"
          label="First name"
          placeholder="Add first name..."
          value={firstName}
          onChange={handleOnFirstNameChange}
        />
        <TextField
          id="last-name"
          label="Last name"
          placeholder="Add last name..."
          value={lastName}
          onChange={handleOnLastNameChange}
        />
      </Section>
      <Section>
        <Typography variant="label" group="navigation">
          Roles
        </Typography>
        {FAKE_AVAILABLE_ROLES.map((role) => (
          <Switch
            key={role}
            label={role}
            onChange={() => handleOnRoleToggle(role)}
          />
        ))}
      </Section>
      <Section>
        <Button variant="outlined" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleOnCreate} disabled={isCreateDisabled}>
          Create and impersonate
        </Button>
      </Section>
    </Container>
  );
};
