import React from 'react';

import { dashboard, favorite_outlined, history } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import SideBarProvider from '../../../providers/SideBarProvider';
import Template from '../../Template/Template';
import SideBar from '../SideBar';
import { MenuItemType } from '../SideBar/MenuItem';
import TopBar from '.';
import {
  FAKE_ACCOUNT,
  FAKE_ACCOUNT_PHOTO,
} from 'src/components/Navigation/TopBar/Account/stories/data';
import { EnvironmentType } from 'src/types/Environment';

export default {
  title: 'Navigation/TopBar/TopBar',
  component: TopBar,
  argTypes: {
    customIcon: {
      control: 'select',
      options: ['none', 'car', 'dashboard', 'history', 'home'],
    },
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
        'logging-qualification',
        'inpress',
      ],
    },
    applicationName: {
      control: 'text',
    },
    isFetching: { control: 'boolean' },
    capitalized: { control: 'boolean' },
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
    customIcon: 'none',
    applicationIcon: 'portal',
    applicationName: 'Heinrich von schnellfahrer',
    capitalized: false,
    isFetching: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Primary: StoryFn = ({ ...args }) => {
  return (
    <TopBar
      onHeaderClick={() => console.log('Going to homepage 🏠')}
      capitalize={args.capitalized}
      applicationIcon={args.applicationIcon}
      applicationName={args.applicationName}
      isFetching={args.isFetching}
      environment={args.environment}
    >
      <TopBar.Actions>
        <TopBar.Account
          account={FAKE_ACCOUNT}
          photo={FAKE_ACCOUNT_PHOTO}
          roles={['Admin']}
          logout={() => console.log('logged out')}
        />
      </TopBar.Actions>
    </TopBar>
  );
};

export const FullPageExample: StoryFn = ({ ...args }) => {
  const menuItems: MenuItemType[] = [
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
    <Template>
      <TopBar
        onHeaderClick={() => console.log('Going to homepage')}
        capitalize={args.capitalized}
        applicationIcon={args.applicationIcon}
        applicationName={args.applicationName}
        isFetching={args.isFetching}
        environment={args.environment}
      >
        <TopBar.Actions>
          <TopBar.Account
            account={FAKE_ACCOUNT}
            photo={FAKE_ACCOUNT_PHOTO}
            roles={['Admin']}
            logout={() => console.log('logged out')}
          />
        </TopBar.Actions>
      </TopBar>
      <Template.Container>
        <SideBarProvider>
          <SideBar
            createLabel="Create something"
            onCreate={() => console.log('Created 🖋')}
          >
            {menuItems.map((m) => (
              <SideBar.Item
                key={m.name}
                {...m}
                disabled={
                  args.disabledItem !== 'none' && m.link === args.disabledItem
                }
              />
            ))}
          </SideBar>
        </SideBarProvider>
        <Template.Content $open={false}>
          <h1>Content goes here</h1>
        </Template.Content>
      </Template.Container>
    </Template>
  );
};
