import {
  ImpersonateUserDto,
  ImpersonateUserService,
} from '@equinor/subsurface-app-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_ALL_IMPERSONATIONS } from '../Impersonate.constants';

export function useDeleteImpersonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: ImpersonateUserDto) => {
      if (user.id) {
        const response = await ImpersonateUserService.deleteImpersonationUser(
          user.id
        );

        const previousData = queryClient.getQueryData<ImpersonateUserDto[]>([
          GET_ALL_IMPERSONATIONS,
        ]);
        const index = previousData?.findIndex((u) => u.id === user.id);
        if (index !== undefined && index >= 0 && previousData) {
          const newData = [...previousData];
          newData.splice(index, 1);
          queryClient.setQueryData([GET_ALL_IMPERSONATIONS], newData);
        }
        return response;
      }
    },
  });
}
