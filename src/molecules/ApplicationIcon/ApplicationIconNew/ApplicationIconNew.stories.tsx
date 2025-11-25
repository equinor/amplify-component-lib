// ApplicationIconNew.stories.tsx

import React, { FC } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

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

export const TestRendersWithDefaultProps: StoryObj<typeof ApplicationIconNew> =
  {
    tags: ['test-only'],
    args: {
      name: 'amplify',
      size: 64,
      animationState: 'none',
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await expect(
        canvas.getByTestId('app-icon-container')
      ).toBeInTheDocument();
      await expect(canvas.getByTestId('icon-container')).toBeInTheDocument();
      await expect(canvas.getByTestId('waves-container')).toBeInTheDocument();
    },
  };

export const TestRendersCorrectIcon: StoryObj<typeof ApplicationIconNew> = {
  tags: ['test-only'],
  args: {
    name: 'embark',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('app-icon-svg')).toBeInTheDocument();
  },
};

export const TestUsesFallbackIcon: StoryObj<typeof ApplicationIconNew> = {
  tags: ['test-only'],
  args: {
    name: 'nonexistent',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('app-icon-svg')).toBeInTheDocument();
    await expect(canvas.getByTestId('app-icon-container')).toBeInTheDocument();
  },
};

export const TestRendersLargeIcon: StoryObj<typeof ApplicationIconNew> = {
  tags: ['test-only'],
  args: {
    name: 'embark',
    size: 256,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('app-icon-svg')).toBeInTheDocument();
  },
};

export const TestWorksWithOpacitySettings: StoryObj<typeof ApplicationIconNew> =
  {
    tags: ['test-only'],
    args: {
      name: 'bravos',
      size: 256,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const paths = canvas.getAllByTestId('app-icon-path');

      for (const path of paths) {
        await expect(path).toHaveAttribute('fill-opacity');
      }
    },
  };

export const TestIconOnlyProp: StoryObj<typeof ApplicationIconNew> = {
  tags: ['test-only'],
  args: {
    name: 'embark',
    size: 256,
    iconOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('app-icon-svg')).toBeInTheDocument();
    await expect(canvas.queryByTestId('wave')).not.toBeInTheDocument();
    await expect(
      canvas.queryByTestId('waves-container')
    ).not.toBeInTheDocument();
  },
};
