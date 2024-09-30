import {
  ImpersonateUserDto,
  ImpersonateUserService,
} from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ACTIVE_USERIMPERSONATION,
  GET_ALL_IMPERSONATIONS,
} from '../Impersonate.constants';

export function useEditImpersonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: ImpersonateUserDto) => {
      await ImpersonateUserService.putImpersonateUser(user);

      const previousData = queryClient.getQueryData<ImpersonateUserDto[]>([
        GET_ALL_IMPERSONATIONS,
      ]);
      if (previousData) {
        const newData = previousData?.map((u) =>
          u.uniqueName === user.uniqueName ? user : u
        );
        queryClient.setQueryData([GET_ALL_IMPERSONATIONS], newData);
      }

      const previousActive = queryClient.getQueryData<
        ImpersonateUserDto | undefined
      >([ACTIVE_USERIMPERSONATION]);
      if (previousActive && previousActive.uniqueName === user.uniqueName) {
        queryClient.setQueryData([ACTIVE_USERIMPERSONATION], user);
      }
    },
  });
}
