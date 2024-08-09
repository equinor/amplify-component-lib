import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { ACTIVE_USER_KEY } from '../Impersonate.constants';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';

export function useActiveImpersonationUser() {
  const { account } = useAuth();

  return useQuery({
    queryKey: [ACTIVE_USER_KEY],
    queryFn: () =>
      ImpersonateUserService.getActiveUserByUsername(account?.username),
  });
}
