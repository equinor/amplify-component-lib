import { ImpersonateUserService } from '@equinor/subsurface-app-management';
import { useQuery } from '@tanstack/react-query';

import { CAN_IMPERSONATE } from '../Impersonate.constants';
import { environment } from 'src/atoms/utils/auth_environment';

export function useCanImpersonate() {
  return useQuery({
    queryKey: [CAN_IMPERSONATE],
    queryFn: () => ImpersonateUserService.canImpersonate(),
    enabled:
      environment.getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME) !==
      'production',
  });
}
