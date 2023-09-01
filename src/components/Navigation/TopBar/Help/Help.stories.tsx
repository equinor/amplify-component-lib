import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import { FullPageSpinner, Unauthorized } from 'src/components/index';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { environment } from 'src/utils';

const { getClientId, getApiScope } = environment;
export default {
  title: 'Navigation/TopBar/Help',
  component: Help,
  argTypes: {
    applicationName: { control: 'text' },
  },
  args: {
    applicationName: 'test.com/',
  },
} as Meta;
export const Primary: StoryFn = (args) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        loadingComponent={<FullPageSpinner variant="equinor" withoutScrim />}
        unauthorizedComponent={<Unauthorized />}
        environments={{
          apiScope: getApiScope(''),
          clientId: getClientId(''),
        }}
        isMock={true}
      >
        <SnackbarProvider>
          <Help applicationName={args.applicationName} />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
