import {
  ImpersonateUser,
  ImpersonateUserService,
} from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStartImpersonation } from '../hooks/useStartImpersonation';
import {
  CREATE_IMPERSONATION,
  GET_ALL_IMPERSONATIONS,
} from '../Impersonate.constants';

export function useCreateImpersonation() {
  const queryClient = useQueryClient();
  const { mutateAsync: startImpersonation } = useStartImpersonation();

  return useMutation({
    mutationKey: [CREATE_IMPERSONATION],
    mutationFn: async (user: ImpersonateUser) => {
      const newUser = await ImpersonateUserService.createImpersonateUser(user);
      queryClient.setQueryData(
        [GET_ALL_IMPERSONATIONS],
        (previousData: ImpersonateUser[]) => {
          return [...previousData, newUser];
        }
      );
      await startImpersonation(newUser.uniqueName);

      return newUser;
    },
  });
}
