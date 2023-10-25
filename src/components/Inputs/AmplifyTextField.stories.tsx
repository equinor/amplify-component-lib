import { StoryFn } from '@storybook/react';

import AmplifyTextField from './AmplifyTextField';

export default {
  title: 'Inputs/AmplifyTextField',
  component: AmplifyTextField,
  args: {
    unit: 'unit',
    meta: 'meta',
    id: 'intro',
    label: 'Play with me',
    helperText: 'helper text',
  },
};

export const Primary: StoryFn = (args) => {
  return <AmplifyTextField id="amplify" {...args} />;
};

export const ErrorVariant: StoryFn = (args) => {
  return <AmplifyTextField id="amplify" variant="error" {...args} />;
};
