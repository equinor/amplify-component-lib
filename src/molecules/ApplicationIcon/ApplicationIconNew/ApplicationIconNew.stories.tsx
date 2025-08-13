// ApplicationIconNew.stories.tsx

import React, { FC } from 'react';

import { Meta } from '@storybook/react-vite';

import { ApplicationIconNew } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew';
import { APP_ICONS } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.constants';

const meta: Meta<typeof ApplicationIconNew> = {
  title: 'Molecules/ApplicationIcon/ApplicationIconNew',
  component: ApplicationIconNew,
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
};

export default meta;

const Template: FC<{ name: string }> = (args) => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    <ApplicationIconNew {...args} />
  </div>
);

export const Default = Template.bind({});

export const MultipleIcons: FC = (args) => (
  <>
    <h2>No animation</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {APP_ICONS.map((appName) => (
        <ApplicationIconNew key={appName} name={appName} size={64} {...args} />
      ))}
    </div>
    <h2>Hoverable</h2>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {APP_ICONS.map((appName) => (
        <ApplicationIconNew
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
        <ApplicationIconNew
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
