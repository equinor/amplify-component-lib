import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';

import { Button, DotProgress, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_back } from '@equinor/eds-icons';
import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

import { useCreateImpersonation } from '../hooks/useCreateImpersonation';
import { useEditImpersonation } from '../hooks/useEditImpersonation';
import { Header } from '../Impersonate.styles';
import { Container, Section } from './CreateOrEditUser.styles';
import { Field } from 'src/atoms/types/Field';
import { environment } from 'src/atoms/utils/auth_environment';
import { ComboBox } from 'src/molecules/Select/ComboBox/ComboBox';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';
import { SingleSelect } from 'src/molecules/Select/SingleSelect/SingleSelect';
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
  const [field, setField] = useState<string | undefined>(undefined);
  const [well, setWell] = useState<string | undefined>(undefined);
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
            ?.name ?? undefined;
        setField(selectedField);
      }

      if (availableWells) {
        const selectedWell =
          availableWells.find((well) => well == editingUser.well) ?? undefined;
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

  const availableFieldItems: SelectOptionRequired[] =
    availableFields?.map((item) => ({
      value: item.uuid ?? '',
      label: item.name ?? '',
    })) ?? [];

  const availableWellItems: SelectOptionRequired[] =
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

  const handleOnFieldSelect = (selected: SelectOptionRequired | undefined) => {
    setField(selected?.value);
  };
  const handleOnWellSelect = (selected: SelectOptionRequired | undefined) => {
    setWell(selected?.value);
  };

  const handleOnCreateOrSave = async () => {
    if (editingUser) {
      await updateImpersonationUser({
        id: editingUser.id,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: email !== '' ? email : undefined,
        field,
        well,
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
        field,
        well,
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
        {availableFieldItems && availableFieldItems.length > 0 && (
          <SingleSelect
            placeholder="Select field..."
            label="Field"
            meta="Optional (For internal application role purposes)"
            value={availableFieldItems.find((item) => item.value === field)}
            onSelect={handleOnFieldSelect}
            items={availableFieldItems}
          />
        )}
        {availableWellItems && availableWellItems.length > 0 && (
          <SingleSelect
            label="Well"
            placeholder="Select well..."
            meta="Optional (For internal application role purposes)"
            value={availableWellItems.find((item) => item.value === well)}
            onSelect={handleOnWellSelect}
            items={availableWellItems}
          />
        )}
      </Section>

      <Section>
        <ComboBox
          label="Roles"
          placeholder="Select roles..."
          values={roles}
          onSelect={handleOnRoleSelect}
          items={availableRoles}
          loading={isLoadingRoles}
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
