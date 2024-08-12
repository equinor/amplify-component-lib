import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { ACTIVE_USERIMPERSONATION } from '../Impersonate.constants';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

export function useActiveImpersonationUser() {
  const { account } = useAuth();

  return useQuery({
    queryKey: [ACTIVE_USERIMPERSONATION],
    queryFn: () =>
      ImpersonateUserService.getActiveUserByUsername(account?.username),
  });
}
