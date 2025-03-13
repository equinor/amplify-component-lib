import { ApiError } from '@equinor/subsurface-app-management';
import { DefaultOptions } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      return (error as ApiError)?.status === 404 && failureCount <= 2;
    },
  },
};
