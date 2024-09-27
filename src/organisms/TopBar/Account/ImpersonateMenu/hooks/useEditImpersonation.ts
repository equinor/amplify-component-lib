import {
  ImpersonateUserDto,
  ImpersonateUserService,
} from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_ALL_IMPERSONATIONS } from 'src/organisms/TopBar/Account/ImpersonateMenu/Impersonate.constants';

export function useEditImpersonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: ImpersonateUserDto) => {
      await ImpersonateUserService.putImpersonateUser(user);

      const previousData = queryClient.getQueryData<ImpersonateUserDto[]>([
        GET_ALL_IMPERSONATIONS,
      ]);
      const newData =
        previousData?.map((u) =>
          u.uniqueName === user.uniqueName ? user : u
        ) ?? [];
      queryClient.setQueryData([GET_ALL_IMPERSONATIONS], newData);
    },
  });
}
