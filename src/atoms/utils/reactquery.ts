import { ApiError } from '@equinor/subsurface-app-management';
import { DefaultOptions } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      return (error as ApiError)?.status !== 404 && failureCount <= 2;
    },
  },
};
