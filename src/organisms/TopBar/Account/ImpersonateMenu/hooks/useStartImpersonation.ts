import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ACTIVE_USERIMPERSONATION,
  SET_ACTIVE_IMPERSONATION,
} from '../Impersonate.constants';
import { useSnackbar } from 'src/providers/SnackbarProvider/SnackbarProvider';

export function useStartImpersonation() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [SET_ACTIVE_IMPERSONATION],
    mutationFn: async (username: string) => {
      const user = await ImpersonateUserService.startImpersonating(username);
      queryClient.setQueryData([ACTIVE_USERIMPERSONATION], user);

      showSnackbar(`Set active user impersonation: ${user.name}`);
      return user;
    },
  });
}
