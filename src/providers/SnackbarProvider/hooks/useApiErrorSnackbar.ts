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
        if (error instanceof ApiError) {
          let message = error.message;
          if ('userMessage' in error.body) {
            message = error.body.userMessage;
          }
          showSnackbar({
            text: `${error.status}: ${message}`,
            variant: 'error',
          });
        }
      }
    }
  }, [failingQueries, isFetching, queryClient, showAPIErrors, showSnackbar]);
}
