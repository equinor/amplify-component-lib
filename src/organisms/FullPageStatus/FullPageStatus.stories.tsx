import { Meta, StoryFn } from '@storybook/react';

import {
  FullPageStatus,
  FullPageStatusProps,
} from 'src/organisms/FullPageStatus/FullPageStatus';

const meta: Meta<typeof FullPageStatus> = {
  title: 'Organisms/FullPageStatus',
  component: FullPageStatus,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19835&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

export default meta;

const Template: StoryFn<FullPageStatusProps> = (args) => (
  <FullPageStatus {...args} />
);

export const Primary = Template.bind({});
Primary.args = { loading: true, error: true, errorMessage: 'ERROR' };
