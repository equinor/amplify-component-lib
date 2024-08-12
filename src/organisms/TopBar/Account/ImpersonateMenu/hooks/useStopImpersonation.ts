import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ACTIVE_USERIMPERSONATION,
  STOP_IMPERSONATION,
} from '../Impersonate.constants';

export function useStopImpersonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STOP_IMPERSONATION],
    mutationFn: async () => {
      await ImpersonateUserService.stopImpersonating();
      queryClient.setQueryData([ACTIVE_USERIMPERSONATION], null);
    },
  });
}
