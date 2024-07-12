// ApplicationIcon.stories.tsx

import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import ApplicationIcon from './ApplicationIcon';
import { APP_ICONS } from './ApplicationIcon.constants';

export default {
  title: 'Molecules/ApplicationIcon',
  component: ApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: APP_ICONS,
    },
    animationState: {
      options: ['none', 'hoverable', 'animated', 'loading'],
      control: {
        type: 'radio',
      },
      name: 'Animation State',
      description: 'Set the animation state of the icon.',
      defaultValue: 'none',
    },
    size: { control: 'radio', options: [24, 32, 40, 48, 96, 128, 144, 256] },
  },
  args: {
    size: 96,
  },
} as Meta;

const Template: FC<{ name: string }> = (args) => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    <ApplicationIcon {...args} />
  </div>
);

export const Default = Template.bind({});

export const MultipleIcons: FC = (args) => (
  <>
    <h2>No animation</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {APP_ICONS.map((appName) => (
        <ApplicationIcon key={appName} name={appName} size={64} {...args} />
      ))}
    </div>
    <h2>Hoverable</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {APP_ICONS.map((appName) => (
        <ApplicationIcon
          key={appName}
          animationState="hoverable"
          name={appName}
          size={64}
          {...args}
        />
      ))}
    </div>
    <h2>Animated</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {APP_ICONS.map((appName) => (
        <ApplicationIcon
          key={appName}
          animationState="animated"
          name={appName}
          size={64}
          {...args}
        />
      ))}
    </div>
  </>
);
