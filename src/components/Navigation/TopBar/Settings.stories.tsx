import { ReactElement, useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { ISettingsProps, Settings } from './Settings';

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

export const Primary: StoryFn = (args) => {
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
        type: theme,
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
