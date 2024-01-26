import { MemoryRouter } from 'react-router';

import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Help } from './Help';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from 'src/providers';

export default {
  title: 'Navigation/TopBar/Help',
  component: Help,
  argTypes: {
    hideFeedback: { control: 'boolean' },
    hideReleaseNotes: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description:
        'You can import HelpMenuItem to use as one or more children to get a similar look to existing menu items',
    },
    field: {
      description: 'The field prop is used as metadata on feedback reports',
    },
  },
  args: {
    hideFeedback: false,
    hideReleaseNotes: false,
    children: 'Custom child, no style',
  },
} as Meta;

export const Primary: StoryFn = (args) => {
  const queryClient = new QueryClient();

  const onClick = () => {
    console.log('hello');
  };

  const tutorialOptions = [
    {
      description: 'lorem',
      duration: '2 min ',
      steps: 'Step by Step',
      pathName: 'search',
      onClick: onClick,
    },
    {
      description: 'lorem 2 ',
      duration: '2 min ',
      pathName: 'search',
      steps: 'Step by Step',

      onClick: onClick,
    },
    {
      description: 'lorem 3 ',
      duration: '2 min ',
      steps: 'Step by Step',
      pathName: 'test',

      onClick: onClick,
    },
    {
      description: 'lorem 4 ',
      duration: '2 min ',
      steps: 'Step by Step',
      pathName: 'search',

      onClick: onClick,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <SnackbarProvider>
          <ReleaseNotesProvider>
            <MemoryRouter initialEntries={['/']}>
              <Help tutorialOptions={tutorialOptions} {...args}></Help>
            </MemoryRouter>
          </ReleaseNotesProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
