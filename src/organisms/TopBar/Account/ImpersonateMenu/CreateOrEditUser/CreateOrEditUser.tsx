import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';

import { Button, DotProgress, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_back } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useAllAppRoles } from '../hooks/useAllAppRoles';
import { useCreateImpersonation } from '../hooks/useCreateImpersonation';
import { useEditImpersonation } from '../hooks/useEditImpersonation';
import { Header } from '../Impersonate.styles';
import { Container, Section } from './CreateOrEditUser.styles';
import { usePrevious } from 'src/atoms/hooks/usePrevious';
import { environment } from 'src/atoms/utils/auth_environment';
import { ComboBox, SelectOptionRequired } from 'src/molecules';
import { TextField } from 'src/molecules/TextField/TextField';

interface CreateOrEditUserProps {
  editingUser?: ImpersonateUserDto;
  onBack: () => void;
}

export const CreateOrEditUser: FC<CreateOrEditUserProps> = ({
  editingUser,
  onBack,
}) => {
  const previousEditingUser = usePrevious(editingUser);
  const [roles, setRoles] = useState<SelectOptionRequired[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { data, isLoading: isLoadingRoles } = useAllAppRoles();

  useEffect(() => {
    if (
      editingUser &&
      (previousEditingUser === undefined ||
        previousEditingUser.uniqueName !== editingUser.uniqueName)
    ) {
      setRoles(editingUser.roles.map((role) => ({ value: role, label: role })));
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
    }
  }, [editingUser, previousEditingUser]);

  const availableRoles = useMemo(
    () =>
      data?.map((item) => ({
        value: item.value,
        label: item.value,
      })) ?? [],
    [data]
  );

  const { mutateAsync: createImpersonationUser, isPending: isCreating } =
    useCreateImpersonation();
  const { mutateAsync: updateImpersonationUser, isPending: isSaving } =
    useEditImpersonation();
  const isPending = isCreating || isSaving;

  const isCreateOrSaveDisabled = useMemo(
    () => firstName === '' || lastName === '' || roles.length === 0,
    [firstName, lastName, roles.length]
  );

  const handleOnFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleOnLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleOnRoleSelect = (values: SelectOptionRequired[]) => {
    setRoles(values);
  };

  const handleOnCreateOrSave = async () => {
    if (editingUser) {
      await updateImpersonationUser({
        id: editingUser.id,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        roles: roles.map((role) => role.value).sort(),
        uniqueName: editingUser.uniqueName,
        appName: editingUser.appName,
        activeUsers: [],
      });
      onBack();
    } else {
      await createImpersonationUser({
        firstName,
        lastName,
        roles: roles.map((role) => role.value).sort(),
        uniqueName: `${firstName}.${lastName}`.toLowerCase(),
        appName: environment.getAppName(import.meta.env.VITE_NAME),
        activeUsers: [],
      });
      onBack();
    }
  };

  return (
    <Container>
      <Header>
        <Button variant="ghost_icon" onClick={onBack}>
          <Icon data={arrow_back} />
        </Button>
        <Typography variant="h6">
          {editingUser ? 'Edit user' : 'Create new user'}
        </Typography>
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
        {isLoadingRoles && <DotProgress color="primary" />}
        <ComboBox
          placeholder="Select roles..."
          values={roles}
          onSelect={handleOnRoleSelect}
          items={availableRoles}
        />
      </Section>
      <Section>
        <Button variant="outlined" onClick={onBack}>
          Cancel
        </Button>
        {isPending ? (
          <Button>
            <DotProgress />
          </Button>
        ) : (
          <Button
            onClick={handleOnCreateOrSave}
            disabled={isCreateOrSaveDisabled}
          >
            {editingUser ? 'Save' : 'Create'}
          </Button>
        )}
      </Section>
    </Container>
  );
};
