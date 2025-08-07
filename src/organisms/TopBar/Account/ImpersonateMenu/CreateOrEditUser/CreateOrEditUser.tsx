import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';

import { Button, DotProgress, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_back } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useCreateImpersonation } from '../hooks/useCreateImpersonation';
import { useEditImpersonation } from '../hooks/useEditImpersonation';
import { Header } from '../Impersonate.styles';
import { Container, Section } from './CreateOrEditUser.styles';
import { Field } from 'src/atoms';
import { environment } from 'src/atoms/utils/auth_environment';
import {
  ComboBox,
  SelectOption,
  SelectOptionRequired,
  SingleSelect,
} from 'src/molecules';
import { TextField } from 'src/molecules/TextField/TextField';
import { useAllAppRoles } from 'src/organisms/TopBar/Account/ImpersonateMenu/hooks/useAllAppRoles';

interface CreateOrEditUserProps {
  editingUser?: ImpersonateUserDto;
  onBack: () => void;
  availableFields?: Field[];
  availableWells?: string[];
}

export const CreateOrEditUser: FC<CreateOrEditUserProps> = ({
  editingUser,
  onBack,
  availableFields,
  availableWells,
}) => {
  const initializedEditUser = useRef<boolean>(false);
  const [roles, setRoles] = useState<SelectOptionRequired[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState('');
  const [well, setWell] = useState('');
  const { data, isLoading: isLoadingRoles } = useAllAppRoles();

  useEffect(() => {
    if (editingUser && data && !initializedEditUser.current) {
      initializedEditUser.current = true;
      setRoles(
        editingUser.roles.map((role) => {
          const mapped = data.find((item) => item.value === role);
          if (mapped) return { value: role, label: mapped.displayName };
          return { value: role, label: role };
        })
      );

      if (availableFields) {
        const selectedField =
          availableFields.find((field) => field.uuid == editingUser.field)
            ?.name ?? '';
        setField(selectedField);
      }

      if (availableWells) {
        const selectedWell =
          availableWells.find((well) => well == editingUser.well) ?? '';
        setWell(selectedWell);
      }

      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email ?? '');
    }
  }, [data, editingUser, initializedEditUser, availableFields, availableWells]);

  const availableRoles = useMemo(
    () =>
      data?.map((item) => ({ value: item.value, label: item.displayName })) ??
      [],
    [data]
  );

  const avaiableFieldsSelect: { value: string; label: string }[] =
    availableFields?.map((item) => ({
      value: item.uuid ?? '',
      label: item.name ?? '',
    })) ?? [];

  const avaiableWellsSelect: { value: string; label: string }[] =
    availableWells?.map((item) => ({ value: item, label: item })) ?? [];

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

  const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleOnRoleSelect = (values: SelectOptionRequired[]) => {
    setRoles(values);
  };

  const handleOnFieldSelect = (
    selected: SelectOption<{ value: string; label: string }> | undefined
  ) => {
    setField(selected?.value ?? '');
  };
  const handleOnWellSelect = (
    selected: SelectOption<{ value: string; label: string }> | undefined
  ) => {
    setWell(selected?.value ?? '');
  };

  const handleOnCreateOrSave = async () => {
    if (editingUser) {
      await updateImpersonationUser({
        id: editingUser.id,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: email !== '' ? email : undefined,
        field: field !== '' ? field : undefined,
        well: well !== '' ? well : undefined,
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
        email: email !== '' ? email : undefined,
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
        <TextField
          id="email"
          label="E-mail"
          placeholder="Add e-mail..."
          meta="Optional"
          value={email}
          onChange={handleOnEmailChange}
        />
      </Section>

      <Section>
        {avaiableFieldsSelect && (
          <>
            <Typography variant="label" group="navigation">
              Field
            </Typography>
            <SingleSelect
              placeholder="Select field..."
              meta="Optional (For internal application role purposes)"
              value={
                avaiableFieldsSelect.find((item) => item.value === field)
                  ? { value: field, label: field }
                  : undefined
              }
              onSelect={handleOnFieldSelect}
              items={avaiableFieldsSelect}
            />
          </>
        )}
        {avaiableWellsSelect && (
          <>
            <Typography variant="label" group="navigation">
              Well
            </Typography>
            <SingleSelect
              placeholder="Select well..."
              meta="Optional (For internal application role purposes)"
              value={
                avaiableWellsSelect.find((item) => item.value === well)
                  ? { value: field, label: field }
                  : undefined
              }
              onSelect={handleOnWellSelect}
              items={avaiableWellsSelect}
            />
          </>
        )}
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
