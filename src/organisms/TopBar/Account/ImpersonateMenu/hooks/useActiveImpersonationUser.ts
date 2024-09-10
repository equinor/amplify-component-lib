import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { ACTIVE_USERIMPERSONATION } from '../Impersonate.constants';

export function useActiveImpersonationUser() {
  return useQuery({
    queryKey: [ACTIVE_USERIMPERSONATION],
    queryFn: () => ImpersonateUserService.getActiveUser(),
  });
}
