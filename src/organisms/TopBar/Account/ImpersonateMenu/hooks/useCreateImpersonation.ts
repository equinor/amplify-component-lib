import {
  ImpersonateUserDto,
  ImpersonateUserService,
  ImpersonateUserUpdateDto,
} from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStartImpersonation } from '../hooks/useStartImpersonation';
import {
  CREATE_IMPERSONATION,
  GET_ALL_IMPERSONATIONS,
  IMPERSONATE_QUERY_FILTER,
} from '../Impersonate.constants';

export function useCreateImpersonation() {
  const queryClient = useQueryClient();
  const { mutateAsync: startImpersonation } = useStartImpersonation();

  return useMutation({
    mutationKey: [CREATE_IMPERSONATION],
    mutationFn: async (user: ImpersonateUserUpdateDto) => {
      const newUser = await ImpersonateUserService.createImpersonateUser(user);
      queryClient.setQueryData(
        [GET_ALL_IMPERSONATIONS],
        (previousData: ImpersonateUserDto[]) => {
          return [...previousData, newUser];
        }
      );
      await startImpersonation(newUser.uniqueName);
      await queryClient.invalidateQueries(IMPERSONATE_QUERY_FILTER);

      return newUser;
    },
  });
}
