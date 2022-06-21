import Guidelines, {
  IGuidelineProps,
  IGuidelineSections,
} from '../../components/Guidelines';
import { Story, Meta } from '@storybook/react';
import {
  account_circle,
  assignment,
  check,
  external_link,
  history,
  info_circle,
  minimize,
  notifications,
  settings,
} from '@equinor/eds-icons';

import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

export default {
  title: 'Guidelines',
  component: Guidelines,
} as Meta;

const sections: IGuidelineSections[] = [
  {
    sectionName: 'Top bar',
    items: [
      {
        title: 'Notifications',
        icon: notifications,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Guidelines',
        icon: info_circle,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Settings',
        icon: settings,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Account',
        icon: account_circle,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
  {
    sectionName: 'Status',
    items: [
      {
        title: 'Yes',
        icon: check,
        color: '#77ff72',
      },
      {
        title: 'No',
        icon: minimize,
        color: '#ff8484',
      },
    ],
  },
  {
    sectionName: 'Navigation Rail',
    items: [
      {
        title: 'Report',
        icon: assignment,
        color: '#ff8484',
        colorBox: '#ff8484',
      },
      {
        title: 'History',
        icon: history,
        color: '#7a7bce',
        colorBox: '#7a7bce',
      },
      {
        title: 'Links',
        icon: external_link,
        color: '#77ff72',
        colorBox: '#77ff72',
      },
    ],
  },
];
export const Primary: Story<IGuidelineProps> = () => {
  return (
    <Guidelines
      open
      sections={sections.slice(0, 1)}
      onClose={() => console.log('closing guidelines.')}
    />
  );
};

export const WithDifferentIconColors: Story<IGuidelineProps> = () => {
  return (
    <Guidelines
      open
      sections={sections.slice(0, 2)}
      onClose={() => console.log('closing guidelines.')}
    />
  );
};

export const WithColorBox: Story<IGuidelineProps> = () => {
  return (
    <Guidelines
      open
      sections={sections}
      onClose={() => console.log('closing guidelines.')}
    />
  );
};
