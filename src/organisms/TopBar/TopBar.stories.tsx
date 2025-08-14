import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { TopBar, TopBarType } from '.';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBar } from 'src/organisms/SideBar';
import { Template } from 'src/organisms/Template/Template';
import { ReleaseNotesProvider } from 'src/providers';
import { SideBarProvider } from 'src/providers/SideBarProvider';

const meta: Meta<typeof TopBar> = {
  title: 'Organisms/TopBar/TopBar',
  component: TopBar,
  argTypes: {
    applicationIcon: {
      control: 'select',
      options: [
        'fallback',
        '4dinsight',
        'acquire',
        'dasha',
        'depth-conversion',
        'recap',
        'portal',
        'pwex',
        'ltg',
        'inpress',
      ],
    },
    applicationName: {
      control: 'text',
    },
    isFetching: { control: 'boolean' },
    capitalize: { control: 'boolean' },
    environment: {
      options: [
        EnvironmentType.LOCALHOST,
        EnvironmentType.DEVELOP,
        EnvironmentType.STAGING,
        EnvironmentType.PRODUCTION,
        undefined,
      ],
      control: { type: 'radio' },
    },
  },
  args: {
    applicationIcon: 'portal',
    applicationName: 'Heinrich von schnellfahrer',
    capitalize: false,
    isFetching: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (StoryFn) => (
    <MemoryRouter>
      <StoryFn />
    </MemoryRouter>
  ),
};

export default meta;

export const Primary: StoryFn<TopBarType> = ({ ...args }) => {
  return (
    <TopBar
      onHeaderClick={() => console.log('Going to homepage 🏠')}
      capitalize={args.capitalize}
      applicationIcon={args.applicationIcon}
      applicationName={args.applicationName}
      isFetching={args.isFetching}
      environment={args.environment}
    >
      <TopBar.Actions>
        <TopBar.Account />
      </TopBar.Actions>
    </TopBar>
  );
};

export const FullPageExample: StoryFn<TopBarType> = ({ ...args }) => {
  const menuItems: SideBarMenuItem[] = [
    {
      name: 'Dashboard',
      icon: dashboard,
      link: 'dashboard',
      onClick: () => console.log('going to dashboard...'),
    },
    {
      name: 'history',
      icon: history,
      link: 'history',
      onClick: () => console.log('going to history...'),
    },
    {
      name: 'favourites',
      icon: favorite_outlined,
      link: 'favourites',
      onClick: () => console.log('going to favourites...'),
    },
  ];
  return (
    <ReleaseNotesProvider>
      <Template>
        <TopBar
          onHeaderClick={() => console.log('Going to homepage')}
          capitalize={args.capitalize}
          applicationIcon={args.applicationIcon}
          applicationName={args.applicationName}
          isFetching={args.isFetching}
          environment={args.environment}
        >
          <TopBar.Actions>
            <TopBar.Account />
            <TopBar.Guidelines sections={[]} />
            <TopBar.Resources />
          </TopBar.Actions>
        </TopBar>
        <Template.Container>
          <SideBarProvider>
            <SideBar
              createLabel="Create something"
              onCreate={() => console.log('Created 🖋')}
            >
              {menuItems.map((m, index) => (
                <SideBar.Item key={m.name} {...m} disabled={index === 0} />
              ))}
            </SideBar>
          </SideBarProvider>
          <Template.Content $open={false}>
            <h1>Content goes here</h1>
          </Template.Content>
        </Template.Container>
      </Template>
    </ReleaseNotesProvider>
  );
};
