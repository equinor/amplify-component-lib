import { DefaultOptions } from '@tanstack/react-query';

const defaultQueryOptions: DefaultOptions = {
  mutations: {
    onError: (error) => {
      console.error('[ACL - MutationError]', error);
    },
  },
};

export const reactquery = {
  defaultQueryOptions,
};
