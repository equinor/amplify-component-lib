import { Icon } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import {
  amplify_aml,
  amplify_failure,
  amplify_h1,
  amplify_h2,
  amplify_h3,
  amplify_h4,
  amplify_info_small,
  amplify_lwd,
  amplify_overview,
  amplify_resources,
  amplify_sharepoint,
  amplify_shield_person,
  amplify_small_portal,
  amplify_snail,
  amplify_sort_small,
  amplify_success,
  amplify_tutorials,
  amplify_wellbore,
  amplify_wireline_cased_hole,
  amplify_wireline_open_hole,
} from './AmplifyIcons';

const allIcons = {
  amplify_wellbore: amplify_wellbore,
  amplify_wireline_open_hole: amplify_wireline_open_hole,
  amplify_wireline_cased_hole: amplify_wireline_cased_hole,
  amplify_lwd: amplify_lwd,
  amplify_aml: amplify_aml,
  amplify_success: amplify_success,
  amplify_failure: amplify_failure,
  amplify_snail: amplify_snail,
  amplify_h1: amplify_h1,
  amplify_h2: amplify_h2,
  amplify_tutorials: amplify_tutorials,
  amplify_small_portal: amplify_small_portal,
  amplify_h3: amplify_h3,
  amplify_h4: amplify_h4,
  amplify_sharepoint: amplify_sharepoint,
  amplify_sort_small: amplify_sort_small,
  amplify_info_small: amplify_info_small,
  amplify_resources: amplify_resources,
  amplify_overview: amplify_overview,
  amplify_shield_person: amplify_shield_person,
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
        'amplify_aml',
        'amplify_success',
        'amplify_failure',
        'amplify_snail',
        'amplify_h1',
        'amplify_h2',
        'amplify_h3',
        'amplify_h4',
        'amplify_sharepoint',
        'amplify_tutorials',
        'amplify_small_portal',
        'amplify_sort_small',
        'amplify_info_small',
        'amplify_resources',
        'amplify_overview',
        'amplify_shield_person',
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
