import type { AuthContextType } from '../AuthProvider';

export function useAuth(): AuthContextType {
  return {
    account: undefined,
    photo: undefined,
    roles: undefined,
    logout: function (): void {
      throw new Error('Function not implemented.');
    },
    authState: 'loading',
  };
}
