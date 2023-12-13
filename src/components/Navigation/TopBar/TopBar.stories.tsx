import React from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import {
  account_circle,
  dashboard,
  favorite_outlined,
  history,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Meta, StoryFn } from '@storybook/react';

import SideBarProvider from '../../../providers/SideBarProvider';
import Template from '../../Template/Template';
import SideBar from '../SideBar';
import { MenuItemType } from '../SideBar/MenuItem';
import { EnvironmentType } from './TopBar';
import TopBar from '.';

const { colors } = tokens;

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
        <Button variant="ghost_icon" key="account">
          <Icon
            data={account_circle}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
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
          <Button variant="ghost_icon" key="account">
            <Icon
              data={account_circle}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </Button>
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
