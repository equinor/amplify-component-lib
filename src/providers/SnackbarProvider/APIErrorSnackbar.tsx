import { FC, ReactNode, useEffect, useRef } from 'react';

import { ApiError } from '@equinor/subsurface-app-management';
import { useQueryClient } from '@tanstack/react-query';

import { useSnackbar } from './SnackbarProvider';

interface APIErrorSnackbarProps {
  children: ReactNode;
}
export const APIErrorSnackbar: FC<APIErrorSnackbarProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const currentOptions = queryClient.getDefaultOptions();
      queryClient.setDefaultOptions({
        ...currentOptions,
        queries: {
          throwOnError: (error) => {
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
            return false;
          },
        },
        mutations: {
          throwOnError: (error) => {
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
            return false;
          },
        },
      });
    }
  }, [queryClient, showSnackbar]);

  return children;
};
