import {
  ApiError,
  ImpersonateUserService,
} from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { ACTIVE_USERIMPERSONATION } from '../Impersonate.constants';
import { environment } from 'src/atoms/utils/auth_environment';

export function useActiveImpersonationUser() {
  return useQuery({
    queryKey: [ACTIVE_USERIMPERSONATION],
    queryFn: async () => {
      try {
        const active = await ImpersonateUserService.getActiveUser();

        if (active === undefined) return null;

        return active;
      } catch (error) {
        if (
          error instanceof ApiError &&
          (error.status === 204 || error.status === 404)
        ) {
          return null;
        }
      }
    },
    enabled:
      environment.getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME) !==
      'production',
  });
}
