import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { CAN_IMPERSONATE } from '../Impersonate.constants';

export function useCanImpersonate() {
  return useQuery({
    queryKey: [CAN_IMPERSONATE],
    queryFn: () => ImpersonateUserService.canImpersonate(),
  });
}
