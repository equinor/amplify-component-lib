import { useState } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { RoleSyncNotifier } from 'src/providers/RoleSyncNotifier/RoleSyncNotifier';
import { SnackbarProvider } from 'src/providers/SnackbarProvider/SnackbarProvider';

import { mocked } from 'storybook/test';
import styled from 'styled-components';

const meta: Meta = {
  title: 'Providers/RoleSyncNotifier',
};

export default meta;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 16px;
`;

const INITIAL_ROLES = ['sam:read'];
const UPDATED_ROLES = ['sam:read', 'sam:leader'];

/**
 * Simulates what happens end-to-end when AccessIT grants/revokes a role
 * while the user already has an active session:
 * 1. Click "Simulate AccessIT role change" (stand-in for the periodic
 *    silent-token-refresh check in `AuthProvider` detecting drift).
 * 2. A Snackbar appears via `RoleSyncNotifier` prompting the user to refresh.
 * 3. Clicking "Refresh" in the Snackbar applies the new roles instantly, no
 *    reload/re-login required.
 */
export const Default: StoryFn = () => {
  const [roles, setRoles] = useState<string[]>(INITIAL_ROLES);
  const [pendingRoles, setPendingRoles] = useState<string[] | undefined>();

  // `useAuth` is globally auto-mocked in Storybook (see .storybook/preview.tsx),
  // so we drive it directly here instead of relying on a real AuthProvider.
  mocked(useAuth).mockReturnValue({
    account: undefined,
    photo: undefined,
    roles,
    logout: () => console.log('Logged out the user!'),
    authState: 'authorized',
    rolesOutdated: pendingRoles !== undefined,
    applyNewRoles: () => {
      if (pendingRoles) {
        setRoles(pendingRoles);
        setPendingRoles(undefined);
      }
    },
  });

  return (
    <SnackbarProvider>
      <Container>
        <Typography variant="h5">Current roles</Typography>
        <Typography>{roles.join(', ')}</Typography>
        <Button
          disabled={pendingRoles !== undefined}
          onClick={() => setPendingRoles(UPDATED_ROLES)}
        >
          Simulate AccessIT role change
        </Button>
        <RoleSyncNotifier />
      </Container>
    </SnackbarProvider>
  );
};
