import { useEffect, useRef } from 'react';

import { ApiError } from '@equinor/subsurface-app-management';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';

import {
  ShowSnackbar,
  ShowSnackbarSettings,
} from 'src/providers/SnackbarProvider/SnackbarProvider';

interface UseApiErrorSnackbarArgs {
  showAPIErrors: boolean;
  showSnackbar: (
    text: string | ShowSnackbar,
    props?: ShowSnackbarSettings
  ) => void;
}

export function useApiErrorSnackbar({
  showAPIErrors,
  showSnackbar,
}: UseApiErrorSnackbarArgs) {
  const isFetching = useIsFetching() > 0;
  const queryClient = useQueryClient();
  const failingQueries = queryClient.getQueryCache().findAll({
    predicate: (query) => {
      return query.state.error !== null;
    },
  });
  const shownErrors = useRef<string[]>([]);

  useEffect(() => {
    if (showAPIErrors && !isFetching) {
      const newFailingQueries = failingQueries.filter((query) => {
        return !shownErrors.current.includes(query.queryHash);
      });
      for (const query of newFailingQueries) {
        shownErrors.current.push(query.queryHash);
        const error = query.state.error;
        if (
          typeof error === 'object' &&
          error &&
          'name' in error &&
          error.name === 'ApiError'
        ) {
          const typedError = error as ApiError;
          let message = typedError.message;
          if ('body' in typedError && typedError.body) {
            if (
              typeof typedError.body === 'object' &&
              'userMessage' in typedError.body &&
              typeof typedError.body.userMessage === 'string'
            ) {
              message = typedError.body.userMessage;
            }

            if (typeof typedError.body === 'string') {
              message = typedError.body;
            }
          }
          showSnackbar({
            text: `${typedError.status}: ${message}`,
            variant: 'error',
          });
        }
      }
    }
  }, [failingQueries, isFetching, queryClient, showAPIErrors, showSnackbar]);
}
