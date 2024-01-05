import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PortalService } from '../../../../api/services/PortalService';
import ApplicationDrawer from './ApplicationDrawer';
import { decorator } from '../../../../../__mocks__/src/api/services/PortalService';

export default {
  title: 'Navigation/TopBar/ApplicationDrawer',
  component: ApplicationDrawer,
  // argTypes: { hasUnread: { control: 'boolean' } },
  // args: { hasUnread: true },

  decorators: [decorator],
} as Meta;

export const Primary: StoryFn = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationDrawer />
    </QueryClientProvider>
  );
};
