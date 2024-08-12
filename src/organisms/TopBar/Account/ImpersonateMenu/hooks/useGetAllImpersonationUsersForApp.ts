import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { GET_ALL_IMPERSONATIONS } from '../Impersonate.constants';
import { environment } from 'src/atoms';

const appName = environment.getAppName(import.meta.env.VITE_NAME);

export function useGetAllImpersonationUsersForApp() {
  return useQuery({
    queryKey: [GET_ALL_IMPERSONATIONS],
    queryFn: async () => {
      const all = await ImpersonateUserService.getApiV1ImpersonateUser();

      return all
        .filter((user) => user.appName === appName)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}
