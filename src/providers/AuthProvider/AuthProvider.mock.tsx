import { fn, Mock } from '@storybook/test';

import * as actual from './AuthProvider';

export * from './AuthProvider';

export const useAuth: Mock<() => actual.AuthContextType> = fn(
  actual.useAuth
).mockName('AuthProvider::useAuth');
