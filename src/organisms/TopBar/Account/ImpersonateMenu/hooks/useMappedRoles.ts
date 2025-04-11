import { useMemo } from 'react';

import { useAllAppRoles } from './useAllAppRoles';

export function useMappedRoles(roles: string[], enabled = true) {
  const { data: allAppRoles = [] } = useAllAppRoles(enabled);

  return useMemo(() => {
    return roles.toSorted().map((role) => {
      const currentRole = allAppRoles.find((item) => item.value === role);

      if (currentRole)
        return { value: currentRole.value, label: currentRole.displayName };

      return {
        value: role,
        label: role,
      };
    });
  }, [allAppRoles, roles]);
}
