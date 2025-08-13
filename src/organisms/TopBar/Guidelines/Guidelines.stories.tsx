import {
  account_circle,
  dashboard,
  info_circle,
  list,
  platform,
  settings,
  star_outlined,
  time,
  view_module,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Guidelines } from '.';

const { colors } = tokens;

export default {
  title: 'Organisms/TopBar/Guidelines',
  component: Guidelines,
} as Meta;

import { GuidelineSections } from './Guidelines';

const sections: GuidelineSections[] = [
  {
    sectionName: 'Top bar',
    items: [
      {
        title: 'Field Selector',
        icon: platform,
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
    sectionName: 'Data display',
    items: [
      {
        title: 'Grid View',
        icon: view_module,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'List View',
        icon: list,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
  {
    sectionName: 'Navigation rail',
    items: [
      {
        title: 'Dashboard',
        icon: dashboard,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Recently Updated',
        icon: time,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Favourites',
        icon: star_outlined,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
];

export const Primary: StoryFn = () => {
  return <Guidelines sections={sections} />;
};
