import { faker } from '@faker-js/faker';

import { fn } from 'storybook/test';

export function useAuth() {
  const name = faker.person.fullName();
  const username = `${name.replaceAll(' ', '.').toLowerCase()}@equinor.com`;
  return {
    account: {
      name,
      homeAccountId: '',
      environment: '',
      tenantId: '',
      username,
      localAccountId: '',
    },
    roles: Array.from({ length: 2 })
      .fill(0)
      .map(() => faker.animal.dog()),
    photo: undefined,
    logout: fn(),
    authState: 'authorized',
  };
}

export function AuthProvider({ children }) {
  return children;
}
