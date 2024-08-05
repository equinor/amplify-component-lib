import { DefaultOptions } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  mutations: {
    onError: (error) => {
      console.error('[ACL - MutationError]', error);
    },
  },
};
