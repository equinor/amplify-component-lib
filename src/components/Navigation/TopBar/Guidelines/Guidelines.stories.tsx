import {
  account_circle,
  assignment,
  check,
  external_link,
  history,
  info_circle,
  minimize,
  notifications,
  placeholder_icon,
  settings,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Meta, StoryFn } from '@storybook/react';

import { amplify_wellbore } from 'src/components/Icons/AmplifyIcons';
import {
  Guidelines,
  GuidelineSections,
} from 'src/components/Navigation/TopBar/Guidelines/Guidelines';

const { colors } = tokens;

export default {
  title: 'Navigation/TopBar/Guidelines',
  component: Guidelines,
  argTypes: { haveColorBoxes: { controls: 'boolean' } },
  args: { haveColorBoxes: true },
} as Meta;

export const Primary: StoryFn = (args) => {
  const sections: GuidelineSections[] = [
    {
      sectionName: 'Top bar',
      items: [
        {
          title: 'Notifications',
          icon: notifications,
          color: colors.interactive.primary__resting.hex,
        },
        {
          title: 'Feedback',
          icon: placeholder_icon,
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
          colorBox: args.haveColorBoxes && '#ff8484',
        },
        {
          title: 'History',
          icon: history,
          color: '#7a7bce',
          colorBox: args.haveColorBoxes && '#7a7bce',
        },
        {
          title: 'Links',
          icon: external_link,
          color: '#77ff72',
          colorBox: args.haveColorBoxes && '#77ff72',
        },
        {
          title: 'Wellbore',
          icon: amplify_wellbore,
          color: '#ce72ff',
          colorBox: args.haveColorBoxes && '#ce72ff',
        },
      ],
    },
  ];
  return (
    <Guidelines
      open
      sections={sections}
      onClose={() => console.log('closing guidelines.')}
    />
  );
};
