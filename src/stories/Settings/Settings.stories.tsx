import { Story, Meta } from '@storybook/react';
import TopBar, { ISettingsProps } from '../../components/TopBar';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';

const { colors } = tokens;

export default {
  title: 'Settings',
  component: TopBar.Settings,
} as Meta;

export const Primary: Story<ISettingsProps> = () => {
  const [sectionMode, setSectionMode] = useState('decimal');

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
            element: '8½"',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
            element: '8.5"',
          },
        ],
      },
    ],
  };

  return <TopBar.Settings allSettings={settingsOptions.allSettings} />;
};

export const WithColorBox: Story<ISettingsProps> = () => {
  const [theme, setTheme] = useState('light');
  const [sectionMode, setSectionMode] = useState('decimal');

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
            element: '8½',
          },
          {
            label: 'Decimal',
            name: 'sectionmode-group',
            value: 'decimal',
            element: '8.5',
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
            colorBox: colors.ui.background__default.hsla,
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'light',
            colorBox: colors.ui.background__overlay.hsla,
          },
        ],
      },
    ],
  };

  return <TopBar.Settings allSettings={settingsOptions.allSettings} />;
};
