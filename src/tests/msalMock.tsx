import { ReactElement } from 'react';

import { AccountInfo } from '@azure/msal-browser';

vi.mock('@azure/msal-react', () => ({
  MsalProvider: (children: ReactElement) => <div>{children}</div>,
}));

vi.mock('@azure/msal-browser', () => {
  return {
    PublicClientApplication: class PublicClientApplication {
      constructor() {
        return;
      }
    },
    AccountInfo: { username: 'mock' } as AccountInfo,
  };
});
