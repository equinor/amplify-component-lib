import React from 'react';

import { dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { TopBar, TopBarType } from '.';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { SideBarMenuItem } from 'src/atoms/types/SideBar';
import { SideBar } from 'src/organisms/SideBar';
import { Template } from 'src/organisms/Template/Template';
import { TopBarBaseProps } from 'src/organisms/TopBar/TopBar';
import { ReleaseNotesProvider } from 'src/providers';
import { SideBarProvider } from 'src/providers/SideBarProvider';

import { expect } from 'storybook/test';

function StoryComponent(args: TopBarBaseProps) {
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
}

const meta: Meta<typeof TopBar> = {
  title: 'Organisms/TopBar/TopBar',
  component: StoryComponent,
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
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Primary: Story = {};

export const Localhost: Story = {
  args: {
    environment: EnvironmentType.LOCALHOST,
  },
  play: async ({ canvas }) => {
    const envBadge = await canvas.findByText(/localhost/i);
    await expect(envBadge).toBeInTheDocument();
  },
};
export const Dev: Story = {
  args: {
    environment: EnvironmentType.DEVELOP,
  },
  play: async ({ canvas }) => {
    const envBadge = await canvas.findByText(/develop/i);
    await expect(envBadge).toBeInTheDocument();
  },
};
export const Staging: Story = {
  args: {
    environment: EnvironmentType.STAGING,
  },
  play: async ({ canvas }) => {
    const envBadge = await canvas.findByText(/staging/i);
    await expect(envBadge).toBeInTheDocument();
  },
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
