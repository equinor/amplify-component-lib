// ApplicationIcon.stories.tsx

import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import NewApplicationIcon from './NewApplicationIcon';

export default {
  title: 'Icons/NewApplicationIcon',
  component: NewApplicationIcon,
  argTypes: {
    name: {
      control: 'radio',
      options: [
        'fallback',
        'amplify',
        'embark',
        'premo',
        'dasha',
        'orca',
        'acquire',
        'pwex',
        'ltg',
        'equinor',
      ],
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
    <NewApplicationIcon {...args} />
  </div>
);

export const Default = Template.bind({});

export const MultipleIcons: FC = (args) => (
  <>
    <h2>No animation</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {[
        'fallback',
        'amplify',
        'embark',
        'premo',
        'dasha',
        'orca',
        'acquire',
        'pwex',
        'ltg',
        'equinor',
      ].map((appName) => (
        <NewApplicationIcon key={appName} name={appName} size={64} {...args} />
      ))}
    </div>
    <h2>Hoverable</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {[
        'fallback',
        'amplify',
        'embark',
        'premo',
        'dasha',
        'orca',
        'acquire',
        'pwex',
        'ltg',
        'equinor',
      ].map((appName) => (
        <NewApplicationIcon
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
      {[
        'fallback',
        'amplify',
        'embark',
        'premo',
        'dasha',
        'orca',
        'acquire',
        'pwex',
        'ltg',
        'equinor',
      ].map((appName) => (
        <NewApplicationIcon
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
