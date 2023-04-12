import { useState } from 'react';

import { tokens } from '@equinor/eds-tokens';
import { Meta, Story } from '@storybook/react';

import { ISettingsProps, Settings } from './Settings';

const { colors } = tokens;

export default {
  title: 'Navigation/TopBar/Settings',
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

export const Primary: Story = (args) => {
  const [sectionMode, setSectionMode] = useState('decimal');
  const [theme, setTheme] = useState('light');

  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Section Mode',
        type: sectionMode,
        onChange: setSectionMode,
        items: [
          {
            label: 'Fraction',
            name: 'sectionmode-group',
            value: 'fraction',
            element: args.hasRightElements && '8½"',
            disabled: args.disabledItem === 'fraction',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
            element: args.hasRightElements && '8.5"',
            disabled: args.disabledItem === 'decimal',
          },
        ],
      },
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
            colorBox: args.hasColorBoxes && colors.ui.background__default.hsla,
            disabled: args.disabledItem === 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'dark',
            colorBox: args.hasColorBoxes && colors.ui.background__overlay.hsla,
            disabled: args.disabledItem === 'dark',
          },
        ],
      },
    ],
  };

  return <Settings allSettings={settingsOptions.allSettings} />;
};
