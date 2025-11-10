import { ReactElement, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Settings, SettingsProps } from './Settings';
import { colors, spacings } from 'src/atoms';

import { expect, fn, userEvent } from 'storybook/test';

export default {
  title: 'Organisms/TopBar/Settings',
  component: Settings,
  argTypes: {
    hasRightElements: { control: 'boolean' },
    hasColorBoxes: { control: 'boolean' },
    disabledItem: {
      control: 'select',
      options: ['fraction', 'decimal', 'light', 'dark'],
    },
  },
  args: { hasRightElements: true, hasColorBoxes: true, disabledItem: 'dark' },
} as Meta;

type Story = StoryObj<typeof Settings>;

export const Default: Story = {
  args: {
    allSettings: [
      {
        title: 'Section Mode',
        value: 'decimal',
        onChange: fn(),
        items: [
          {
            label: 'Fraction',
            name: 'sectionmode-group',
            value: 'fraction',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
          },
        ],
      },
      {
        title: 'Theme',
        value: 'light',
        onChange: fn(),
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
            colorBox: '#F7F7F7',
            disabled: true,
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'dark',
            colorBox: '#243746',
          },
        ],
      },
    ],
  },
  play: async ({ canvas }) => {
    const menuButton = await canvas.findByRole('button');
    await userEvent.click(menuButton);

    await expect(await canvas.findByText(/theme/i)).toBeVisible();
    const lightRadioButton = canvas.getByRole('radio', { name: /light mode/i });

    await expect(lightRadioButton).toBeChecked();
  },
};

export const Primary: StoryFn = (args) => {
  const [sectionMode, setSectionMode] = useState('decimal');
  const [theme, setTheme] = useState('light');

  const settingsOptions: SettingsProps = {
    allSettings: [
      {
        title: 'Section Mode',
        value: sectionMode,
        onChange: setSectionMode,
        items: [
          {
            label: 'Fraction',
            name: 'sectionmode-group',
            value: 'fraction',
            element: (args.hasRightElements as boolean)
              ? ('8½"' as unknown as ReactElement)
              : undefined,
            disabled: args.disabledItem === 'fraction',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
            element: args.hasRightElements
              ? ('8½"' as unknown as ReactElement)
              : undefined,
            disabled: args.disabledItem === 'decimal',
          },
        ],
      },
      {
        title: 'Theme',
        value: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
            colorBox: args.hasColorBoxes ? '#F7F7F7' : undefined,
            disabled: args.disabledItem === 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'dark',
            colorBox: args.hasColorBoxes ? '#243746' : undefined,
            disabled: args.disabledItem === 'dark',
          },
        ],
      },
    ],
  };

  return <Settings allSettings={settingsOptions.allSettings} />;
};

export const WithCustomContent: StoryFn = (args) => {
  const [sectionMode, setSectionMode] = useState('decimal');

  const settingsOptions: SettingsProps = {
    allSettings: [
      {
        title: 'Section Mode',
        value: sectionMode,
        onChange: setSectionMode,
        items: [
          {
            label: 'Fraction',
            name: 'sectionmode-group',
            value: 'fraction',
            element: (args.hasRightElements as boolean)
              ? ('8½"' as unknown as ReactElement)
              : undefined,
            disabled: args.disabledItem === 'fraction',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
            element: args.hasRightElements
              ? ('8½"' as unknown as ReactElement)
              : undefined,
            disabled: args.disabledItem === 'decimal',
          },
        ],
      },
    ],
  };

  return (
    <Settings allSettings={settingsOptions.allSettings}>
      <Typography
        variant="h1"
        style={{
          paddingLeft: spacings.medium,
          marginTop: spacings.large,
          background: colors.ui.background__info.rgba,
        }}
      >
        Custom content here!
      </Typography>
    </Settings>
  );
};
