import { Icon } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import {
  amplify_failure,
  amplify_lwd,
  amplify_success,
  amplify_wellbore,
  amplify_wireline_cased_hole,
  amplify_wireline_open_hole,
} from './AmplifyIcons';

const allIcons = {
  amplify_wellbore: amplify_wellbore,
  amplify_wireline_open_hole: amplify_wireline_open_hole,
  amplify_wireline_cased_hole: amplify_wireline_cased_hole,
  amplify_lwd: amplify_lwd,
  amplify_success: amplify_success,
  amplify_failure: amplify_failure,
};

interface StoryFnProps {
  data: string;
  size: 16 | 18 | 24 | 32 | 40 | 48 | undefined;
  color?: string;
  rotation: 0 | 90 | 180 | 270;
}

export default {
  title: 'Icons/AmplifyIcons',
  component: Icon,
  argTypes: {
    color: {
      control: 'color',
    },
    size: { control: 'radio', options: [16, 18, 24, 32, 40, 48, 96] },
    rotation: { control: 'radio', options: [0, 90, 180, 270] },
    data: {
      control: 'radio',
      options: [
        'amplify_wellbore',
        'amplify_wireline_open_hole',
        'amplify_wireline_cased_hole',
        'amplify_lwd',
        'amplify_success',
        'amplify_failure',
      ],
    },
  },
  args: {
    data: 'amplify_wellbore',
    color: '#007979',
    size: 96,
    rotation: 0,
  },
} as Meta;

export const Primary: StoryFn<StoryFnProps> = (args) => {
  return (
    <Icon
      size={args.size}
      color={args.color}
      data={(allIcons as any)[args.data]}
      fillRule="nonzero"
      rotation={args.rotation}
    />
  );
};
