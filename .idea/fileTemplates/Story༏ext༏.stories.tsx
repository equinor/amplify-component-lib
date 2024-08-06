import { StoryObj, Meta } from '@storybook/react';
import { ${NAME} } from './Banner';

const meta: Meta<typeof ${NAME}> = {
  title: 'PATH/${NAME}',
  component: ${NAME},
  parameters: {
   layout: 'centered',
   design: {
     type: 'figma',
     url: ''
   }
  },
  args: {}
};

export default meta;
type Story = StoryObj<typeof ${NAME}>

export const Default: Story = {
  args: {}
}

