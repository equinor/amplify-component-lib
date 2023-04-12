import React from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import {
  account_circle,
  car,
  dashboard,
  history,
  home,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Meta, Story } from '@storybook/react';

import ApplicationIcon, {
  ApplicationName,
} from '../../Icons/ApplicationIcon/ApplicationIcon';
import { EnvironmentType } from './TopBar';
import TopBar from '.';

const { colors } = tokens;

const icons = [car, dashboard, history, home];
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
        '4dinsight',
        'acquire',
        'dasha',
        'depth-conversion',
        'recap',
        'portal',
        'pwex',
        'logging-qualification',
      ],
    },
    applicationName: { control: 'text' },
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
} as Meta;

export const Primary: Story = ({ ...args }) => {
  return (
    <TopBar
      onHeaderClick={() => console.log('Going to homepage 🏠')}
      applicationIcon={
        args.customIcon !== 'none' ? (
          <Icon
            color={colors.interactive.primary__resting.hsla}
            data={icons.find((item) => item.name === args.customIcon)}
          />
        ) : (
          <ApplicationIcon
            name={args.applicationIcon as ApplicationName}
            size={40}
          />
        )
      }
      capitalize={args.capitalized}
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
